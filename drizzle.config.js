/** @type {import('drizzle-kit').Config} */
export default {
  schema: "./src/db/schema.ts",
  out: "./drizzle",
  dialect: "postgresql",
  dbCredentials: {
    url: process.env.DATABASE_URL,
    // 关键：添加 SSL 配置，跳过证书验证
    ssl: {
      rejectUnauthorized: false
    }
  },
  // 其他配置
  verbose: true,
  strict: true,
};
