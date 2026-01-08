'use client';

import { useState, useEffect } from 'react';
import { useSession } from 'next-auth/react';

interface SleepAnalysis {
  period: string;
  summary: {
    totalRecords: number;
    avgSleepDuration: number;
    avgSleepQuality: number;
    totalSleepTime: number;
    bestSleepTime?: string;
    qualityTrend: string;
  };
  records: any[];
  recommendations: string[];
}

export default function AnalyticsPage() {
  const { data: session } = useSession();
  const [analysis, setAnalysis] = useState<SleepAnalysis | null>(null);
  const [loading, setLoading] = useState(false);
  const [period, setPeriod] = useState('week');

  // 获取睡眠分析
  const fetchAnalysis = async () => {
    if (!session?.user?.id) return;

    setLoading(true);
    try {
      const response = await fetch(`/api/sleep/analysis?userId=${session.user.id}&period=${period}`);
      const data = await response.json();
      if (response.ok) {
        setAnalysis(data.data);
      }
    } catch (error) {
      console.error('获取睡眠分析失败:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAnalysis();
  }, [session, period]);

  // 格式化时间
  const formatDateTime = (dateStr: string) => {
    return new Date(dateStr).toLocaleString('zh-CN');
  };

  // 格式化时长
  const formatDuration = (minutes: number) => {
    const hours = Math.floor(minutes / 60);
    const mins = minutes % 60;
    return `${hours}小时${mins}分钟`;
  };

  // 获取质量趋势
  const getTrendLabel = (trend: string) => {
    switch (trend) {
      case 'improving':
        return { label: '改善中', emoji: '📈', color: '#28a745' };
      case 'declining':
        return { label: '下降', emoji: '📉', color: '#dc3545' };
      default:
        return { label: '稳定', emoji: '➡️', color: '#6c757d' };
    }
  };

  // 获取质量标签
  const getQualityLabel = (quality: number) => {
    if (quality <= 3) return { label: '差', emoji: '😴', color: '#dc3545' };
    if (quality <= 6) return { label: '中', emoji: '😐', color: '#ffc107' };
    if (quality <= 8) return { label: '好', emoji: '😊', color: '#28a745' };
    return { label: '很好', emoji: '😄', color: '#007bff' };
  };

  return (
    <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '20px' }}>
      {/* Header */}
      <div style={{
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: '30px',
        padding: '20px',
        background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
        color: 'white',
        borderRadius: '15px',
      }}>
        <h1>📊 睡眠分析</h1>
        <div>
          <select
            value={period}
            onChange={(e) => setPeriod(e.target.value)}
            style={{
              padding: '8px 12px',
              border: 'none',
              borderRadius: '8px',
              background: 'white',
              color: '#667eea',
              fontWeight: 'bold',
            }}
          >
            <option value="week">近一周</option>
            <option value="month">近一月</option>
            <option value="year">近一年</option>
          </select>
        </div>
      </div>

      {loading ? (
        <div style={{
          background: 'white',
          padding: '40px',
          borderRadius: '15px',
          textAlign: 'center',
        }}>
          <p>加载分析数据中...</p>
        </div>
      ) : !analysis || analysis.summary.totalRecords === 0 ? (
        <div style={{
          background: 'white',
          padding: '40px',
          borderRadius: '15px',
          textAlign: 'center',
          color: '#999',
        }}>
          <p>暂无睡眠记录数据，请先添加睡眠记录！</p>
        </div>
      ) : (
        <>
          {/* Summary Cards */}
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
            gap: '20px',
            marginBottom: '30px',
          }}>
            {/* 总记录数 */}
            <div style={{
              background: 'white',
              padding: '25px',
              borderRadius: '15px',
              boxShadow: '0 4px 6px rgba(0,0,0,0.1)',
            }}>
              <div style={{ fontSize: '40px', marginBottom: '10px' }}>📝</div>
              <h3 style={{ margin: '0 0 10px 0', color: '#333' }}>总记录数</h3>
              <p style={{ fontSize: '32px', fontWeight: 'bold', margin: 0, color: '#667eea' }}>
                {analysis.summary.totalRecords}
              </p>
              <p style={{ color: '#999', margin: '5px 0 0 0' }}>条记录</p>
            </div>

            {/* 平均睡眠时长 */}
            <div style={{
              background: 'white',
              padding: '25px',
              borderRadius: '15px',
              boxShadow: '0 4px 6px rgba(0,0,0,0.1)',
            }}>
              <div style={{ fontSize: '40px', marginBottom: '10px' }}>⏰</div>
              <h3 style={{ margin: '0 0 10px 0', color: '#333' }}>平均睡眠</h3>
              <p style={{ fontSize: '32px', fontWeight: 'bold', margin: 0, color: '#28a745' }}>
                {formatDuration(analysis.summary.avgSleepDuration)}
              </p>
              <p style={{ color: '#999', margin: '5px 0 0 0' }}>每晚</p>
            </div>

            {/* 平均睡眠质量 */}
            <div style={{
              background: 'white',
              padding: '25px',
              borderRadius: '15px',
              boxShadow: '0 4px 6px rgba(0,0,0,0.1)',
            }}>
              <div style={{ fontSize: '40px', marginBottom: '10px' }}>⭐</div>
              <h3 style={{ margin: '0 0 10px 0', color: '#333' }}>平均质量</h3>
              <p style={{ fontSize: '32px', fontWeight: 'bold', margin: 0, color: '#ffc107' }}>
                {analysis.summary.avgSleepQuality}
              </p>
              <p style={{ color: '#999', margin: '5px 0 0 0' }}>/10 分</p>
            </div>

            {/* 趋势 */}
            <div style={{
              background: 'white',
              padding: '25px',
              borderRadius: '15px',
              boxShadow: '0 4px 6px rgba(0,0,0,0.1)',
            }}>
              <div style={{ fontSize: '40px', marginBottom: '10px' }}>
                {getTrendLabel(analysis.summary.qualityTrend).emoji}
              </div>
              <h3 style={{ margin: '0 0 10px 0', color: '#333' }}>质量趋势</h3>
              <p style={{
                fontSize: '20px',
                fontWeight: 'bold',
                margin: 0,
                color: getTrendLabel(analysis.summary.qualityTrend).color,
              }}>
                {getTrendLabel(analysis.summary.qualityTrend).label}
              </p>
            </div>
          </div>

          {/* Recommendations */}
          {analysis.recommendations.length > 0 && (
            <div style={{
              background: 'white',
              padding: '30px',
              borderRadius: '15px',
              boxShadow: '0 4px 6px rgba(0,0,0,0.1)',
              marginBottom: '30px',
            }}>
              <h2 style={{ marginBottom: '20px' }}>💡 智能建议</h2>
              <div style={{ display: 'grid', gap: '15px' }}>
                {analysis.recommendations.map((rec, index) => (
                  <div
                    key={index}
                    style={{
                      padding: '15px',
                      background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                      color: 'white',
                      borderRadius: '10px',
                    }}
                  >
                    {rec}
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Records Chart */}
          <div style={{
            background: 'white',
            padding: '30px',
            borderRadius: '15px',
            boxShadow: '0 4px 6px rgba(0,0,0,0.1)',
          }}>
            <h2 style={{ marginBottom: '20px' }}>📈 睡眠记录详情</h2>

            <div style={{ display: 'grid', gap: '15px' }}>
              {analysis.records.map((record) => {
                const quality = getQualityLabel(record.sleepQuality);
                return (
                  <div
                    key={record.id}
                    style={{
                      padding: '20px',
                      border: '2px solid #e0e0e0',
                      borderRadius: '10px',
                      display: 'grid',
                      gridTemplateColumns: '2fr 1fr 1fr 1fr',
                      gap: '15px',
                      alignItems: 'center',
                    }}
                  >
                    <div>
                      <strong>{formatDateTime(record.sleepTime)}</strong>
                      <div style={{ fontSize: '12px', color: '#999' }}>
                        至 {formatDateTime(record.wakeTime)}
                      </div>
                    </div>

                    <div style={{ textAlign: 'center' }}>
                      <div style={{ fontWeight: 'bold' }}>
                        {formatDuration(record.duration)}
                      </div>
                      <div style={{ fontSize: '12px', color: '#999' }}>睡眠时长</div>
                    </div>

                    <div style={{ textAlign: 'center' }}>
                      <div style={{
                        fontWeight: 'bold',
                        color: quality.color,
                        fontSize: '18px',
                      }}>
                        {quality.emoji} {record.sleepQuality}
                      </div>
                      <div style={{ fontSize: '12px', color: '#999' }}>睡眠质量</div>
                    </div>

                    <div style={{ textAlign: 'center' }}>
                      <div style={{ fontWeight: 'bold' }}>
                        {formatDateTime(record.createdAt).split(' ')[0]}
                      </div>
                      <div style={{ fontSize: '12px', color: '#999' }}>记录日期</div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </>
      )}
    </div>
  );
}
