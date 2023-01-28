import express from 'express';
import mysql from 'mysql';

const app = express();
const PORT = process.env.PORT || 3000;

let connection = mysql.createConnection({
  host: 'localhost',
  user: 'hyfuser',
  password: 'hyfpassword',
});

connection.connect((err) => {
  if (err) {
    console.error('error connecting to database: ' + err.stack);
    return;
  }

  console.log('connected to database as id ' + connection.threadId);
});

app.listen(PORT, console.log(`Server started on port: ${PORT}`));
