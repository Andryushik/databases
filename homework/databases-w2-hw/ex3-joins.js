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

const executeJoins = () => {
  try {
    connection.query(
      `SELECT author_name, mentor_name FROM authors
    JOIN mentors ON authors.mentor_id = mentors.mentor_id;`,
      (error, result) => {
        if (error) throw error;
        console.table(result);
      },
    );

    connection.query(
      `SELECT authors.*, research_papers.paper_title FROM authors
      LEFT JOIN research_Papers ON authors.author_id = research_Papers.research_author;`,
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

executeJoins();
