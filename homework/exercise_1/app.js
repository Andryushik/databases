import express from 'express';
import mysql from 'mysql';

const app = express();
const PORT = process.env.PORT || 3000;

const conDb = mysql.createConnection({
  host: 'localhost',
  user: 'hyfuser',
  password: 'hyfpassword',
});

conDb.connect((error) => {
  if (error) throw new Error('error connecting to database');
  console.log('connected to database as id ' + conDb.threadId);
});

conDb.query('DROP DATABASE IF EXISTS meetup;', (error, result) => {
  if (error) throw new Error('error deleting database');
  console.log('old database deleted');
});

conDb.query('CREATE DATABASE meetup;', (error, result) => {
  if (error) throw new Error('error creating database');
  console.log('database created: meetup');
});

conDb.query('USE meetup;', (error, result) => {
  if (error) throw new Error('error using database meetup');
  console.log('using database: meetup');
});

const createTable = (tableName, columns) => {
  let sqlData = `CREATE TABLE ${tableName} (`;
  for (let column of columns) {
    sqlData += `${column.name} ${column.type}`;
  }
  sqlData += `);`;
  console.log(sqlData);
  try {
    conDb.query(sqlData, (error, result) => {
      if (error) throw new Error(`error creating table ${tableName}`);
      console.log(`in database meetup table created: ${tableName}`);
    });
  } catch (error) {
    console.error(error);
  }
};

const fillDataBase = () => {
  const tableInvitee = 'Invitee';
  const columnsInvitee = [
    { name: 'invitee_no', type: 'SMALLINT NOT NULL, ' },
    { name: 'invitee_name', type: 'TINYTEXT NOT NULL, ' },
    { name: 'invited_by', type: 'TINYTEXT, ' },
    { name: 'PRIMARY KEY', type: '(invitee_no)' },
  ];

  createTable(tableInvitee, columnsInvitee);
};

fillDataBase();

// const sql = 'sql';
// const values = [
//   ['', ''],
//   ['', ''],
// ];

// conDb.query(sql, [values], (error, result) => {
//   if (error) throw new Error(`cannot complete query: ${sql}`);
//   console.log('query done:' + result.affectedRows);
// });

app.listen(PORT, console.log(`Server started on port: ${PORT}`));
