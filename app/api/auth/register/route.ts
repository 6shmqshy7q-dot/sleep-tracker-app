import { NextRequest, NextResponse } from 'next/server';
import { db, users } from '../../../../src/db';
import { eq } from 'drizzle-orm';
import bcrypt from 'bcryptjs';

export async function POST(request: NextRequest) {
  try {
    const { username, email, password } = await request.json();

    // 1. 验证必填字段
    if (!username || !email || !password) {
      return NextResponse.json(
        { error: '用户名、邮箱、密码不能为空' },
        { status: 400 }
      );
    }

    // 2. 检查邮箱是否已存在
    const existingUser = await db
      .select()
      .from(users)
      .where(eq(users.email, email))
      .limit(1);

    if (existingUser.length > 0) {
      return NextResponse.json(
        { error: '该邮箱已被注册' },
        { status: 409 }
      );
    }

    // 3. 检查用户名是否已存在
    const existingUsername = await db
      .select()
      .from(users)
      .where(eq(users.username, username))
      .limit(1);

    if (existingUsername.length > 0) {
      return NextResponse.json(
        { error: '该用户名已被占用' },
        { status: 409 }
      );
    }

    // 4. 密码加密（10轮哈希）
    const hashedPassword = await bcrypt.hash(password, 10);

    // 5. 插入新用户
    await db.insert(users).values({
      username,
      email,
      password: hashedPassword,
      createdAt: new Date(),
      updatedAt: new Date(),
    });

    return NextResponse.json(
      { message: '注册成功，请登录' },
      { status: 201 }
    );
  } catch (error) {
    console.error('注册失败：', error);
    return NextResponse.json(
      { error: '注册失败，请稍后重试' },
      { status: 500 }
    );
  }
}
