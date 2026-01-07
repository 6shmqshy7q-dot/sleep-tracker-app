import { drizzle } from 'drizzle-orm/neon-http';
import { neon } from '@neondatabase/serverless';

// Disable SSL verification for development
process.env.NODE_TLS_REJECT_UNAUTHORIZED = '0';

const sql = neon(process.env.DATABASE_URL!);

export const drizzleDb = drizzle(sql);
