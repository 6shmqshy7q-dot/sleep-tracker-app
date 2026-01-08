import { NextRequest, NextResponse } from 'next/server';
import { db, sleepRecords } from '../../../../src/db';
import { eq, desc } from 'drizzle-orm';

// 导出睡眠数据为 CSV 格式
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const userId = searchParams.get('userId');
    const format = searchParams.get('format') || 'csv'; // csv, json

    if (!userId) {
      return NextResponse.json(
        { error: '用户ID不能为空' },
        { status: 400 }
      );
    }

    // 获取用户的所有睡眠记录
    const records = await db
      .select()
      .from(sleepRecords)
      .where(eq(sleepRecords.userId, parseInt(userId)))
      .orderBy(desc(sleepRecords.createdAt));

    if (records.length === 0) {
      return NextResponse.json(
        { error: '暂无睡眠记录数据' },
        { status: 404 }
      );
    }

    // 准备导出数据
    const exportData = records.map((record: any) => ({
      '记录ID': record.id,
      '入睡时间': new Date(record.sleepTime).toLocaleString('zh-CN'),
      '起床时间': new Date(record.wakeTime).toLocaleString('zh-CN'),
      '睡眠质量': record.sleepQuality,
      '睡眠时长（分钟）': record.duration,
      '睡眠时长（小时）': (record.duration / 60).toFixed(1),
      '环境因素': record.environment || '',
      '备注': record.notes || '',
      '记录时间': new Date(record.createdAt).toLocaleString('zh-CN'),
    }));

    if (format === 'json') {
      return NextResponse.json({
        data: exportData,
        summary: {
          totalRecords: records.length,
          avgSleepDuration: Math.round(records.reduce((sum: number, r: any) => sum + r.duration, 0) / records.length),
          avgSleepQuality: Math.round(records.reduce((sum: number, r: any) => sum + r.sleepQuality, 0) / records.length),
        }
      });
    }

    // 生成 CSV 格式
    const headers = Object.keys(exportData[0]);
    const csvContent = [
      headers.join(','),
      ...exportData.map((row: any) =>
        headers.map((header: string) => {
          const value = row[header];
          // 处理包含逗号或换行的字段
          if (typeof value === 'string' && (value.includes(',') || value.includes('\n'))) {
            return `"${value.replace(/"/g, '""')}"`;
          }
          return value;
        }).join(',')
      )
    ].join('\n');

    // 创建响应
    const response = new NextResponse(csvContent, {
      headers: {
        'Content-Type': 'text/csv; charset=utf-8',
        'Content-Disposition': `attachment; filename="sleep_records_${userId}_${new Date().toISOString().split('T')[0]}.csv"`,
        'Cache-Control': 'no-cache',
      },
    });

    return response;
  } catch (error) {
    console.error('导出数据失败：', error);
    return NextResponse.json(
      { error: '导出数据失败' },
      { status: 500 }
    );
  }
}
