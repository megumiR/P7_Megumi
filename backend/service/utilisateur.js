
const db = require('./db');
const app = require('../app');
const connection = require('../db__connection');

async function getMultiple(page = 1){
    const offset = app.getOffset(page, connection.listPerPage);
    const rows = await db.query(
      `SELECT id, name, email, password 
      FROM utilisateur LIMIT ${offset},${connection.listPerPage}`
    );
    const data = app.emptyOrRows(rows);
    const meta = {page};
  
    return {
      data,
      meta
    }

async function create(utilisateurSignin){
    const result = await db.query(
      `INSERT INTO utilisateur 
      (name, email, password) 
      VALUES 
      (${utilisateurSignin.name}, ${utilisateurSignin.email}, ${utilisateurSignin.password})`
    );
  
    let message = 'Error in creating programming language';

    
    if (result.affectedRows) {
      message = 'Programming language created successfully';
    }
  
    return {message};
  }
}
module.exports = { getMultiple, create }