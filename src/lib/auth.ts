
import { betterAuth } from "better-auth";
import { mongodbAdapter } from "@better-auth/mongo-adapter";
import { jwt } from "better-auth/plugins";

import { getDB } from "@/lib/db";

const db = await getDB();

// Dynamic environment configuration
const AUTH_URL = process.env.BETTER_AUTH_URL;
const API_URL = process.env.API_URL;
const AUTH_SECRET = process.env.BETTER_AUTH_SECRET;

if (!AUTH_URL || !API_URL || !AUTH_SECRET) {
  throw new Error(
    "Missing environment variables: BETTER_AUTH_URL, API_URL, or BETTER_AUTH_SECRET"
  );
}

export const auth = betterAuth({
  // Better Auth runs on the Next.js application
  baseURL: AUTH_URL,

  secret: AUTH_SECRET,

  database: mongodbAdapter(db),

  emailAndPassword: {
    enabled: true,
    minPasswordLength: 8,
    maxPasswordLength: 128,
    autoSignIn: false,
  },

  socialProviders: {
    ...(process.env.GOOGLE_CLIENT_ID &&
    process.env.GOOGLE_CLIENT_SECRET
      ? {
          google: {
            clientId: process.env.GOOGLE_CLIENT_ID,
            clientSecret: process.env.GOOGLE_CLIENT_SECRET,
          },
        }
      : {}),

    ...(process.env.GITHUB_CLIENT_ID &&
    process.env.GITHUB_CLIENT_SECRET
      ? {
          github: {
            clientId: process.env.GITHUB_CLIENT_ID,
            clientSecret: process.env.GITHUB_CLIENT_SECRET,
          },
        }
      : {}),
  },

  plugins: [
    jwt({
      jwt: {
        issuer: AUTH_URL,
        audience: API_URL,
        expirationTime: "15m",
      },
    }),
  ],
});
