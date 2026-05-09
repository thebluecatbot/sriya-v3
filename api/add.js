// api/add.js — atomic item add (guest + main user)
// Atomically prepends/appends an item into a specific STATE key
// without reading the whole state first, avoiding race conditions.
const { neon } = require("@neondatabase/serverless");

const DB = "postgresql://neondb_owner:npg_Wi6IMP7nZtje@ep-blue-tree-aocyo20k-pooler.c-2.ap-southeast-1.aws.neon.tech/neondb?sslmode=require&channel_binding=require";

// Which STATE keys are allowed for atomic add (and whether to prepend or append)
const ALLOWED = {
  tasks:           { op: "prepend" },
  nonNegotiables:  { op: "append"  },
  entries:         { op: "prepend" },   // journal
  books:           { op: "prepend" },
  timeLog:         { op: "prepend" },
  mtpLabLog:       { op: "prepend" },
  travelVisited:   { op: "prepend" },
  travelWishlist:  { op: "prepend" },
  exerciseLog:     { op: "prepend" },
  substack:        { op: "prepend" },
  people:          { op: "append"  },
  updates:         { op: "prepend" },
};

module.exports = async function handler(req, res) {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "POST, OPTIONS");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type");
  if (req.method === "OPTIONS") return res.status(200).end();
  if (req.method !== "POST") return res.status(405).json({ error: "POST only" });

  try {
    const { type, item, by } = req.body;
    if (!type || !item || !ALLOWED[type]) return res.status(400).json({ error: "invalid type or item" });

    const sql = neon(DB);
    const cfg = ALLOWED[type];
    const itemJson = JSON.stringify(item);
    const typeKey = type; // e.g. "tasks"

    if (cfg.op === "prepend") {
      // Prepend: new item at front of array
      await sql`
        UPDATE app_state
        SET data = jsonb_set(
              data,
              ${"{" + typeKey + "}"}::text[],
              (${itemJson}::jsonb || COALESCE(data->${typeKey}, '[]'::jsonb))
            ),
            updated_at = NOW()
        WHERE id = 'main'
      `;
    } else {
      // Append: new item at end
      await sql`
        UPDATE app_state
        SET data = jsonb_set(
              data,
              ${"{" + typeKey + "}"}::text[],
              (COALESCE(data->${typeKey}, '[]'::jsonb) || ${itemJson}::jsonb)
            ),
            updated_at = NOW()
        WHERE id = 'main'
      `;
    }

    console.log(`[add] ${by || "unknown"} added ${type}:`, JSON.stringify(item).slice(0, 80));
    return res.json({ ok: true });
  } catch (e) {
    console.error(e);
    res.status(500).json({ error: e.message });
  }
};
