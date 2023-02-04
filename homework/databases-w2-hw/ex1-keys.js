import express from 'express';
import util from 'util';
import mysql from 'mysql';

const app = express();
const PORT = process.env.PORT || 3000;

const connection = mysql.createConnection({
  host: 'localhost',
  user: 'hyfuser',
  password: 'hyfpassword',
  database: 'week2db',
});

const execQuery = util.promisify(connection.query.bind(connection));

const seedDatabase = async () => {
  try {
    await execQuery('CREATE DATABASE IF NOT EXISTS week2db;');
    await execQuery(`DROP TABLE IF EXISTS authors`);
    await execQuery(
      `CREATE TABLE authors (author_id INT PRIMARY KEY AUTO_INCREMENT, author_name VARCHAR(100) NOT NULL, university VARCHAR(255), date_of_birth DATE, h_index INT, gender VARCHAR(6) NOT NULL CHECK(gender IN ("Female", "Male")));`,
    );
    await execQuery(
      `ALTER TABLE authors ADD COLUMN mentor INT, ADD CONSTRAINT fk_mentor_author_id FOREIGN KEY (mentor) REFERENCES authors(author_id);`,
    );
  } catch (error) {
    console.log(error);
  }
  connection.end();
};

seedDatabase();

app.listen(PORT, console.log(`Server started on port: ${PORT}`));
