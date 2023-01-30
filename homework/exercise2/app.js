import express from 'express';
import mysql from 'mysql';

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

conWorldDb.query(
  'SELECT Name FROM country WHERE Population > 8000000;',
  function (error, results /*, fields*/) {
    if (error) throw error;
    console.log(
      'What are the names of countries with population greater than 8 million?',
    );
    console.table(results);
    // results.forEach((element) => {
    //   console.log(element.Name);
    // });
  },
);

conWorldDb.query(
  `SELECT Name FROM country WHERE Name LIKE '%land%';`,
  function (error, results) {
    if (error) throw error;
    console.log(
      'What are the names of countries that have “land” in their names?',
    );
    console.table(results);
  },
);

conWorldDb.end((error) => {
  if (error) {
    console.error('cannot disconnect: ' + error.stack);
    return;
  }
  console.log('Successfully disconnected from World DB.');
});

app.listen(PORT, console.log(`Server started on port: ${PORT}`));
