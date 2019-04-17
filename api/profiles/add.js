const db = require("../../lib/db");
const { json } = require("micro");

module.exports = async (req, res) => {
  const d = await json(req);
  await db.query(
    `INSERT INTO profiles VALUES (null,'${d.address}','${d.avatar}','${
      d.email
    }','${d.name}')`
  );
  res.end(JSON.stringify({ ...d }));
};
