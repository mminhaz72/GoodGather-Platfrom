import { betterAuth } from "better-auth";
import { mongodbAdapter } from "better-auth/adapters/mongodb";
import { MongoClient } from "mongodb";

const uri = (process.env.MONGODB_URI || "mongodb+srv://minhaz:minhaz12345678@cluster0.udsqfyn.mongodb.net/goodgather?retryWrites=true&w=majority&appName=Cluster0").trim();

const client = new MongoClient(uri);
const db = client.db("goodgather");

export const auth = betterAuth({
  baseURL: process.env.BETTER_AUTH_URL?.trim() || "https://good-gather-platfrom-app.vercel.app",
  secret: process.env.BETTER_AUTH_SECRET?.trim() || "my_super_secret_key_for_better_auth_1234567890",
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
      clientId: process.env.GOOGLE_CLIENT_ID?.trim() || "",
      clientSecret: process.env.GOOGLE_CLIENT_SECRET?.trim() || "",
    },
  },
});