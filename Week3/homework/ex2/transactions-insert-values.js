import mysql from 'mysql';
import { accountData, accountChangeData } from './values-data.js';

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

function insertValues() {
  try {
    connection.query(
      `INSERT IGNORE INTO account (account_number, balance) VALUES ?`,
      [accountData],
      (error) => {
        if (error) throw error;
        console.log('Table account filled up');
      },
    );

    connection.query(
      `INSERT IGNORE INTO account_changes (account_number, amount, remark) VALUES ?`,
      [accountChangeData],
      (error) => {
        if (error) throw error;
        console.log('Table account_changes filled up');
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

insertValues();
