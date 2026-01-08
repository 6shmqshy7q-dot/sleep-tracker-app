import { NextRequest, NextResponse } from 'next/server';
import { db, sleepRecords } from '../../../../src/db';
import { eq, and, desc } from 'drizzle-orm';

// 获取睡眠记录列表
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const userId = searchParams.get('userId');
    const limit = parseInt(searchParams.get('limit') || '30');

    if (!userId) {
      return NextResponse.json(
        { error: '用户ID不能为空' },
        { status: 400 }
      );
    }

    const records = await db
      .select()
      .from(sleepRecords)
      .where(eq(sleepRecords.userId, parseInt(userId)))
      .orderBy(desc(sleepRecords.createdAt))
      .limit(limit);

    return NextResponse.json({ data: records });
  } catch (error) {
    console.error('获取睡眠记录失败：', error);
    return NextResponse.json(
      { error: '获取睡眠记录失败' },
      { status: 500 }
    );
  }
}

// 创建新的睡眠记录
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { userId, sleepTime, wakeTime, sleepQuality, environment, notes } = body;

    // 验证必填字段
    if (!userId || !sleepTime || !wakeTime || !sleepQuality) {
      return NextResponse.json(
        { error: '用户ID、睡眠时间、起床时间、睡眠质量都是必填项' },
        { status: 400 }
      );
    }

    // 计算睡眠时长（分钟）
    const duration = Math.floor(
      (new Date(wakeTime).getTime() - new Date(sleepTime).getTime()) / 1000 / 60
    );

    // 验证睡眠质量
    if (sleepQuality < 1 || sleepQuality > 10) {
      return NextResponse.json(
        { error: '睡眠质量必须在 1-10 之间' },
        { status: 400 }
      );
    }

    // 验证睡眠时长（不能超过24小时）
    if (duration < 0 || duration > 24 * 60) {
      return NextResponse.json(
        { error: '睡眠时长不能为负数或超过24小时' },
        { status: 400 }
      );
    }

    // 插入新记录
    const newRecord = await db.insert(sleepRecords).values({
      userId: parseInt(userId),
      sleepTime: new Date(sleepTime),
      wakeTime: new Date(wakeTime),
      sleepQuality: parseInt(sleepQuality),
      duration,
      environment: environment ? JSON.stringify(environment) : null,
      notes,
      createdAt: new Date(),
      updatedAt: new Date(),
    }).returning();

    return NextResponse.json(
      { message: '睡眠记录创建成功', data: newRecord[0] },
      { status: 201 }
    );
  } catch (error) {
    console.error('创建睡眠记录失败：', error);
    return NextResponse.json(
      { error: '创建睡眠记录失败' },
      { status: 500 }
    );
  }
}
