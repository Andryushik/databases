import { MongoClient, ServerApiVersion } from 'mongodb';
import * as dotenv from 'dotenv';
import csv from 'csvtojson';
dotenv.config();

const mongoUrl = process.env.MONGODB_URL;
const csvFilePath = 'population_pyramid_1950-2022.csv';

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
    await addCollection(client);
    await populationOfCountry(client);
    await populationOfContinent(client);
  } catch (err) {
    console.error(err);
  } finally {
    client.close();
    console.log('Connection closed');
  }
}

async function addCollection(client) {
  console.log('Please wait! Creating collection...');
  const jsonArray = await csv().fromFile(csvFilePath);
  for (let i = 0; i < jsonArray.length; i++) {
    const obj = jsonArray[i];
    for (let prop in obj) {
      if (obj.hasOwnProperty(prop) && obj[prop] !== null && !isNaN(obj[prop])) {
        obj[prop] = +obj[prop];
      }
    }
  }

  const hasCollection = await client
    .db('databaseWeek4')
    .listCollections({ name: 'population' })
    .hasNext();

  if (hasCollection) {
    await client.db('databaseWeek4').collection('population').deleteMany({});
  } else {
    await client.db('databaseWeek4').createCollection('population', {
      validator: {
        $jsonSchema: {
          bsonType: 'object',
          title: 'Population Object Validation',
          required: ['Country', 'Year', 'Age', 'M', 'F'],
          properties: {
            Country: {
              bsonType: 'string',
              description: "'Country' must be a string and is required",
            },
            Year: {
              bsonType: 'int',
              minimum: 1900,
              maximum: 2030,
              description:
                "'Year' must be an integer in [ 1900, 2030 ] and is required",
            },
            M: {
              bsonType: 'int',
              description: "'M' must be an integer and is required",
            },
            F: {
              bsonType: 'int',
              description: "'F' must be an integer and is required",
            },
          },
        },
      },
    });
  }
  await client
    .db('databaseWeek4')
    .collection('population')
    .insertMany(jsonArray);
  console.log('Collection created/updated');
}

async function populationOfCountry(client, country = 'Netherlands') {
  const agg = [
    {
      $match: {
        Country: `${country}`,
      },
    },
    // {
    //   $addFields: {
    //     populationM: {
    //       $toInt: '$M', //no need
    //     },
    //     populationF: {
    //       $toInt: '$F', //no need
    //     },
    //   },
    // },
    {
      $addFields: {
        population: {
          $sum: ['$M', '$F'], //['$populationM', '$populationF'],
        },
      },
    },
    {
      $group: {
        _id: '$Year',
        population: {
          $sum: '$population',
        },
      },
    },
    { $sort: { _id: 1 } },
  ];

  const populationList = await client
    .db('databaseWeek4')
    .collection('population')
    .aggregate(agg)
    .toArray();
  console.log(populationList);
}

async function populationOfContinent(client, age = '100+', year = 2020) {
  const agg = [
    {
      $match: {
        Country: {
          $in: [
            'ASIA',
            'AFRICA',
            'EUROPE',
            'LATIN AMERICA AND THE CARIBBEAN',
            'NORTHERN AMERICA',
            'OCEANIA',
          ],
        },
        Year: year, //`${year}`,
        Age: `${age}`,
      },
    },
    {
      $addFields: {
        TotalPopulation: {
          $sum: [
            '$M',
            '$F',
            // {
            //   $toInt: '$M', //no need
            // },
            // {
            //   $toInt: '$F', //no need can make shorter
            // },
          ],
        },
      },
    },
  ];

  const populationList = await client
    .db('databaseWeek4')
    .collection('population')
    .aggregate(agg)
    .toArray();
  console.log(populationList);
}

main();
