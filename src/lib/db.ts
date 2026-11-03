import { MongoClient, type Db } from "mongodb";

const globalForMongo = globalThis as typeof globalThis & {
  _mongoClientPromise?: Promise<MongoClient>;
};

export async function getMongoClient(): Promise<MongoClient> {
  const uri = process.env.MONGODB_URI;

  if (!uri) {
    throw new Error("MONGODB_URI is missing from environment variables.");
  }

  if (!globalForMongo._mongoClientPromise) {
    const client = new MongoClient(uri);

    globalForMongo._mongoClientPromise = client.connect().catch((error) => {
      globalForMongo._mongoClientPromise = undefined;
      throw error;
    });
  }

  return globalForMongo._mongoClientPromise;
}

export async function getDB(): Promise<Db> {
  const client = await getMongoClient();
  const dbName = process.env.MONGODB_DB_NAME || "booknook";

  return client.db(dbName);
}