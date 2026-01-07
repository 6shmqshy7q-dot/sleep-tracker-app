import { drizzle } from 'drizzle-orm/neon-http';
import { neon } from '@neondatabase/serverless';

// Disable SSL verification for development
process.env.NODE_TLS_REJECT_UNAUTHORIZED = '0';

const sql = neon(process.env.DATABASE_URL, {
  fetch: (url, options) => {
    return fetch(url, {
      ...options,
      rejectUnauthorized: false,
    });
  },
});

const db = drizzle(sql);

async function createTables() {
  try {
    console.log('Dropping existing tables...');
    // Drop tables in reverse order (due to foreign key constraints)
    await sql`DROP TABLE IF EXISTS sleep_records CASCADE`;
    await sql`DROP TABLE IF EXISTS user_profiles CASCADE`;
    await sql`DROP TABLE IF EXISTS users CASCADE`;
    console.log('✅ Dropped existing tables');

    // Create users table
    await sql`
      CREATE TABLE IF NOT EXISTS users (
        id SERIAL PRIMARY KEY,
        email VARCHAR(255) NOT NULL UNIQUE,
        username VARCHAR(255) NOT NULL,
        password_hash TEXT NOT NULL,
        created_at TIMESTAMP DEFAULT NOW()
      )
    `;
    console.log('✅ Created users table');

    // Create sleep_records table
    await sql`
      CREATE TABLE IF NOT EXISTS sleep_records (
        id SERIAL PRIMARY KEY,
        user_id INTEGER NOT NULL REFERENCES users(id),
        sleep_time TIMESTAMP NOT NULL,
        wake_time TIMESTAMP NOT NULL,
        sleep_quality VARCHAR(50) NOT NULL,
        duration INTEGER NOT NULL,
        notes TEXT,
        created_at TIMESTAMP DEFAULT NOW()
      )
    `;
    console.log('✅ Created sleep_records table');

    // Create user_profiles table
    await sql`
      CREATE TABLE IF NOT EXISTS user_profiles (
        id SERIAL PRIMARY KEY,
        user_id INTEGER NOT NULL REFERENCES users(id),
        full_name VARCHAR(255),
        age INTEGER,
        gender VARCHAR(20),
        created_at TIMESTAMP DEFAULT NOW()
      )
    `;
    console.log('✅ Created user_profiles table');

    console.log('✅ All tables created successfully!');
    process.exit(0);
  } catch (error) {
    console.error('❌ Error creating tables:', error);
    process.exit(1);
  }
}

createTables();
