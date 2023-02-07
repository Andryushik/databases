import express from 'express';
import mysql from 'mysql';
import {
  tableInvitee,
  tableRoom,
  tableMeeting,
  columnsInvitee,
  columnsRoom,
  columnsMeeting,
  valuesInvitee,
  valuesRoom,
  valuesMeeting,
} from './data/tabledata.js';

const app = express();
const PORT = process.env.PORT || 3000;

const conDb = mysql.createConnection({
  host: 'localhost',
  user: 'hyfuser',
  password: 'hyfpassword',
});

conDb.connect((error) => {
  if (error) throw new Error(`Error connecting to database: ${error}`);
  console.log('connected to database as id ' + conDb.threadId);
});

conDb.query('DROP DATABASE IF EXISTS meetup;', (error, result) => {
  if (error) throw new Error(`error deleting database ${error}`);
  console.log('old database deleted');
});

conDb.query('CREATE DATABASE meetup;', (error, result) => {
  if (error) throw new Error(`error creating database ${error}`);
  console.log('database created: meetup');
});

conDb.query('USE meetup;', (error, result) => {
  if (error) throw new Error(`error using database meetup ${error}`);
  console.log('using database: meetup');
});

const createTable = (tableName, columns) => {
  let sqlData = `CREATE TABLE ${tableName} (`;
  for (let column of columns) {
    sqlData += `${column.name} ${column.type}, `;
  }
  sqlData = sqlData.slice(0, -2) + `);`;

  conDb.query(sqlData, (error, result) => {
    if (error) throw new Error(`error creating table ${tableName} ${error}`);
    console.log(`in database meetup table created: ${tableName}`);
  });
};

const insertData = (tableName, values) => {
  const sqlData = `INSERT INTO ${tableName} VALUES ?`;
  conDb.query(sqlData, [values], (error, result) => {
    if (error) throw new Error(`cannot complete query: ${sqlData} ${error}`);
    console.log(`query ${sqlData} done:` + result.affectedRows);
  });
};

const fillDataBase = () => {
  createTable(tableInvitee, columnsInvitee);
  insertData(tableInvitee, valuesInvitee);
  createTable(tableRoom, columnsRoom);
  insertData(tableRoom, valuesRoom);
  createTable(tableMeeting, columnsMeeting);
  insertData(tableMeeting, valuesMeeting);
};

fillDataBase();

conDb.end((error) => {
  if (error) {
    console.error('cannot disconnect: ' + error.stack);
    return;
  }
  console.log('Successfully disconnected from meetup DB.');
});

app.listen(PORT, console.log(`Server started on port: ${PORT}`));
