export async function transferCredits(
  client,
  fromAccountN,
  toAccountN,
  amount,
) {
  const accountsCollection = client.db('databaseWeek4').collection('accounts');
  const transfersCollection = client
    .db('databaseWeek4')
    .collection('transfers');
  const session = client.startSession();

  try {
    await session.withTransaction(async () => {
      await accountsCollection.updateOne(
        { accountN: fromAccountN },
        {
          $inc: { balance: amount * -1 },
          $push: {
            accountChanges: {
              accountN: toAccountN,
              amount: amount * -1,
              changedDate: new Date(),
              remark: 'transfer',
            },
          },
        },
        { session },
      );

      await accountsCollection.updateOne(
        { accountN: toAccountN },
        {
          $inc: { balance: amount },
          $push: {
            accountChanges: {
              accountN: fromAccountN,
              amount: amount,
              changedDate: new Date(),
              remark: 'transfer',
            },
          },
        },
        { session },
      );

      await transfersCollection.insertOne(
        {
          accountN: fromAccountN,
          amount: amount * -1,
          changedDate: new Date(),
          remark: 'transfer',
        },
        { session },
      );

      await transfersCollection.insertOne(
        {
          accountN: toAccountN,
          amount: amount,
          changedDate: new Date(),
          remark: 'transfer',
        },
        { session },
      );
    });
    console.log(
      `\x1B[33mTransaction from account number ${fromAccountN} to account number ${toAccountN} successful, amount €${amount}.\x1b[m`,
    );
  } catch (err) {
    console.error('\x1B[31mTransaction aborted!!!\x1b[m   ' + err);
    await session.abortTransaction();
  } finally {
    await session.endSession();
  }
}
