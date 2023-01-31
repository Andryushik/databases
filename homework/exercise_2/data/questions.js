export const questionSql = [
  {
    question:
      'What are the names of countries with population greater than 8 million?',
    sql: 'SELECT Name FROM country WHERE Population > 8000000;',
  },
  {
    question:
      'What are the names of countries that have “land” in their names?',
    sql: `SELECT Name FROM country WHERE Name LIKE '%land%';`,
  },
  {
    question:
      'What are the names of the cities with population in between 500,000 and 1 million?',
    sql: `SELECT Name FROM city WHERE Population BETWEEN 500000 AND 1000000;`,
  },
  {
    question: `What's the name of all the countries on the continent 'Europe'?`,
    sql: `SELECT Name FROM country WHERE Continent = 'Europe'`,
  },
  {
    question:
      'List all the countries in the descending order of their surface areas.',
    sql: `SELECT Name, SurfaceArea FROM country ORDER BY SurfaceArea DESC;`,
  },
  {
    question: 'What are the names of all the cities in the Netherlands?',
    sql: `SELECT Name FROM city WHERE CountryCode = 'NLD'`,
  },
  {
    question: 'What is the population of Rotterdam?',
    sql: `SELECT Name, Population FROM city WHERE Name = 'Rotterdam'`,
  },
  {
    question: "What's the top 10 countries by Surface Area?",
    sql: `SELECT Name, SurfaceArea FROM country ORDER BY SurfaceArea DESC LIMIT 10;`,
  },
  {
    question: "What's the top 10 most populated cities?",
    sql: `SELECT Name, Population FROM city ORDER BY Population DESC LIMIT 10;`,
  },
  {
    question: 'What is the population number of the world?',
    sql: `SELECT SUM(Population) FROM country;`,
  },
];
