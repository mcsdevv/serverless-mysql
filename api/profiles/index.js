const db = require("../../lib/db");
const url = require("url");

module.exports = async (req, res) => {
  const { query } = url.parse(req.url, true);
  let page = parseInt(query.page) || 1;
  const limit = parseInt(query.limit) || 10;
  if (page < 1) page = 1;
  const profiles = await db.query(`
      SELECT *
      FROM profiles
      LIMIT ${(page - 1) * limit}, ${limit}
    `);
  const count = await db.query(`
      SELECT COUNT(*)
      AS profilesCount
      FROM profiles
    `);
  const { profilesCount } = count[0];
  const pageCount = Math.ceil(profilesCount / limit);
  res.end(JSON.stringify({ profiles, profilesCount, pageCount, page }));
};
