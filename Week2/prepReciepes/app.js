import express from 'express';
import util from 'util';
import mysql from 'mysql';
import { tables } from './data/tabledata.js';

const app = express();
const PORT = process.env.PORT || 3000;

const connection = mysql.createConnection({
  host: 'localhost',
  user: 'hyfuser',
  password: 'hyfpassword',
});

const execQuery = util.promisify(connection.query.bind(connection));

const createDatabase = async () => {
  await execQuery('DROP DATABASE IF EXISTS recipes;');

  await execQuery('CREATE DATABASE recipes;');

  await execQuery('USE recipes;');
};

const createTable = (table) => {
  let sqlData = `CREATE TABLE ${table.tableName} (`;
  for (let column of table.columns) {
    sqlData += `${column}`;
  }
  sqlData += `);`;
  return sqlData;
};

const seedDatabase = async () => {
  try {
    await createDatabase();
    await Promise.all(tables.map((table) => execQuery(createTable(table))));
    await Promise.all(
      tables.map((table) => {
        const columns = table.values[0].length > 1 ? '' : '(name)';
        execQuery(`INSERT INTO ${table.tableName} ${columns} VALUES ?`, [
          table.values,
        ]);
      }),
    );
  } catch (error) {
    console.log(error);
  }
  connection.end();
};

seedDatabase();

app.listen(PORT, console.log(`Server started on port: ${PORT}`));
