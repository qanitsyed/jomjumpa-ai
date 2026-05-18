import { createClient } from "https://esm.sh/@supabase/supabase-js@2";

const supabase = createClient(
  Deno.env.get("SUPABASE_URL")!,
  Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!,
);

const SIGNING_SECRET = Deno.env.get("TALLY_SIGNING_SECRET");

async function verifySignature(rawBody: string, header: string | null): Promise<boolean> {
  if (!SIGNING_SECRET) return true;
  if (!header) return false;
  const key = await crypto.subtle.importKey(
    "raw",
    new TextEncoder().encode(SIGNING_SECRET),
    { name: "HMAC", hash: "SHA-256" },
    false,
    ["sign"],
  );
  const mac = await crypto.subtle.sign("HMAC", key, new TextEncoder().encode(rawBody));
  const expected = btoa(String.fromCharCode(...new Uint8Array(mac)));
  return expected === header;
}

function resolveValue(f: any): string | null {
  const v = f?.value;
  if (v == null) return null;
  if (typeof v === "boolean") return null;
  if (typeof v === "number") return String(v);
  if (typeof v === "string") {
    const s = v.trim();
    return s.length ? s : null;
  }
  if (Array.isArray(v)) {
    const first = v[0];
    if (first == null) return null;
    if (Array.isArray(f.options)) {
      const opt = f.options.find((o: any) => o?.id === first);
      if (opt?.text) return String(opt.text);
    }
    if (typeof first === "string") {
      const s = first.trim();
      return s.length ? s : null;
    }
    return null;
  }
  return null;
}

function pick(fields: any[], patterns: string[]): string | null {
  for (const f of fields) {
    const label = String(f?.label ?? "").toLowerCase();
    if (!patterns.some((p) => label.includes(p))) continue;
    const v = resolveValue(f);
    if (v) return v;
  }
  return null;
}

function looksLikeUrl(s: string): boolean {
  if (/^https?:\/\//i.test(s)) return true;
  return /^[a-z0-9-]+(\.[a-z0-9-]+)+/i.test(s);
}

// Tally's INPUT_LINK encodes values as markdown: "[label](https://example.com)".
function extractUrl(s: string): string {
  const md = s.match(/^\s*\[[^\]]*\]\(([^)]+)\)\s*$/);
  return (md ? md[1] : s).trim();
}

Deno.serve(async (req) => {
  if (req.method !== "POST") return new Response("method not allowed", { status: 405 });

  const raw = await req.text();
  const sig = req.headers.get("tally-signature");
  if (!(await verifySignature(raw, sig))) {
    return new Response("invalid signature", { status: 401 });
  }

  let payload: any;
  try {
    payload = JSON.parse(raw);
  } catch {
    return new Response("bad json", { status: 400 });
  }

  // Tally CHECKBOXES generate flattened sub-fields with "(option text)" in the
  // label — drop those so they don't get matched accidentally.
  const fields = (payload?.data?.fields ?? []).filter(
    (f: any) => !/\(.+\)\s*$/.test(String(f?.label ?? "")),
  );

  const submitter = pick(fields, ["what's your name", "your name", "submitter"]);
  const description = pick(fields, ["describe your app", "describe", "about your app"]);
  const explicitName = pick(fields, ["app name", "project name", "build name"]);
  const name = explicitName ?? description ?? "Untitled";
  const rawUrl = pick(fields, ["paste your app url", "app url", "url", "link"]);
  const tag = pick(fields, ["tag", "category", "type"]);

  if (!rawUrl) return new Response("missing url", { status: 400 });
  const cleanedUrl = extractUrl(rawUrl);
  if (!looksLikeUrl(cleanedUrl)) return new Response("invalid url", { status: 400 });
  const normalisedUrl = /^https?:\/\//i.test(cleanedUrl) ? cleanedUrl : `https://${cleanedUrl}`;

  const { error } = await supabase.from("builds").insert({
    name,
    url: normalisedUrl,
    tag,
    submitter,
  });

  if (error) {
    console.error("insert failed:", error);
    return new Response("insert failed", { status: 500 });
  }

  return new Response("ok", { status: 200 });
});
