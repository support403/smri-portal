const { getStore } = require("@netlify/blobs");

exports.handler = async function (event, context) {
  const headers = {
    "Access-Control-Allow-Origin": "*",
    "Access-Control-Allow-Headers": "Content-Type",
    "Content-Type": "application/json",
  };

  if (event.httpMethod === "OPTIONS") {
    return { statusCode: 200, headers, body: "" };
  }

  const store = getStore({
    name: "smri-config",
    consistency: "strong",
    siteID: process.env.NETLIFY_SITE_ID,
    token: process.env.NETLIFY_TOKEN,
  });

  // GET: 設定を読み込む
  if (event.httpMethod === "GET") {
    try {
      const data = await store.get("config", { type: "json" });
      return {
        statusCode: 200,
        headers,
        body: JSON.stringify(data || {}),
      };
    } catch (e) {
      return { statusCode: 200, headers, body: JSON.stringify({}) };
    }
  }

  // POST: 設定を保存する
  if (event.httpMethod === "POST") {
    try {
      const body = JSON.parse(event.body);
      await store.set("config", JSON.stringify(body));
      return {
        statusCode: 200,
        headers,
        body: JSON.stringify({ ok: true }),
      };
    } catch (e) {
      return {
        statusCode: 500,
        headers,
        body: JSON.stringify({ ok: false, error: e.message }),
      };
    }
  }

  return { statusCode: 405, headers, body: JSON.stringify({ error: "Method not allowed" }) };
};
