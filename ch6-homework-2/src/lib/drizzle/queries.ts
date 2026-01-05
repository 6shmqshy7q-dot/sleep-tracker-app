import { drizzleDb } from './index';
import { users, sleepRecords } from './schema';
import { eq, and } from 'drizzle-orm';

// User queries
export async function createUser(email: string, username: string, passwordHash: string) {
  const [user] = await drizzleDb
    .insert(users)
    .values({ email, username, passwordHash })
    .returning();
  return user;
}

export async function getUserByEmail(email: string) {
  const [user] = await drizzleDb
    .select()
    .from(users)
    .where(eq(users.email, email))
    .limit(1);
  return user;
}

// Sleep record queries
export async function createSleepRecord(
  userId: number,
  sleepTime: Date,
  wakeTime: Date,
  sleepQuality: string,
  duration: number,
  notes?: string
) {
  const [record] = await drizzleDb
    .insert(sleepRecords)
    .values({
      userId,
      sleepTime,
      wakeTime,
      sleepQuality,
      duration,
      notes,
    })
    .returning();
  return record;
}

export async function getSleepRecordsByUser(userId: number, limit = 10) {
  return await drizzleDb
    .select()
    .from(sleepRecords)
    .where(eq(sleepRecords.userId, userId))
    .orderBy(sleepRecords.createdAt)
    .limit(limit);
}
