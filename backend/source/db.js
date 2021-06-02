const MongoClient = require("mongodb").MongoClient;
const url = "mongodb://localhost:27017";
const dbName = "Dealem";
let database;

function createConnection() {
  MongoClient.connect(
    url,
    {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      poolSize: 20,
    },
    (err, client) => {
      if (err) throw err;

      client
        .db()
        .admin()
        .listDatabases((error, res) => {
          if (error) throw error;

          const hasDb = res.databases.some((db) => db.name === dbName);
          if (!hasDb) throw new Error("Database doesn't exist");
        });

      database = client.db(dbName);
    }
  );
}

async function getDatabase() {
  return await database;
}

function closeConnection() {
  if (database) {
    database.close();
  }
}

module.exports = {
  createConnection,
  getDatabase,
  closeConnection,
};
