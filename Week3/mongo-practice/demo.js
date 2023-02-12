const { MongoClient, ServerApiVersion, ObjectId } = require('mongodb');

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

const newUsers = [
  {
    username: 'GoodGuyGreg',
    first_name: 'Good Guy',
    last_name: 'Greg',
  },
  {
    username: 'ScumbagSteve',
    full_name: {
      first: 'Scumbag',
      last: 'Steve',
    },
  },
];

const newPosts = [
  {
    username: 'GoodGuyGreg',
    title: 'Passes out at party',
    body: 'Wakes up early and cleans house',
  },
  {
    username: 'GoodGuyGreg',
    title: 'Steals your identity',
    body: 'Raises your credit score',
  },
  {
    username: 'GoodGuyGreg',
    title: 'Reports a bug in your code',
    body: 'Sends you a Pull Request',
  },
  {
    username: 'ScumbagSteve',
    title: 'Borrows something',
    body: 'Sells it',
  },
  {
    username: 'ScumbagSteve',
    title: 'Borrows everything',
    body: 'The end',
  },
  {
    username: 'ScumbagSteve',
    title: 'Forks your repo on github',
    body: 'Sets to private',
  },
];

const newComments = [
  {
    username: 'GoodGuyGreg',
    comment: 'Hope you got a good deal!',
    post: new ObjectId('63e660c768e91b7c3c552d34'),
  },
  {
    username: 'GoodGuyGreg',
    comment: "What's mine is yours!",
    post: new ObjectId('63e660c768e91b7c3c552d35'),
  },
  {
    username: 'GoodGuyGreg',
    comment: "Don't violate the licensing agreement!",
    post: new ObjectId('63e660c768e91b7c3c552d36'),
  },
  {
    username: 'ScumbagSteve',
    comment: "It still isn't clean",
    post: new ObjectId('63e660c768e91b7c3c552d31'),
  },
  {
    username: 'ScumbagSteve',
    comment: 'Denied your PR cause I found a hack',
    post: new ObjectId('63e660c768e91b7c3c552d33'),
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
    //QUERIES
    //await findMovies(client, {});
    //await findMovies(client, { title: 'The Hobbit: An Unexpected Journey' });
    //await findMovies(client, { writer: 'Quentin Tarantino' });
    //await findMovies(client, { actors: 'Brad Pitt' });
    //await findMovies(client, { franchise: 'The Hobbit' });
    // await findMovies(client, {
    //   year: { $lt: 2000, $gte: 1990 },
    // });
    // await findMovies(client, {
    //   $or: [{ year: { $lt: 2000 } }, { year: { $gt: 2010 } }],
    // });
    //UPDATE
    // await updateMovie(client, 'The Hobbit: An Unexpected Journey', {
    //   synopsis:
    //     'A reluctant hobbit, Bilbo Baggins, sets out to the Lonely Mountain with a spirited group of dwarves to reclaim their mountain home - and the gold within it - from the dragon Smaug.',
    // });
    // await updateMovieArr(client, 'Pulp Fiction', {
    //   actors: 'Samuel L. Jackson',
    // });
    //TEXT SEARCH
    //await findMoviesByText(client, 'Bilbo');
    //await findMoviesByText(client, 'Gandalf');
    // await findMoviesByText(client, 'bilbo -Gandalf');
    // await findMoviesByText(client, 'dwarves hobbit');
    //await findMoviesByText(client, 'gold, dragon');
    //DELETE
    //await deleteMovieByTitle(client, "Pee Wee Herman's Big Adventure");
    //await deleteMovieByTitle(client, 'Avatar');
    //-------------------------------------------------------
    //RELATIONSHIPS
    //await insertMultipleUsers(client, newUsers);
    //await insertMultiplePosts(client, newPosts);
    //await insertMultipleComments(client, newComments);
    //await findAllUsers(client, {});
    //await findAllPosts(client, {});
    //await findAllPosts(client, { username: 'GoodGuyGreg' });
    //await findAllPosts(client, { username: 'ScumbagSteve' });
    //await findAllComments(client, {});
    //await findAllComments(client, { username: 'GoodGuyGreg' });
    //await findAllComments(client, { username: 'ScumbagSteve' });
    //PROJECTION
    //await findFields(client);
    //RELATIONSHIPS
    await findAllCommentsRelatedToPost(client, {
      title: 'Reports a bug in your code',
    });
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

async function updateMovie(client, movieToUpdate, newMovieData) {
  const result = await client
    .db('mongo_practice')
    .collection('movies')
    .updateOne({ title: movieToUpdate }, { $set: newMovieData });

  console.log(`${result.matchedCount} movie(s) matched the query criteria.`);
  console.log(`${result.modifiedCount} movie(s) was/were updated.`);
}

async function updateMovieArr(client, movieToUpdate, newMovieData) {
  const result = await client
    .db('mongo_practice')
    .collection('movies')
    .updateOne({ title: movieToUpdate }, { $push: newMovieData });

  console.log(`${result.matchedCount} movie(s) matched the query criteria.`);
  console.log(`${result.modifiedCount} movie(s) was/were updated.`);
}

async function findMoviesByText(client, searchByText) {
  //creating index
  client
    .db('mongo_practice')
    .collection('movies')
    .createIndex({ synopsis: 'text' });

  //search
  const cursor = await client
    .db('mongo_practice')
    .collection('movies')
    .find({ $text: { $search: searchByText } });
  //Or can use following code without creating index
  //.find({ synopsis: { $regex: searchByText } });
  const results = await cursor.toArray();
  if (results.length > 0) {
    console.log(`Found ${results.length} movie(s): `);
    console.log(results);
  } else {
    console.log(`No movies found!`);
  }
}

async function deleteMovieByTitle(client, movieToDelete) {
  const result = await client
    .db('mongo_practice')
    .collection('movies')
    .deleteOne({ title: movieToDelete });
  console.log(`${result.deletedCount} movie was deleted.`);
}

async function insertMultipleUsers(client, newUsers) {
  const result = await client
    .db('mongo_practice')
    .collection('users')
    .insertMany(newUsers);

  console.log(
    `${result.insertedCount} new user(s) added with the following id(s): `,
  );
  console.log(result.insertedIds);
}

async function insertMultiplePosts(client, newPosts) {
  const result = await client
    .db('mongo_practice')
    .collection('posts')
    .insertMany(newPosts);

  console.log(
    `${result.insertedCount} new post(s) added with the following id(s): `,
  );
  console.log(result.insertedIds);
}

async function insertMultipleComments(client, newComments) {
  const result = await client
    .db('mongo_practice')
    .collection('comments')
    .insertMany(newComments);

  console.log(
    `${result.insertedCount} new comment(s) added with the following id(s): `,
  );
  console.log(result.insertedIds);
}

async function findAllUsers(client, searchBy) {
  const cursor = await client
    .db('mongo_practice')
    .collection('users')
    .find(searchBy);
  const results = await cursor.toArray();
  if (results.length > 0) {
    console.log(`Found ${results.length} user(s): `);
    console.log(results);
  } else {
    console.log(`No user(s) found!`);
  }
}

async function findAllPosts(client, searchBy) {
  const cursor = await client
    .db('mongo_practice')
    .collection('posts')
    .find(searchBy);
  const results = await cursor.toArray();
  if (results.length > 0) {
    console.log(`Found ${results.length} post(s): `);
    console.log(results);
  } else {
    console.log(`No post(s) found!`);
  }
}

async function findAllComments(client, searchBy) {
  const cursor = await client
    .db('mongo_practice')
    .collection('comments')
    .find(searchBy);
  const results = await cursor.toArray();
  if (results.length > 0) {
    console.log(`Found ${results.length} comment(s): `);
    console.log(results);
  } else {
    console.log(`No comment(s) found!`);
  }
}

async function findFields(client) {
  const found = await client
    .db('mongo_practice')
    .collection('comments')
    .find({ username: 'GoodGuyGreg' })
    .project({ _id: 0, comment: 1 })
    .toArray();
  console.log(found);
}

async function findAllCommentsRelatedToPost(client, searchBy) {
  const results = await client
    .db('mongo_practice')
    .collection('posts')
    .find(searchBy)
    .toArray();
  if (results.length > 0) {
    console.log(`Found ${results.length} post(s): `);
    const postId = results[0]._id.toString();
    console.log(postId);
    const resultComments = await client
      .db('mongo_practice')
      .collection('comments')
      .find({ _id: `${postId}` })
      .toArray();
    console.log(resultComments);
  } else {
    console.log(`No post(s) found!`);
  }
}

// db.posts.aggregate([
// {
// $match: { title: 'Reports a bug in your code' }
// },
// {
// $lookup: {
// from: 'comments',
// localField: '_id',
// foreignField: 'post',
// as: 'comments'
// }
// }
// ])
