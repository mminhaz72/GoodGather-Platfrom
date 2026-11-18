import { betterAuth } from "better-auth";
import { mongodbAdapter } from "better-auth/adapters/mongodb";
import { MongoClient } from "mongodb";

const uri = "mongodb://minhaz:minhaz12345678@ac-xqf2ffa-shard-00-00.wdzqfyn.mongodb.net:27017,ac-xqf2ffa-shard-00-01.wdzqfyn.mongodb.net:27017,ac-xqf2ffa-shard-00-02.wdzqfyn.mongodb.net:27017/goodgather?ssl=true&replicaSet=atlas-eo9l69-shard-0&authSource=admin&retryWrites=true&w=majority";

let client;
let clientPromise;

if (!global._mongoClientPromise) {
  client = new MongoClient(uri);
  global._mongoClientPromise = client.connect();
}
clientPromise = global._mongoClientPromise;

const db = client ? client.db("goodgather") : new MongoClient(uri).db("goodgather");

export const auth = betterAuth({
  baseURL: "https://good-gather-platfrom-app.vercel.app",
  secret: "my_super_secret_key_for_better_auth_1234567890",
  trustedOrigins: [
    "https://good-gather-platfrom-app.vercel.app",
    "http://localhost:3000",
  ],
  database: mongodbAdapter(db),
  emailAndPassword: {
    enabled: true,
  },
  socialProviders: {
    google: {
      clientId: "818038700925-5s589jvt591744hkhpitp4sufigijjqv.apps.googleusercontent.com",
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    },
  },
});