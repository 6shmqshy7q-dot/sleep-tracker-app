import { pgTable, text, timestamp, serial, integer } from 'drizzle-orm/pg-core';

// 定义 users 表
export const users = pgTable('users', {
  id: serial('id').primaryKey(),
  username: text('username').notNull().unique(),
  email: text('email').notNull().unique(),
  password: text('password').notNull(),
  createdAt: timestamp('created_at').defaultNow(),
  updatedAt: timestamp('updated_at').defaultNow(),
});

// 定义睡眠记录表
export const sleepRecords = pgTable('sleep_records', {
  id: serial('id').primaryKey(),
  userId: integer('user_id').notNull().references(() => users.id),
  sleepTime: timestamp('sleep_time').notNull(),  // 入睡时间
  wakeTime: timestamp('wake_time').notNull(),    // 起床时间
  sleepQuality: integer('sleep_quality').notNull(), // 睡眠质量 1-10
  duration: integer('duration').notNull(), // 睡眠时长（分钟）
  environment: text('environment'), // 环境因素（JSON字符串）
  notes: text('notes'), // 备注
  createdAt: timestamp('created_at').defaultNow(),
  updatedAt: timestamp('updated_at').defaultNow(),
});

// 定义睡眠分析表
export const sleepAnalyses = pgTable('sleep_analyses', {
  id: serial('id').primaryKey(),
  userId: integer('user_id').notNull().references(() => users.id),
  date: timestamp('date').notNull(), // 分析日期
  avgSleepDuration: integer('avg_sleep_duration').notNull(), // 平均睡眠时长
  avgSleepQuality: integer('avg_sleep_quality').notNull(), // 平均睡眠质量
  totalRecords: integer('total_records').notNull(), // 记录总数
  bestSleepTime: timestamp('best_sleep_time'), // 最佳睡眠时间
  recommendation: text('recommendation'), // 建议（JSON字符串）
  createdAt: timestamp('created_at').defaultNow(),
});

// 定义 posts 表（保留原有）
export const posts = pgTable('posts', {
  id: serial('id').primaryKey(),
  title: text('title').notNull(),
  content: text('content').notNull(),
  userId: integer('user_id').references(() => users.id),
  createdAt: timestamp('created_at').defaultNow(),
  updatedAt: timestamp('updated_at').defaultNow(),
});

// 类型导出
export type User = typeof users.$inferSelect;
export type NewUser = typeof users.$inferInsert;
export type SleepRecord = typeof sleepRecords.$inferSelect;
export type NewSleepRecord = typeof sleepRecords.$inferInsert;
export type SleepAnalysis = typeof sleepAnalyses.$inferSelect;
export type NewSleepAnalysis = typeof sleepAnalyses.$inferInsert;
export type Post = typeof posts.$inferSelect;
export type NewPost = typeof posts.$inferInsert;
