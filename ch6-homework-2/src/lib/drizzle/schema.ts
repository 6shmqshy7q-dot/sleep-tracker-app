import { pgTable, serial, text, timestamp, varchar, integer } from 'drizzle-orm/pg-core';

// 用户表
export const users = pgTable('users', {
  id: serial('id').primaryKey(),
  email: varchar('email', { length: 255 }).notNull().unique(),
  username: varchar('username', { length: 255 }).notNull(),
  passwordHash: text('password_hash').notNull(),
  createdAt: timestamp('created_at').defaultNow(),
});

// 睡眠记录表
export const sleepRecords = pgTable('sleep_records', {
  id: serial('id').primaryKey(),
  userId: integer('user_id').notNull().references(() => users.id),
  sleepTime: timestamp('sleep_time').notNull(),
  wakeTime: timestamp('wake_time').notNull(),
  sleepQuality: varchar('sleep_quality', { length: 50 }).notNull(), // 好/中/差
  duration: integer('duration').notNull(), // 睡眠时长（分钟）
  notes: text('notes'),
  createdAt: timestamp('created_at').defaultNow(),
});

// 用户资料表
export const userProfiles = pgTable('user_profiles', {
  id: serial('id').primaryKey(),
  userId: integer('user_id').notNull().references(() => users.id),
  fullName: varchar('full_name', { length: 255 }),
  age: integer('age'),
  gender: varchar('gender', { length: 20 }),
  createdAt: timestamp('created_at').defaultNow(),
});
