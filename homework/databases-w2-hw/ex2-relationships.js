import mysql from 'mysql';
import {
  authorsData,
  papersData,
  authorsResearchData,
} from './tables/tablesData.js';

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
    // connection.query(`SET FOREIGN_KEY_CHECKS=0;`, (error) => {
    //   if (error) throw error;
    // });

    connection.query(`DROP TABLE IF EXISTS author_research`, (error) => {
      if (error) throw error;
    });

    connection.query(`DROP TABLE IF EXISTS research_Papers`, (error) => {
      if (error) throw error;
    });

    connection.query(
      `CREATE TABLE research_papers (paper_id INT PRIMARY KEY AUTO_INCREMENT, paper_title VARCHAR(255) NOT NULL, conference VARCHAR(255), publish_date DATE);`,
      (error) => {
        if (error) throw error;
      },
    );

    connection.query(
      `CREATE TABLE author_research (id INT PRIMARY KEY AUTO_INCREMENT, author_id INT, paper_id INT, CONSTRAINT fk_research_author_author_id FOREIGN KEY (author_id) REFERENCES authors(author_id), CONSTRAINT fk_research_author_paper_id FOREIGN KEY (paper_id) REFERENCES research_papers(paper_id));`,
      (error) => {
        if (error) throw error;
      },
    );

    connection.query(
      `INSERT INTO authors (author_name, university, date_of_birth, h_index, gender, mentor_id) VALUES ?;`,
      [authorsData],
      (error) => {
        if (error) throw error;
      },
    );

    connection.query(
      `INSERT INTO research_Papers (paper_title, conference, publish_date) VALUES ?;`,
      [papersData],
      (error) => {
        if (error) throw error;
      },
    );

    connection.query(
      `INSERT INTO author_research (author_id, paper_id) VALUES ?;`,
      [authorsResearchData],
      (error) => {
        if (error) throw error;
      },
    );
  } catch (error) {
    console.error(error);
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
