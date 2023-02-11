const { MongoClient, ServerApiVersion } = require('mongodb');
require('dotenv').config();
const mongoUrl = process.env.MONGO_URL;
const { seedDatabase } = require('./seedDatabase.js');

async function createEpisodeExercise(client) {
  const result = await client
    .db('databaseWeek3')
    .collection('bob_ross_episodes')
    .insertOne({
      episode: 'S09E13',
      title: 'MOUNTAIN HIDE-AWAY',
      elements: [
        'CIRRUS',
        'CLOUDS',
        'CONIFER',
        'DECIDIOUS',
        'GRASS',
        'MOUNTAIN',
        'MOUNTAINS',
        'RIVER',
        'SNOWY_MOUNTAIN',
        'TREE',
        'TREES',
      ],
    });
  console.log(
    `Created season 9 episode 13 and the document got the id ${result.insertedId}`,
  );
}

async function findEpisodesExercises(client) {
  const resultTitle = await client
    .db('databaseWeek3')
    .collection('bob_ross_episodes')
    .findOne({ episode: 'S02E02' });
  console.log(`The title of episode 2 in season 2 is ${resultTitle.title}`);

  const resultEpisode = await client
    .db('databaseWeek3')
    .collection('bob_ross_episodes')
    .findOne({ title: 'BLACK RIVER' });
  console.log(
    `The season and episode number of the "BLACK RIVER" episode is ${resultEpisode.episode}`,
  );

  const resultsTitles = await client
    .db('databaseWeek3')
    .collection('bob_ross_episodes')
    .find({ elements: 'CLIFF' }) //another syntax: .find({ elements: { $in: ['CLIFF'] } })
    .toArray();
  const resultsTitlesString = resultsTitles
    .map((result) => result.title)
    .join(', ');
  console.log(
    `The episodes that Bob Ross painted a CLIFF are: ${resultsTitlesString}`,
  );

  const resultsTitlesAnd = await client
    .db('databaseWeek3')
    .collection('bob_ross_episodes')
    .find({ elements: { $all: ['CLIFF', 'LIGHTHOUSE'] } }) //another syntax: .find({ elements: { $in: ['CLIFF'], $in: ['LIGHTHOUSE'] } })
    .toArray();
  const resultsTitlesAndString = resultsTitlesAnd
    .map((result) => result.title)
    .join(', ');
  console.log(
    `The episodes that Bob Ross painted a CLIFF and a LIGHTHOUSE are: ${resultsTitlesAndString}`,
  );
}

async function updateEpisodeExercises(client) {
  const result = await client
    .db('databaseWeek3')
    .collection('bob_ross_episodes')
    .updateOne({ episode: 'S30E13' }, { $set: { title: 'BLUE RIDGE FALLS' } });
  console.log(
    `Ran a command to update episode 13 in season 30 and it updated ${result.modifiedCount} episodes`,
  );

  const results = await client
    .db('databaseWeek3')
    .collection('bob_ross_episodes')
    .updateMany(
      { elements: 'BUSHES' },
      { $set: { 'elements.$': 'BUSH' } }, //another syntax: {}, { $set: { 'elements.$[element]': 'BUSH' } }, { arrayFilters: [{ element: 'BUSHES' }] },
    );
  console.log(
    `Ran a command to update all the BUSHES to BUSH and it updated ${results.modifiedCount} episodes`,
  );
}

async function deleteEpisodeExercise(client) {
  const result = await client
    .db('databaseWeek3')
    .collection('bob_ross_episodes')
    .deleteOne({ episode: 'S31E14' });
  console.log(
    `Ran a command to delete episode and it deleted ${result.deletedCount} episodes`,
  );
}

async function main() {
  if (process.env.MONGODB_URL == null) {
    throw Error(
      `You did not set up the environment variables correctly. Did you create a '.env' file and add a package to create it?`,
    );
  }
  const client = new MongoClient(process.env.MONGODB_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    serverApi: ServerApiVersion.v1,
  });

  try {
    await client.connect();

    // Seed our database
    await seedDatabase(client);

    // CREATE
    await createEpisodeExercise(client);

    // READ
    await findEpisodesExercises(client);

    // UPDATE
    await updateEpisodeExercises(client);

    // DELETE
    await deleteEpisodeExercise(client);
  } catch (err) {
    console.error(err);
  } finally {
    // Always close the connection at the end
    client.close();
  }
}

main();

/**
 * In the end the console should read something like this: 

Created season 9 episode 13 and the document got the id 625e9addd11e82a59aa9ff93
The title of episode 2 in season 2 is WINTER SUN
The season and episode number of the "BLACK RIVER" episode is S02E06
The episodes that Bob Ross painted a CLIFF are NIGHT LIGHT, EVENING SEASCAPE, SURF'S UP, CLIFFSIDE, BY THE SEA, DEEP WILDERNESS HOME, CRIMSON TIDE, GRACEFUL WATERFALL
The episodes that Bob Ross painted a CLIFF and a LIGHTHOUSE are NIGHT LIGHT
Ran a command to update episode 13 in season 30 and it updated 1 episodes
Ran a command to update all the BUSHES to BUSH and it updated 120 episodes
Ran a command to delete episode and it deleted 1 episodes
 
*/
