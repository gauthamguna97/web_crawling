const { MongoClient } = require('mongodb');


async function createListing(client, newListing){
  const result = await client.db("Clusters").collection("Crawl").insertMany(newListing);
  console.log(`New listing created with the following id: ${result.insertedId}`);
}

async function listDatabases(client){
  databasesList = await client.db().admin().listDatabases();
  console.log("Databases:");
  databasesList.databases.forEach(db => console.log(` - ${db.name}`));
};

async function connectToDB(results){
  /**
   * Connection URI. Update <username>, <password>, and <your-cluster-url> to reflect your cluster.
   * See https://docs.mongodb.com/ecosystem/drivers/node/ for more details
   */
  const uri = "mongodb+srv://gauthamgunapati:<pwd>@clustercrawl1.kuu5y.mongodb.net/Clusters?retryWrites=true&w=majority";


  const client = new MongoClient(uri);
  try {
    await client.connect();
    await  listDatabases(client);
    await createListing(client, results);
} catch (e) {
    console.error(e);
} finally {
    await client.close();
}
}

module.exports = { connectToDB }