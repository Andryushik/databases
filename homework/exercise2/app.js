import express from 'express';
import mysql from 'mysql';

const app = express();
const PORT = process.env.PORT || 3000;

const poolWorldDb = mysql.createPool({
  connectionLimit: 10,
  host: 'localhost',
  user: 'hyfuser',
  password: 'hyfpassword',
  database: 'new_world',
});

poolWorldDb.query(
  'SELECT 1 + 1 AS solution',
  function (error, results, fields) {
    if (error) throw error;
    console.log('The solution is: ', results[0].solution);
  },
);

app.listen(PORT, console.log(`Server started on port: ${PORT}`));
