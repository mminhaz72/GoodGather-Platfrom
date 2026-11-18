import mongoose from "mongoose";

const MONGODB_URI = "mongodb://minhaz:minhaz12345678@ac-xqf2ffa-shard-00-00.wdzqfyn.mongodb.net:27017,ac-xqf2ffa-shard-00-01.wdzqfyn.mongodb.net:27017,ac-xqf2ffa-shard-00-02.wdzqfyn.mongodb.net:27017/goodgather?ssl=true&replicaSet=atlas-eo9l69-shard-0&authSource=admin&retryWrites=true&w=majority";

let cached = global.mongoose;

if (!cached) {
  cached = global.mongoose = { conn: null, promise: null };
}

async function connectDB() {
  if (cached.conn) {
    return cached.conn;
  }

  if (!cached.promise) {
    const opts = {
      bufferCommands: false,
    };

    cached.promise = mongoose.connect(MONGODB_URI, opts).then((mongoose) => {
      return mongoose;
    });
  }

  try {
    cached.conn = await cached.promise;
  } catch (e) {
    cached.promise = null;
    throw e;
  }

  return cached.conn;
}

export default connectDB;