import { NextRequest, NextResponse } from 'next/server';
import { db, users } from '../../../../src/db';
import { eq } from 'drizzle-orm';
import bcrypt from 'bcryptjs';

export async function POST(request: NextRequest) {
  try {
    const { username, email, password } = await request.json();

    // 验证输入
    if (!username || !email || !password) {
      return NextResponse.json(
        { success: false, message: '所有字段都是必填的' },
        { status: 400 }
      );
    }

    // 检查用户是否已存在
    const existingUser = await db.select()
      .from(users)
      .where(eq(users.email, email))
      .limit(1);

    if (existingUser.length > 0) {
      return NextResponse.json(
        { success: false, message: '邮箱已被注册' },
        { status: 400 }
      );
    }

    // 加密密码
    const hashedPassword = await bcrypt.hash(password, 10);

    // 创建用户
    const newUser = await db.insert(users)
      .values({
        username,
        email,
        password: hashedPassword,
      })
      .returning();

    return NextResponse.json(
      {
        success: true,
        message: '用户注册成功',
        user: {
          id: newUser[0].id,
          username: newUser[0].username,
          email: newUser[0].email,
        }
      },
      { status: 201 }
    );
  } catch (error) {
    console.error('注册错误:', error);
    return NextResponse.json(
      { success: false, message: '注册失败', error: (error as Error).message },
      { status: 500 }
    );
  }
}
