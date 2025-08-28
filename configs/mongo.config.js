// configs/mongo.config.js
import { MongoClient } from 'mongodb';
import dotenv from 'dotenv';

dotenv.config();

const uri = process.env.ATLAS_URI;
const client = new MongoClient(uri);
    

let db;

async function connectDB() {
  try {
    if (!db) {
      await client.connect();
      db = client.db('examenes');
      console.log('Conectado a MongoDB');
    }
    return db.collection('mochilas');
  } catch (error) {
    console.error('Error al conectar a MongoDB:', error);
    throw error;
  }
}

export { connectDB };