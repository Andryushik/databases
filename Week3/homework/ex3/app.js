import mysql from 'mysql';

const conn = mysql.createConnection({
  host: 'localhost',
  user: 'hyfuser',
  password: 'hyfpassword',
  database: 'new_world',
  multipleStatements: 'false',
});

conn.connect((error) => {
  if (error) {
    console.error('Error connecting to World DB: ' + error.stack);
    return;
  }
  console.log('Connected to World DB as id ' + conn.threadId);
});

function getPopulation(Country, name, code, cb) {
  conn.query(
    `SELECT Population FROM ${Country} WHERE Name = '${name}' and code = '${code}'`,
    function (err, result) {
      if (err) cb(err);
      if (result.length == 0) cb(new Error('Not found'));
      result[0].name = result.map((el) => el.Population).join(', ');
      cb(null, result[0].name);
    },
  );
}

function getPopulationEscaped(Country, name, code, cb) {
  conn.query(
    'SELECT Population FROM ? WHERE Name = ? and code = ?',
    [Country, name, code],
    function (err, result) {
      if (err) cb(err);
      if (result.length == 0) cb(new Error('Not found'));
      result[0].name = result.map((el) => el.Population).join(', ');
      cb(null, result[0].name);
    },
  );
}

/*
There are a few common ways to prevent SQL injection attacks:
1. Don’t allow multiple statements
2. Use placeholders instead of variable interpolation or connection.escape() method.
3. Validate user input
4. Allowlist user input

Please see getPopulationEscaped string 43
I'm using here placeholders instead of variable interpolation, can provide dictionary for validate as well as array to compare values for example.
I set multipleStatements: 'false' at string 8 as well for extra protection.
*/

getPopulation(
  'country',
  `Aruba' UNION (SELECT table_name FROM information_schema.tables); -- `,
  'ABW',
  console.log,
);

getPopulationEscaped(
  'country',
  `Aruba' UNION (SELECT table_name FROM information_schema.tables); -- `,
  'ABW',
  console.log,
);

/*
SOME EXAMPLES OF SQL INJECTION:
the part for injection in braces ()

SELECT Population FROM country WHERE Name = '(Aruba' UNION (SELECT table_name FROM information_schema.tables); -- )' and code = '';
SELECT Population FROM country WHERE Name = '(Aruba' UNION (SELECT column_name FROM information_schema.columns WHERE table_name = 'country'); -- )' and code = '';
SELECT Population FROM country WHERE Name = '(Aruba' UNION (SELECT column_name FROM information_schema.columns WHERE table_name = 'city'); -- )' and code = '';
SELECT Population FROM country WHERE Name = '(Aruba' UNION (SELECT Name FROM city); -- )' and code = '';
SELECT Population FROM country WHERE Name = '(Aruba'; SELECT * FROM country; -- )' and code = '';
SELECT Population FROM country WHERE Name = '(Aruba'; SELECT * FROM city; -- )' and code = '';
SELECT Population FROM country WHERE Name = '(Aruba'; SELECT * FROM countrylanguage; -- )' and code = '';
SELECT Population FROM country WHERE Name = '(Aruba'; DROP TABLE countrylanguage; -- )' and code = '';
SELECT Population FROM country WHERE Name = '(' OR ''=''; -- )' and code = '';
*/

conn.end((error) => {
  if (error) {
    console.error('cannot disconnect: ' + error.stack);
    return;
  }
  console.log('Successfully disconnected from World DB.');
});
