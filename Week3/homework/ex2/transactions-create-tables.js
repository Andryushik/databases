import mysql from 'mysql';

const connection = mysql.createConnection({
  host: 'localhost',
  user: 'hyfuser',
  password: 'hyfpassword',
  database: 'userdb',
});

connection.connect((error) => {
  if (error) {
    console.error('error connecting to userdb: ' + error.stack);
    return;
  }

  console.log('connected to userdb as id ' + connection.threadId);
});

function createTables() {
  try {
    connection.query(`DROP TABLE IF EXISTS account_changes;`, (error) => {
      if (error) throw error;
    });

    connection.query(`DROP TABLE IF EXISTS account;`, (error) => {
      if (error) throw error;
    });

    connection.query(
      `CREATE TABLE account (account_number INT(3) AUTO_INCREMENT PRIMARY KEY, balance DECIMAL(10, 2) NOT NULL, CHECK (balance >= 0));`,
      (error) => {
        if (error) throw error;
        console.log('Table account created');
      },
    );

    connection.query(
      `CREATE TABLE account_changes (change_number INT(5) ZEROFILL AUTO_INCREMENT PRIMARY KEY, account_number INT NOT NULL, amount DECIMAL(10, 2) NOT NULL, changed_date datetime NOT NULL DEFAULT CURRENT_TIMESTAMP, remark VARCHAR(255), FOREIGN KEY (account_number) REFERENCES account(account_number));`,
      (error) => {
        if (error) throw error;
        console.log('Table account_changes created');
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
      console.log('successfully disconnected from userdb');
    });
  }
}

createTables();
