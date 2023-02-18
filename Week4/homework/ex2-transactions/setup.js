async function addCollections(client) {
  await addCollectionAccounts(client);
  await addCollectionTransfers(client);
  console.log('All collections created/updated!');
}

async function addCollection(client, collectionName, collectionJson) {
  console.log(`Please wait! Creating '${collectionName}' collection...`);

  const hasCollection = await client
    .db('databaseWeek4')
    .listCollections({ name: `${collectionName}` })
    .hasNext();

  if (hasCollection) {
    await client
      .db('databaseWeek4')
      .collection(`${collectionName}`)
      .deleteMany({});
  } else {
    await client.db('databaseWeek4').createCollection(`${collectionName}`);
  }
  await client
    .db('databaseWeek4')
    .collection(`${collectionName}`)
    .insertMany(collectionJson);
  console.log(`Collection '${collectionName}' created/updated`);
}

async function addCollectionAccounts(client) {
  const accountsData = [
    {
      accountN: 101,
      balance: 44000,
    },
    {
      accountN: 102,
      balance: 3000,
    },
    {
      accountN: 103,
      balance: 18000,
    },
    {
      accountN: 104,
      balance: 125000,
    },
    {
      accountN: 105,
      balance: 70000,
    },
  ];

  await addCollection(client, 'accounts', accountsData);
}

async function addCollectionTransfers(client) {
  const transfersData = [
    {
      accountN: 103,
      amount: 200,
      changedDate: new Date(),
      remark: 'transfer',
    },
    {
      accountN: 105,
      amount: 300,
      changedDate: new Date(),
      remark: 'deposit',
    },
    {
      accountN: 104,
      amount: 1000,
      changedDate: new Date(),
      remark: 'deposit',
    },
    {
      accountN: 101,
      amount: -570,
      changedDate: new Date(),
      remark: 'withdraw',
    },
    {
      accountN: 102,
      amount: -100,
      changedDate: new Date(),
      remark: 'withdraw',
    },
  ];

  await addCollection(client, 'transfers', transfersData);
}

export { addCollections };
