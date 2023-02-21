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
      `SELECT research_papers.paper_title AS 'Research title', COUNT(author_id) AS 'Authors quantity' FROM research_papers
      LEFT JOIN author_research ON research_papers.paper_id = author_research.paper_id
      GROUP BY paper_title;`,
      (error, result) => {
        if (error) throw error;
        console.table(result);
      },
    );

    connection.query(
      `SELECT COUNT(research_papers.paper_id) AS number FROM research_papers
      JOIN author_research ON research_papers.paper_id = author_research.paper_id  
      JOIN authors ON author_research.author_id = authors.author_id
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
      `SELECT university, COUNT(author_research.paper_id) AS 'Total researches' FROM authors
      JOIN author_research ON authors.author_id = author_research.author_id
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
