const mysql = require('mysql');
const connection = require('../db__connection');

async function query(sql, params) {
  const connectionMysql = await mysql.createConnection(connection.db);
  const [results, ] = await connectionMysql.execute(sql, params);

  return results;
}

module.exports = { query }