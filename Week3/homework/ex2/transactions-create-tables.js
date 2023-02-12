import mysql from 'mysql';

const connection = mysql.createConnection({
  host: 'localhost',
  user: 'hyfuser',
  password: 'hyfpassword',
  database: 'userdb',
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
    connection.query(`DROP TABLE IF EXISTS account;`, (error) => {
      if (error) throw error;
    });

    connection.query(`DROP TABLE IF EXISTS account_changes;`, (error) => {
      if (error) throw error;
    });

    connection.query(
      `CREATE TABLE account (account_number INT AUTO_INCREMENT PRIMARY KEY, balance DECIMAL(10, 2) NOT NULL,
      CHECK (balance >= 0);`,
      (error) => {
        if (error) throw error;
      },
    );

    connection.query(
      `CREATE TABLE account_changes (change_number INT AUTO_INCREMENT PRIMARY KEY, account_number INT NOT NULL, amount DECIMAL(10, 2) NOT NULL, changed_date datetime NOT NULL DEFAULT CURRENT_TIMESTAMP, remark VARCHAR(255), FOREIGN KEY (account_number) REFERENCES accounts(account_number));`,
      (error) => {
        if (error) throw error;
      },
    );
  } catch (error) {
    console.log(error);
  } finally {
    connection.end((error) => {
      if (error) {
        console.error('cannot disconnect: ' + error.stack);
        return;
      }
      console.log('successfully disconnected from week2db');
    });
  }
};

seedDatabase();
