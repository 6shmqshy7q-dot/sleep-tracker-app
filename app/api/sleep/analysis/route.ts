import { NextRequest, NextResponse } from 'next/server';
import { db, sleepRecords, sleepAnalyses } from '../../../../src/db';
import { eq, and, desc, gte, lte } from 'drizzle-orm';

// 获取睡眠分析数据
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const userId = searchParams.get('userId');
    const period = searchParams.get('period') || 'week'; // week, month, year

    if (!userId) {
      return NextResponse.json(
        { error: '用户ID不能为空' },
        { status: 400 }
      );
    }

    const now = new Date();
    let startDate: Date;

    // 计算开始日期
    switch (period) {
      case 'week':
        startDate = new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000);
        break;
      case 'month':
        startDate = new Date(now.getTime() - 30 * 24 * 60 * 60 * 1000);
        break;
      case 'year':
        startDate = new Date(now.getTime() - 365 * 24 * 60 * 60 * 1000);
        break;
      default:
        startDate = new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000);
    }

    // 获取指定时间范围内的睡眠记录
    const records = await db
      .select()
      .from(sleepRecords)
      .where(
        and(
          eq(sleepRecords.userId, parseInt(userId)),
          gte(sleepRecords.createdAt, startDate)
        )
      )
      .orderBy(desc(sleepRecords.createdAt));

    if (records.length === 0) {
      return NextResponse.json({
        data: {
          period,
          summary: {
            totalRecords: 0,
            avgSleepDuration: 0,
            avgSleepQuality: 0,
            totalSleepTime: 0,
          },
          records: [],
          recommendations: [],
        }
      });
    }

    // 计算统计数据
    const totalRecords = records.length;
    const totalSleepTime = records.reduce((sum: number, record: any) => sum + record.duration, 0);
    const avgSleepDuration = Math.round(totalSleepTime / totalRecords);
    const avgSleepQuality = Math.round(
      records.reduce((sum: number, record: any) => sum + record.sleepQuality, 0) / totalRecords
    );

    // 生成建议
    const recommendations = generateRecommendations(records, avgSleepDuration, avgSleepQuality);

    // 查找最佳睡眠时间（睡眠质量最高且时长适中的记录）
    const bestRecord = records.reduce((best: any, current: any) => {
      if (!best) return current;
      const bestScore = (best.sleepQuality * 10) - Math.abs(best.duration - 8 * 60) / 10;
      const currentScore = (current.sleepQuality * 10) - Math.abs(current.duration - 8 * 60) / 10;
      return currentScore > bestScore ? current : best;
    });

    const result = {
      period,
      summary: {
        totalRecords,
        avgSleepDuration,
        avgSleepQuality,
        totalSleepTime,
        bestSleepTime: bestRecord ? bestRecord.sleepTime : null,
        qualityTrend: calculateTrend(records),
      },
      records: records.slice(0, 10), // 最近10条记录
      recommendations,
    };

    return NextResponse.json({ data: result });
  } catch (error) {
    console.error('获取睡眠分析失败：', error);
    return NextResponse.json(
      { error: '获取睡眠分析失败' },
      { status: 500 }
    );
  }
}

// 生成睡眠建议
function generateRecommendations(records: any[], avgDuration: number, avgQuality: number): string[] {
  const recommendations: string[] = [];

  // 基于平均睡眠时长的建议
  if (avgDuration < 6 * 60) {
    recommendations.push('您的平均睡眠时间不足，建议每晚睡眠至少7-8小时');
  } else if (avgDuration > 9 * 60) {
    recommendations.push('您的睡眠时间过长，可能影响睡眠质量，建议控制在7-8小时');
  } else {
    recommendations.push('您的睡眠时长非常合适，请继续保持');
  }

  // 基于睡眠质量的建议
  if (avgQuality < 6) {
    recommendations.push('睡眠质量需要改善，建议睡前避免使用电子设备');
    recommendations.push('可以尝试冥想或深呼吸来改善睡眠质量');
  } else if (avgQuality > 8) {
    recommendations.push('您的睡眠质量很棒！继续保持当前的睡眠习惯');
  }

  // 基于睡眠时间规律的建议
  const bedtimes = records.map((r: any) => new Date(r.sleepTime).getHours());
  const mostCommonBedtime = bedtimes.sort((a: number, b: number) =>
    bedtimes.filter(v => v === a).length - bedtimes.filter(v => v === b).length
  ).pop();

  if (mostCommonBedtime) {
    if (mostCommonBedtime < 22) {
      recommendations.push('您睡得较早，早睡早起有利于身体健康');
    } else if (mostCommonBedtime > 24 || mostCommonBedtime < 1) {
      recommendations.push('您睡得较晚，建议调整作息时间，避免熬夜');
    }
  }

  return recommendations;
}

// 计算睡眠质量趋势
function calculateTrend(records: any[]): string {
  if (records.length < 2) return 'stable';

  const sortedRecords = records.sort((a: any, b: any) =>
    new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime()
  );

  const firstHalf = sortedRecords.slice(0, Math.floor(records.length / 2));
  const secondHalf = sortedRecords.slice(Math.floor(records.length / 2));

  const firstAvg = firstHalf.reduce((sum: number, r: any) => sum + r.sleepQuality, 0) / firstHalf.length;
  const secondAvg = secondHalf.reduce((sum: number, r: any) => sum + r.sleepQuality, 0) / secondHalf.length;

  const diff = secondAvg - firstAvg;

  if (diff > 0.5) return 'improving';
  if (diff < -0.5) return 'declining';
  return 'stable';
}
