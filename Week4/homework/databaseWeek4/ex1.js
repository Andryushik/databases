import { MongoClient, ServerApiVersion } from 'mongodb';
import * as dotenv from 'dotenv';
import csv from 'csvtojson'; //const csv = require('csvtojson');
dotenv.config(); //require('dotenv').config();

const mongoUrl = process.env.MONGODB_URL;
const csvFilePath = 'ex1-aggregation/population_pyramid_1950-2022.csv';

async function main() {
  if (mongoUrl == null) {
    throw Error(
      `You did not set up the environment variables correctly. Did you create a '.env' file and add a package to create it?`,
    );
  }
  const client = new MongoClient(mongoUrl, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    serverApi: ServerApiVersion.v1,
  });

  try {
    await client.connect();
    console.log('Connected to databaseWeek4');
    //
    await addCollection(client);
    //
  } catch (err) {
    console.error(err);
  } finally {
    client.close();
    console.log('Connection closed');
  }
}

async function addCollection(client) {
  const jsonArray = await csv().fromFile(csvFilePath);
  //console.log(jsonArray);

  const hasCollection = await client
    .db('databaseWeek4')
    .listCollections({ name: 'population' })
    .hasNext();

  if (hasCollection) {
    await client.db('databaseWeek4').collection('population').deleteMany({});
  } else {
    await client.db('databaseWeek4').createCollection('population');
  }
  await client
    .db('databaseWeek4')
    .collection('population')
    .insertMany(jsonArray);
}

main();
