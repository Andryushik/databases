import express from 'express';
import mysql from 'mysql';
import { questionSql } from './data/questions.js';

const app = express();
const PORT = process.env.PORT || 3000;

const conWorldDb = mysql.createConnection({
  host: 'localhost',
  user: 'hyfuser',
  password: 'hyfpassword',
  database: 'new_world',
});

conWorldDb.connect((error) => {
  if (error) {
    console.error('Error connecting to World DB: ' + error.stack);
    return;
  }
  console.log('Connected to World DB as id ' + conWorldDb.threadId);
});

questionSql.forEach((el) => {
  conWorldDb.query(el.sql, function (error, results) {
    if (error) throw error;
    console.log(el.question);
    console.table(results);
  });
});

conWorldDb.end((error) => {
  if (error) {
    console.error('cannot disconnect: ' + error.stack);
    return;
  }
  console.log('Successfully disconnected from World DB.');
});

app.listen(PORT, console.log(`Server started on port: ${PORT}`));
