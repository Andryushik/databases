import mysql from 'mysql';
// import { accountData, accountChangeData } from './values-data.js';

const connection = mysql.createConnection({
  host: 'localhost',
  user: 'hyfuser',
  password: 'hyfpassword',
  database: 'userdb',
  multipleStatements: true,
});

connection.connect((error) => {
  if (error) {
    console.error('error connecting to userdb: ' + error.stack);
    return;
  }

  console.log('connected to userdb as id ' + connection.threadId);
});

function transaction() {
  let checkRows;
  try {
    connection.query(
      `START TRANSACTION;
      UPDATE account SET balance = balance - 1000 WHERE account_number = 101;
      UPDATE account SET balance = balance + 1000 WHERE account_number = 102;
      INSERT INTO account_changes (account_number, amount, remark) VALUES (101, -1000, 'transfer'), (102, 1000, 'transfer');`,
      (error, results) => {
        if (error) {
          console.log('SQL syntax error!');
          throw error;
        }
        checkRows = results
          .map((result) => result.affectedRows)
          .reduce((acc, val) => acc + val);

        if (checkRows !== 4) {
          console.log(
            'Please check account numbers! Transaction UNSUCCESSFUL! Transaction ABORTED!',
          );
          connection.query(`ROLLBACK;`, (error) => {
            if (error) throw error;
          });
        }
      },
    );

    connection.query(`COMMIT;`, (error) => {
      if (error) {
        console.log('Transaction UNSUCCESSFUL! NOT COMMITTED!!!');
        throw error;
      }
      console.log(`Transaction successful! Affected ${checkRows} rows.`);
    });
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

transaction();
