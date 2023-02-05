import express from 'express';
import mysql from 'mysql';

const app = express();
const PORT = process.env.PORT || 3000;

const connection = mysql.createConnection({
  host: 'localhost',
  user: 'hyfuser',
  password: 'hyfpassword',
  database: 'week2db',
});

connection.connect((error) => {
  if (error) {
    console.error('error connecting: ' + error.stack);
    return;
  }

  console.log('connected as id ' + connection.threadId);
});

const seedDatabase = () => {
  try {
    // connection.query('CREATE DATABASE IF NOT EXISTS week2db;', (error) => {
    //   if (error) throw error;
    // });
    connection.query(`DROP TABLE IF EXISTS research_Papers`, (error) => {
      if (error) throw error;
    });
    connection.query(`DROP TABLE IF EXISTS mentors`, (error) => {
      if (error) throw error;
    });
    connection.query(
      `CREATE TABLE research_Papers (paper_id INT PRIMARY KEY AUTO_INCREMENT, paper_title VARCHAR(255) NOT NULL, conference VARCHAR(255), publish_date DATE);`,
      (error) => {
        if (error) throw error;
      },
    );
    connection.query(
      `ALTER TABLE research_Papers ADD COLUMN research_author INT, ADD CONSTRAINT fk_research_author_author_id FOREIGN KEY (research_author) REFERENCES authors(author_id);`,
      (error) => {
        if (error) throw error;
      },
    );
    connection.query(
      `CREATE TABLE mentors (mentor_id INT PRIMARY KEY AUTO_INCREMENT, mentor_name VARCHAR(100) NOT NULL);`,
      (error) => {
        if (error) throw error;
      },
    );
    connection.query(
      `ALTER TABLE authors DROP FOREIGN KEY fk_mentor_id_author_id;`,
      (error) => {
        if (error) throw error;
      },
    );
    connection.query(
      `ALTER TABLE authors ADD CONSTRAINT fk_mentor_id_author_id FOREIGN KEY (mentor_id) REFERENCES mentors(mentor_id);`,
      (error) => {
        if (error) throw error;
      },
    );
  } catch (error) {
    console.log(error);
  }
  connection.end((error) => {
    if (error) {
      console.error('cannot disconnect: ' + error.stack);
      return;
    }
    console.log('successfully disconnected from week2db');
  });
};

seedDatabase();

app.listen(PORT, console.log(`Server started on port: ${PORT}`));
