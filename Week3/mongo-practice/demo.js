const { MongoClient, ServerApiVersion } = require('mongodb');

const newMovies = [
  {
    title: 'Fight Club',
    writer: 'Chuck Palahniuk',
    year: 1999,
    actors: ['Brad Pitt', 'Edward Norton'],
  },

  {
    title: 'Pulp Fiction',
    writer: 'Quentin Tarantino',
    year: 1994,
    actors: ['John Travolta', 'Uma Thurman'],
  },

  {
    title: 'Inglorious Basterds',
    writer: 'Quentin Tarantino',
    year: 2009,
    actors: ['Brad Pitt', 'Diane Kruger', 'Eli Roth'],
  },

  {
    title: 'The Hobbit: An Unexpected Journey',
    writer: 'J.R.R. Tolkein',
    year: 2012,
    franchise: 'The Hobbit',
  },

  {
    title: 'The Hobbit: The Desolation of Smaug',
    writer: 'J.R.R. Tolkein',
    year: 2013,
    franchise: 'The Hobbit',
  },

  {
    title: 'The Hobbit: The Battle of the Five Armies',
    writer: 'J.R.R. Tolkein',
    year: 2012,
    franchise: 'The Hobbit',
    synopsis:
      'Bilbo and Company are forced to engage in a war against an array of combatants and keep the Lonely Mountain from falling into the hands of a rising darkness.',
  },

  {
    title: `Pee Wee Herman's Big Adventure`,
  },
];

async function main() {
  const uri =
    'mongodb+srv://hyfuser:hyfpassword@cluster0.wx5fpuv.mongodb.net/?retryWrites=true&w=majority';
  const client = new MongoClient(uri, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    serverApi: ServerApiVersion.v1,
  });
  try {
    await client.connect();
    //await listDb(client);
    //await insertMovie(client, { title: 'Avatar' });
    //await insertMultipleMovies(client, newMovies);
    //await findMovies(client, {});
    //await findMovies(client, { writer: 'Quentin Tarantino' });
    //await findMovies(client, { actors: 'Brad Pitt' });
    //await findMovies(client, { franchise: 'The Hobbit' });
  } catch (err) {
    console.error(err);
  } finally {
    await client.close();
  }
}

main();

async function listDb(client) {
  const dbList = await client.db().admin().listDatabases();

  console.log('Databases: ');
  dbList.databases.forEach((db) => {
    console.log(`- ${db.name}`);
  });
}

async function insertMovie(client, newMovie) {
  const result = await client
    .db('mongo_practice')
    .collection('movies')
    .insertOne(newMovie);
  console.log(`New movie added with the following id: ${result.insertedId}`);
}

async function insertMultipleMovies(client, newMovies) {
  const result = await client
    .db('mongo_practice')
    .collection('movies')
    .insertMany(newMovies);

  console.log(
    `${result.insertedCount} new movie(s) added with the following id(s): `,
  );
  console.log(result.insertedIds);
}

async function findMovies(client, searchBy) {
  const cursor = await client
    .db('mongo_practice')
    .collection('movies')
    .find(searchBy);
  const results = await cursor.toArray();
  if (results.length > 0) {
    console.log(`Found ${results.length} movie(s): `);
    console.log(results);
  } else {
    console.log(`No movies found!`);
  }
}
