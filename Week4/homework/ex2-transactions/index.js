import { MongoClient, ServerApiVersion } from 'mongodb';
import * as dotenv from 'dotenv';
import { addCollections } from './setup.js';
import { transferCredits } from './transfer.js';

dotenv.config();

const mongoUrl = process.env.MONGODB_URL;

async function main() {
  if (mongoUrl == null) {
    throw Error(`You did not set up the environment variables correctly.`);
  }
  const client = new MongoClient(mongoUrl, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    serverApi: ServerApiVersion.v1,
  });

  try {
    await client.connect();
    console.log('Connected to databaseWeek4');
    await addCollections(client);
    await transferCredits(client, 101, 102, 1000);
    await transferCredits(client, 105, 102, 2900);
  } catch (err) {
    console.error(err);
  } finally {
    client.close();
    console.log('Connection closed');
  }
}

main();
