import { neon } from '@neondatabase/serverless';
import { drizzle } from 'drizzle-orm/neon-http';
import * as schema from './schema';

// 创建 Neon HTTP 客户端
const sql = neon(process.env.DATABASE_URL || '');

// 创建 Drizzle 实例
export const db = drizzle(sql, { schema });

// 导出数据库实例和 schema
export * from './schema';
