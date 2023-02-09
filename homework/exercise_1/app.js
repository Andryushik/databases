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
  const sqlArray = columns.map((column) => {
    return `${column.name} ${column.type}`;
  });
  const sqlData = `CREATE TABLE ${tableName} (` + sqlArray.join(', ') + `);`;

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
