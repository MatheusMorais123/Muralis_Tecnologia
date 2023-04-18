require("dotenv").config();
const mysql = require("mysql2/promise");

async function connect() {
  if (global.connection && global.connection.state !== "disconnected") {
    return global.connection;
  }
  
  const connection = await mysql.createConnection({
    host: "localhost",
    user: "root",
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME
  });
  
  global.connection = connection;
  return connection;
}
async function getAllExpenses() {
    const conn = await connect();
    const [rows] = await conn.query('SELECT * FROM despesas');
    return rows;
  }
module.exports = {
  connect
};
