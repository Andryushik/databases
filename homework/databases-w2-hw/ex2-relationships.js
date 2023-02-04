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
    await execQuery(`DROP TABLE IF EXISTS research_Papers`);
    await execQuery(
      `CREATE TABLE research_Papers (paper_id INT PRIMARY KEY AUTO_INCREMENT, paper_title VARCHAR(255) NOT NULL, conference VARCHAR(255), publish_date DATE);`,
    );
    await execQuery(
      `ALTER TABLE research_Papers ADD COLUMN research_author INT, ADD CONSTRAINT fk_research_author_author_id FOREIGN KEY (research_author) REFERENCES authors(author_id);`,
    );
    await execQuery(
      `CREATE TABLE mentors (mentor_id INT PRIMARY KEY AUTO_INCREMENT, mentor_name VARCHAR(100) NOT NULL);`,
    );
  } catch (error) {
    console.log(error);
  }
  connection.end();
};

seedDatabase();

app.listen(PORT, console.log(`Server started on port: ${PORT}`));
