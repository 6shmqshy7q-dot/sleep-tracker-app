import { NextRequest, NextResponse } from 'next/server';
import { createSleepRecord } from '@/lib/drizzle/queries';
import { drizzleDb } from '@/lib/drizzle';
import { sleepRecords } from '@/lib/drizzle/schema';
import { eq } from 'drizzle-orm';

export async function POST(request: NextRequest) {
  try {
    const { userId, sleepTime, wakeTime, sleepQuality, notes } = await request.json();

    // 验证必需字段
    if (!userId || !sleepTime || !wakeTime || !sleepQuality) {
      return NextResponse.json(
        { error: '缺少必需字段：userId, sleepTime, wakeTime, sleepQuality' },
        { status: 400 }
      );
    }

    // 计算睡眠时长
    const sleepDate = new Date(sleepTime);
    const wakeDate = new Date(wakeTime);

    // 验证时间有效性
    if (isNaN(sleepDate.getTime()) || isNaN(wakeDate.getTime())) {
      return NextResponse.json(
        { error: '时间格式无效，请检查入睡时间和起床时间' },
        { status: 400 }
      );
    }

    // 验证起床时间在入睡时间之后
    if (wakeDate <= sleepDate) {
      return NextResponse.json(
        { error: '起床时间必须晚于入睡时间' },
        { status: 400 }
      );
    }

    const duration = Math.floor((wakeDate.getTime() - sleepDate.getTime()) / 1000 / 60);

    const record = await createSleepRecord(
      userId,
      sleepDate,
      wakeDate,
      sleepQuality,
      duration,
      notes
    );

    return NextResponse.json(
      {
        success: true,
        record,
      },
      { status: 201 }
    );
  } catch (error) {
    console.error('Record sleep error:', error);
    return NextResponse.json(
      { error: `服务器错误: ${error instanceof Error ? error.message : 'Unknown error'}` },
      { status: 500 }
    );
  }
}

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const userId = searchParams.get('userId');

    if (!userId) {
      return NextResponse.json(
        { error: 'User ID is required' },
        { status: 400 }
      );
    }

    const records = await drizzleDb
      .select()
      .from(sleepRecords)
      .where(eq(sleepRecords.userId, parseInt(userId)))
      .orderBy(sleepRecords.createdAt);

    return NextResponse.json({
      success: true,
      records,
    });
  } catch (error) {
    console.error('Get records error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
