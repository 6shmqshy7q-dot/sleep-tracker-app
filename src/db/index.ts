import { neon } from '@neondatabase/serverless';
import { drizzle } from 'drizzle-orm/neon-http';
import * as schema from './schema';

// 创建全局变量缓存数据库实例（避免重复创建）
const globalForDb = globalThis as unknown as {
  db?: ReturnType<typeof drizzle>;
};

// 创建数据库连接的懒加载函数
function createDb() {
  if (!globalForDb.db) {
    if (!process.env.DATABASE_URL) {
      throw new Error('DATABASE_URL environment variable is not set');
    }
    const sql = neon(process.env.DATABASE_URL);
    globalForDb.db = drizzle(sql, { schema });
  }
  return globalForDb.db!;
}

// 使用 Proxy 实现延迟加载（只有实际访问属性时才创建连接）
const dbProxy = new Proxy({} as any, {
  get(target, prop) {
    // 触发数据库连接创建
    return (createDb() as any)[prop];
  }
});

// 导出代理对象
export { dbProxy as db };

// 导出数据库实例和 schema
export * from './schema';
