const db = require("../../lib/db");
const { json } = require("micro");

module.exports = async (req, res) => {
  const d = await json(req);
  const sql = await db.query(
    `INSERT INTO profiles VALUES (null,'${d.address.toString()}','${d.avatar.toString()}','${d.email.toString()}','${d.name.toString()}')`
  );
  res.end(JSON.stringify({ sql }));
};
