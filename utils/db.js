import { MongoClient } from 'mongodb';

// class to connect to database client
class DBClient {
  // constructor connects to mongodb client
  constructor() {
    this.host = process.env.DB_HOST || 'localhost';
    this.port = process.env.DB_PORT || 27017;
    this.db = process.env.DB_DATABASE || 'files_manager';
    this.url = `mongodb://${this.host}:${this.port}/${this.db}`;
    this.client = new MongoClient(this.url, { useUnifiedTopology: true });
    this.client.connect();
  }

  // method return boolean for database connection status
  isAlive() {
    return this.client.isConnected();
  }

  // method returns the number of documents in the users collection
  async nbUsers() {
    return this.client.db().collection('users').countDocuments();
  }

  // method returns the number of documents in the files collection
  async nbFiles() {
    return this.client.db().collection('files').countDocuments();
  }
}

const dbClient = new DBClient();
module.exports = dbClient;
