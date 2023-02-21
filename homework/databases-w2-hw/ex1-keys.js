import mysql from 'mysql';

const connection = mysql.createConnection({
  host: 'localhost',
  user: 'hyfuser',
  password: 'hyfpassword',
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
    connection.query('CREATE DATABASE IF NOT EXISTS week2db;', (error) => {
      if (error) throw error;
    });

    connection.query('USE week2db;', (error) => {
      if (error) throw error;
    });

    connection.query(`DROP TABLE IF EXISTS author_research`, (error) => {
      if (error) throw error;
    });

    connection.query(`DROP TABLE IF EXISTS research_papers`, (error) => {
      if (error) throw error;
    });

    connection.query(`DROP TABLE IF EXISTS authors;`, (error) => {
      if (error) throw error;
    });

    connection.query(
      `CREATE TABLE authors (author_id INT PRIMARY KEY AUTO_INCREMENT, author_name VARCHAR(100) NOT NULL, university VARCHAR(255), date_of_birth DATE, h_index INT, gender ENUM('Male', 'Female', 'Non-binary') NOT NULL);`,
      (error) => {
        if (error) throw error;
      },
    );

    connection.query(
      `ALTER TABLE authors ADD COLUMN mentor_id INT, ADD CONSTRAINT fk_mentor_id_author_id FOREIGN KEY (mentor_id) REFERENCES authors(author_id);`,
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
