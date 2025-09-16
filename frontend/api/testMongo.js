const { MongoClient } = require('mongodb');

async function testMongo() {
  const uri = 'mongodb://localhost:27017';
  const client = new MongoClient(uri);
  const dbName = 'EDU2CAREER';
  const collectionName = 'EDU2CAREER_DB';

  try {
    await client.connect();
    console.log('Connected to MongoDB');
    const collection = client.db(dbName).collection(collectionName);
    const docs = await collection.find({}).toArray();
    console.log('Documents in collection:', docs.length);
    console.log(docs);
  } catch (error) {
    console.error('Error connecting to MongoDB or fetching documents:', error);
  } finally {
    await client.close();
  }
}

testMongo();
