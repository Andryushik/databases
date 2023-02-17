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
      `SELECT first.author_name AS Author, second.author_name AS Mentor FROM authors AS first
    LEFT JOIN authors AS second ON first.mentor_id = second.author_id;`,
      (error, result) => {
        if (error) throw error;
        console.table(result);
      },
    );

    connection.query(
      `SELECT authors.*, research_papers.paper_title FROM authors
      LEFT JOIN author_research ON authors.author_id = author_research.author_id
      LEFT JOIN research_papers ON author_research.paper_id = research_papers.paper_id;`,
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
