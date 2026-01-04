import { db, users } from '../../../src/db';
import { eq } from 'drizzle-orm';

// 测试 Drizzle ORM 的 GET 接口
export async function GET() {
  try {
    // 使用 Drizzle ORM 查询 users 表
    const allUsers = await db.select().from(users);
    
    return Response.json({
      success: true,
      message: 'Drizzle ORM 查询成功！',
      data: allUsers,
      count: allUsers.length
    });
  } catch (error) {
    return Response.json({
      success: false,
      message: 'Drizzle ORM 查询失败',
      error: error.message
    }, { status: 500 });
  }
}

// 删除用户的 DELETE 接口
export async function DELETE(request) {
  try {
    const { or } = await import('drizzle-orm');

    // 删除明文密码的测试数据
    const deleted = await db.delete(users).where(
      or(
        eq(users.password, 'hashedpassword'),
        eq(users.password, 'secret123')
      )
    ).returning();

    // 查询剩余数据
    const remaining = await db.select().from(users);

    return Response.json({
      success: true,
      message: `已删除 ${deleted.length} 条明文密码记录`,
      deleted: deleted.map(u => ({ id: u.id, username: u.username })),
      remaining: remaining,
      count: remaining.length
    });
  } catch (error) {
    return Response.json({
      success: false,
      message: '删除失败',
      error: error.message
    }, { status: 500 });
  }
}

// 创建用户的 POST 接口
export async function POST(request) {
  try {
    const { username, email, password } = await request.json();
    
    // 使用 Drizzle ORM 插入数据
    const newUser = await db.insert(users).values({
      username,
      email,
      password
    }).returning();
    
    return Response.json({
      success: true,
      message: '用户创建成功！',
      data: newUser[0]
    }, { status: 201 });
  } catch (error) {
    return Response.json({
      success: false,
      message: '用户创建失败',
      error: error.message
    }, { status: 500 });
  }
}
