const db = require("../../lib/db");

module.exports = async (req, res) => {
  const profiles = await db.query(`
      SELECT *
      FROM profiles
    `);
  res.end(JSON.stringify({ profiles }));
};
