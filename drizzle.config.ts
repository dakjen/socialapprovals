import type { Config } from 'drizzle-kit';

export default {
  schema: "./src/db/schema.ts", // Location of your Drizzle schema files
  out: "./drizzle", // Directory for migration files
  dialect: 'postgresql', // Specify the dialect
  dbCredentials: {
    url: process.env.DATABASE_URL!, // Use 'url' property for the connection string
  },
} satisfies Config;
