import express from 'express';
import mysql from 'mysql';

const app = express();
const PORT = process.env.PORT || 3000;

const conDb = mysql.createConnection({
  host: 'localhost',
  user: 'hyfuser',
  password: 'hyfpassword',
});

conDb.connect((err) => {
  if (err) {
    console.error('error connecting to database: ' + err.stack);
    return;
  }

  console.log('connected to database as id ' + connection.threadId);
});

const sql = 'sql';
const values = [
  ['', ''],
  ['', ''],
];

conDb.query(sql, [values], (error, result) => {
  if (error) throw error;
  console.log('query done:' + result.affectedRows);
});

app.listen(PORT, console.log(`Server started on port: ${PORT}`));
