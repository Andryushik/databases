import express from 'express';
import util from 'util';
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

const connection = mysql.createConnection({
  host: 'localhost',
  user: 'hyfuser',
  password: 'hyfpassword',
});

const execQuery = util.promisify(connection.query.bind(connection));

const createDatabase = async () => {
  await execQuery('DROP DATABASE IF EXISTS meetup;');

  await execQuery('CREATE DATABASE meetup;');

  await execQuery('USE meetup;');
};

const createTable = async (tableName, columns) => {
  let sqlData = `CREATE TABLE ${tableName} (`;
  for (let column of columns) {
    sqlData += `${column.name} ${column.type}`;
  }
  sqlData += `);`;

  await execQuery(sqlData);
};

const insertData = async (tableName, values) => {
  const sqlData = `INSERT INTO ${tableName} VALUES ?`;
  await execQuery(sqlData, [values]);
};

const fillDataBase = async () => {
  try {
    await createDatabase();
    await createTable(tableInvitee, columnsInvitee);
    await insertData(tableInvitee, valuesInvitee);
    await createTable(tableRoom, columnsRoom);
    await insertData(tableRoom, valuesRoom);
    await createTable(tableMeeting, columnsMeeting);
    await insertData(tableMeeting, valuesMeeting);
  } catch (error) {
    console.log(error);
  }
  connection.end();
};

fillDataBase();

app.listen(PORT, console.log(`Server started on port: ${PORT}`));
