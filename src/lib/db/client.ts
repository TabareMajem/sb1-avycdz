import { MongoClient } from 'mongodb';
import { validateEnv } from '../../config/env';

const env = validateEnv();

if (!env.VITE_MONGODB_URI) {
  throw new Error('MongoDB URI is not configured. Please add VITE_MONGODB_URI to your .env file.');
}

const client = new MongoClient(env.VITE_MONGODB_URI);
const clientPromise = client.connect();

export default clientPromise;

export async function getDb() {
  const client = await clientPromise;
  return client.db('mangachat');
}