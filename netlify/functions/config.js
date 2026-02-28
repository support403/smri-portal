import { getStore } from "@netlify/blobs";

export default async (req, context) => {
  const store = getStore("smri-config");

  // GET: 設定を読み込む
  if (req.method === "GET") {
    try {
      const data = await store.get("config", { type: "json" });
      return Response.json(data || {});
    } catch {
      return Response.json({});
    }
  }

  // POST: 設定を保存する
  if (req.method === "POST") {
    try {
      const body = await req.json();
      await store.set("config", JSON.stringify(body));
      return Response.json({ ok: true });
    } catch (e) {
      return Response.json({ ok: false, error: e.message }, { status: 500 });
    }
  }

  return Response.json({ error: "Method not allowed" }, { status: 405 });
};

export const config = {
  path: "/api/config",
};
