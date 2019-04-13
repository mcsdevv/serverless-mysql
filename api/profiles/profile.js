const mysql = require("serverless-mysql");
const url = require("url");

const db = mysql({
  config: {
    host: process.env.MYSQL_HOST,
    database: process.env.MYSQL_DATABASE,
    user: process.env.MYSQL_USER,
    password: process.env.MYSQL_PASSWORD
  }
});

module.exports = async (req, res) => {
  const { query } = url.parse(req.url, true);
  const [profile] = await db.query(`
    SELECT *
    FROM data
    WHERE id = ${query.id}
  `);
  await db.end();
  res.end(JSON.stringify({ profile }));
};
