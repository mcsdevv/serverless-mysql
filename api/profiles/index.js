const mysql = require("serverless-mysql");

const db = mysql({
  config: {
    host: process.env.MYSQL_HOST,
    database: process.env.MYSQL_DATABASE,
    user: process.env.MYSQL_USER,
    password: process.env.MYSQL_PASSWORD
  }
});

module.exports = async (req, res) => {
  const profiles = await db.query(`
      SELECT *
      FROM data
    `);
  await db.end();
  res.end(JSON.stringify({ profiles }));
};
