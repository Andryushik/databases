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
  console.log('connected to database as id ' + connection.threadId);
});

conDb.query('CREATE DATABASE IF NOT EXISTS meetup;', (error, result) => {
  if (error) throw new Error('error creating database');
  console.log('database created: meetup');
});

conDb.query('USE meetup;', (error, result) => {
  if (error) throw new Error('error using database meetup');
  console.log('using database: meetup');
});

const sql = 'sql';
const values = [
  ['', ''],
  ['', ''],
];

conDb.query(sql, [values], (error, result) => {
  if (error) throw new Error(`cannot complete query: ${sql}`);
  console.log('query done:' + result.affectedRows);
});

app.listen(PORT, console.log(`Server started on port: ${PORT}`));
