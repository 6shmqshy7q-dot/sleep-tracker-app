import { Pool } from 'pg';

// 读取 .env.local 中配置的数据库连接信息
const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: true
});

// 测试数据库连接的 GET 接口
export async function GET() {
  let client;
  try {
    // 获取数据库连接
    client = await pool.connect();

    // 执行简单的 SQL 查询，验证连接有效性
    const result = await client.query('SELECT 1 as test');

    return Response.json({
      success: true,
      message: 'Neon 数据库连接成功！',
      data: result.rows
    });
  } catch (error) {
    // 连接失败时返回详细错误，方便排查
    return Response.json({
      success: false,
      message: '数据库连接失败',
      error: error.message
    }, { status: 500 });
  } finally {
    // 释放连接
    if (client) {
      client.release();
    }
  }
}
