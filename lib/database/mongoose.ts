import mongoose, { Mongoose } from 'mongoose';

const MONGODB_URL = process.env.MONGODB_URL;

interface MongooseConnection {
  conn: Mongoose | null;
  promise: Promise<Mongoose> | null;
}

// Extend the NodeJS global type to include our mongoose cache
declare global {
  // This is needed because in Next.js or Node apps, globals persist between hot reloads
  var mongoose: MongooseConnection | undefined;
}

let cached: MongooseConnection;

if (!global.mongoose) {
  global.mongoose = { conn: null, promise: null };
}

cached = global.mongoose;

export const connectToDatabase = async () => {
  if (cached.conn) return cached.conn; // optimization – if connection exists, return it

  if (!MONGODB_URL) throw new Error('Missing MONGODB_URL');

  cached.promise =
    cached.promise ||
    mongoose.connect(MONGODB_URL, {
      dbName: 'imagify',
      bufferCommands: false,
    });

  cached.conn = await cached.promise;
  return cached.conn;
};
