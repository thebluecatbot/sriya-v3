// api/state.js — full state sync (GET = load, POST = save)
const { neon } = require("@neondatabase/serverless");

const DB = "postgresql://neondb_owner:npg_Wi6IMP7nZtje@ep-blue-tree-aocyo20k-pooler.c-2.ap-southeast-1.aws.neon.tech/neondb?sslmode=require&channel_binding=require";

let inited = false;
async function getSQL() {
  const sql = neon(DB);
  if (!inited) {
    await sql`
      CREATE TABLE IF NOT EXISTS app_state (
        id   TEXT PRIMARY KEY DEFAULT 'main',
        data JSONB NOT NULL DEFAULT '{}',
        updated_at TIMESTAMPTZ DEFAULT NOW()
      )
    `;
    await sql`
      INSERT INTO app_state (id, data) VALUES ('main', '{}')
      ON CONFLICT (id) DO NOTHING
    `;
    inited = true;
  }
  return sql;
}

module.exports = async function handler(req, res) {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "GET, POST, OPTIONS");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type");
  if (req.method === "OPTIONS") return res.status(200).end();

  try {
    const sql = await getSQL();

    if (req.method === "GET") {
      const rows = await sql`SELECT data, updated_at FROM app_state WHERE id = 'main'`;
      return res.json({ data: rows[0]?.data ?? null, updatedAt: rows[0]?.updated_at ?? null });
    }

    if (req.method === "POST") {
      const { data } = req.body;
      if (!data || typeof data !== "object") return res.status(400).json({ error: "bad data" });
      await sql`
        UPDATE app_state
        SET data = ${JSON.stringify(data)}::jsonb, updated_at = NOW()
        WHERE id = 'main'
      `;
      return res.json({ ok: true });
    }

    res.status(405).json({ error: "Method not allowed" });
  } catch (e) {
    console.error(e);
    res.status(500).json({ error: e.message });
  }
};
