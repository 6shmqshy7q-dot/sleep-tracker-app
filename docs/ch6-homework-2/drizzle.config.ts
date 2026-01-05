import { defineConfig } from 'drizzle-kit';
import { config } from 'dotenv';

// Load .env.local explicitly
config({ path: '.env.local' });

export default defineConfig({
  schema: './src/drizzle/schema.ts',
  out: './src/drizzle/migrations',
  dialect: 'postgresql',
  dbCredentials: {
    url: process.env.DATABASE_URL!,
    ssl: 'require',
  },
});
