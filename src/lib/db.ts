import { Pool } from 'pg';

// This ensures that the application will not start if the DATABASE_URL is not set.
if (!process.env.DATABASE_URL) {
  throw new Error('DATABASE_URL environment variable is not set');
}

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
});

export default pool;