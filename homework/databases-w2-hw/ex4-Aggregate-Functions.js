import mysql from 'mysql';

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

const executeQueries = () => {
  try {
    connection.query(
      `SELECT paper_title AS 'Research title', COUNT(research_author) AS 'Authors quantity' FROM research_Papers
      GROUP BY paper_title;`,
      (error, result) => {
        if (error) throw error;
        console.table(result);
      },
    );

    connection.query(
      `SELECT COUNT(paper_title) AS number FROM research_Papers
JOIN authors ON research_author = author_id
WHERE gender = 'Female';`,
      (error, result) => {
        if (error) throw error;
        console.log(
          'Total researches from female authors: ' + result[0].number,
        );
      },
    );

    connection.query(
      `SELECT university, AVG(h_index) AS 'Average H-index' FROM authors
      GROUP BY university;`,
      (error, result) => {
        if (error) throw error;
        console.table(result);
      },
    );

    connection.query(
      `SELECT university, COUNT(paper_title) AS 'Total researches' FROM authors
      JOIN research_Papers ON author_id = research_author
      GROUP BY university;`,
      (error, result) => {
        if (error) throw error;
        console.table(result);
      },
    );

    connection.query(
      `SELECT university, MIN(h_index), MAX(h_index) FROM authors
    GROUP BY university;`,
      (error, result) => {
        if (error) throw error;
        console.table(result);
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

executeQueries();
