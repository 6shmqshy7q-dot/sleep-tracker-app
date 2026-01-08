'use client';

import { useState, useEffect } from 'react';
import { useSession } from 'next-auth/react';

interface SleepRecord {
  id: number;
  userId: number;
  sleepTime: string;
  wakeTime: string;
  sleepQuality: number;
  duration: number;
  environment?: string;
  notes?: string;
  createdAt: string;
}

export default function SleepPage() {
  const { data: session } = useSession();
  const [records, setRecords] = useState<SleepRecord[]>([]);
  const [loading, setLoading] = useState(false);
  const [showForm, setShowForm] = useState(false);
  const [formData, setFormData] = useState({
    sleepTime: '',
    wakeTime: '',
    sleepQuality: 7,
    environment: '',
    notes: '',
  });

  // 获取睡眠记录
  const fetchRecords = async () => {
    if (!session?.user?.id) return;

    setLoading(true);
    try {
      const response = await fetch(`/api/sleep/record?userId=${session.user.id}`);
      const data = await response.json();
      if (response.ok) {
        setRecords(data.data);
      }
    } catch (error) {
      console.error('获取睡眠记录失败:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchRecords();
  }, [session]);

  // 提交表单
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!session?.user?.id) return;

    setLoading(true);
    try {
      const response = await fetch('/api/sleep/record', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          userId: session.user.id,
          ...formData,
          environment: formData.environment ? JSON.parse(formData.environment) : null,
        }),
      });

      if (response.ok) {
        alert('睡眠记录已保存！');
        setShowForm(false);
        setFormData({
          sleepTime: '',
          wakeTime: '',
          sleepQuality: 7,
          environment: '',
          notes: '',
        });
        fetchRecords();
      } else {
        const error = await response.json();
        alert(error.error || '保存失败');
      }
    } catch (error) {
      console.error('保存失败:', error);
      alert('保存失败，请重试');
    } finally {
      setLoading(false);
    }
  };

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

  // 获取质量描述
  const getQualityLabel = (quality: number) => {
    if (quality <= 3) return { label: '差', emoji: '😴' };
    if (quality <= 6) return { label: '中', emoji: '😐' };
    if (quality <= 8) return { label: '好', emoji: '😊' };
    return { label: '很好', emoji: '😄' };
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
        <h1>🌙 睡眠记录</h1>
        <button
          onClick={() => setShowForm(!showForm)}
          style={{
            padding: '10px 20px',
            background: 'white',
            color: '#667eea',
            border: 'none',
            borderRadius: '8px',
            cursor: 'pointer',
            fontWeight: 'bold',
          }}
        >
          {showForm ? '取消' : '+ 添加记录'}
        </button>
      </div>

      {/* Form */}
      {showForm && (
        <div style={{
          background: 'white',
          padding: '30px',
          borderRadius: '15px',
          boxShadow: '0 4px 6px rgba(0,0,0,0.1)',
          marginBottom: '30px',
        }}>
          <h2 style={{ marginBottom: '20px' }}>添加睡眠记录</h2>
          <form onSubmit={handleSubmit}>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px', marginBottom: '20px' }}>
              <div>
                <label style={{ display: 'block', marginBottom: '5px', fontWeight: 'bold' }}>
                  入睡时间 *
                </label>
                <input
                  type="datetime-local"
                  value={formData.sleepTime}
                  onChange={(e) => setFormData({ ...formData, sleepTime: e.target.value })}
                  required
                  style={{
                    width: '100%',
                    padding: '10px',
                    border: '2px solid #ddd',
                    borderRadius: '8px',
                  }}
                />
              </div>
              <div>
                <label style={{ display: 'block', marginBottom: '5px', fontWeight: 'bold' }}>
                  起床时间 *
                </label>
                <input
                  type="datetime-local"
                  value={formData.wakeTime}
                  onChange={(e) => setFormData({ ...formData, wakeTime: e.target.value })}
                  required
                  style={{
                    width: '100%',
                    padding: '10px',
                    border: '2px solid #ddd',
                    borderRadius: '8px',
                  }}
                />
              </div>
            </div>

            <div style={{ marginBottom: '20px' }}>
              <label style={{ display: 'block', marginBottom: '5px', fontWeight: 'bold' }}>
                睡眠质量 ({formData.sleepQuality}) *
              </label>
              <input
                type="range"
                min="1"
                max="10"
                value={formData.sleepQuality}
                onChange={(e) => setFormData({ ...formData, sleepQuality: parseInt(e.target.value) })}
                style={{ width: '100%' }}
              />
              <div style={{ textAlign: 'center', marginTop: '10px', fontSize: '18px' }}>
                {getQualityLabel(formData.sleepQuality).emoji} {getQualityLabel(formData.sleepQuality).label}
              </div>
            </div>

            <div style={{ marginBottom: '20px' }}>
              <label style={{ display: 'block', marginBottom: '5px', fontWeight: 'bold' }}>
                环境因素 (JSON格式，可选)
              </label>
              <textarea
                value={formData.environment}
                onChange={(e) => setFormData({ ...formData, environment: e.target.value })}
                placeholder='例如: {"噪音": "低", "光线": "暗", "温度": "22°C"}'
                rows={3}
                style={{
                  width: '100%',
                  padding: '10px',
                  border: '2px solid #ddd',
                  borderRadius: '8px',
                }}
              />
            </div>

            <div style={{ marginBottom: '20px' }}>
              <label style={{ display: 'block', marginBottom: '5px', fontWeight: 'bold' }}>
                备注 (可选)
              </label>
              <textarea
                value={formData.notes}
                onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
                placeholder="记录任何想备注的内容..."
                rows={3}
                style={{
                  width: '100%',
                  padding: '10px',
                  border: '2px solid #ddd',
                  borderRadius: '8px',
                }}
              />
            </div>

            <button
              type="submit"
              disabled={loading}
              style={{
                width: '100%',
                padding: '12px',
                background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                color: 'white',
                border: 'none',
                borderRadius: '8px',
                cursor: loading ? 'not-allowed' : 'pointer',
                fontWeight: 'bold',
              }}
            >
              {loading ? '保存中...' : '保存记录'}
            </button>
          </form>
        </div>
      )}

      {/* Records List */}
      <div style={{ background: 'white', padding: '30px', borderRadius: '15px', boxShadow: '0 4px 6px rgba(0,0,0,0.1)' }}>
        <h2 style={{ marginBottom: '20px' }}>睡眠记录列表</h2>

        {loading && records.length === 0 ? (
          <p style={{ textAlign: 'center', color: '#999' }}>加载中...</p>
        ) : records.length === 0 ? (
          <p style={{ textAlign: 'center', color: '#999' }}>暂无记录，点击上方按钮添加您的第一条睡眠记录！</p>
        ) : (
          <div style={{ display: 'grid', gap: '15px' }}>
            {records.map((record) => {
              const quality = getQualityLabel(record.sleepQuality);
              return (
                <div
                  key={record.id}
                  style={{
                    padding: '20px',
                    border: '2px solid #e0e0e0',
                    borderRadius: '10px',
                    background: 'linear-gradient(135deg, #f093fb 0%, #f5576c 100%)',
                    color: 'white',
                  }}
                >
                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '15px', marginBottom: '10px' }}>
                    <div>
                      <strong>🕐 入睡:</strong><br />
                      {formatDateTime(record.sleepTime)}
                    </div>
                    <div>
                      <strong>🕑 起床:</strong><br />
                      {formatDateTime(record.wakeTime)}
                    </div>
                    <div>
                      <strong>⏱️ 时长:</strong><br />
                      {formatDuration(record.duration)}
                    </div>
                  </div>

                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '15px' }}>
                    <div>
                      <strong>💤 质量:</strong> {quality.emoji} {quality.label} ({record.sleepQuality}/10)
                    </div>
                    <div>
                      <strong>📅 记录时间:</strong> {formatDateTime(record.createdAt)}
                    </div>
                  </div>

                  {record.notes && (
                    <div style={{ marginTop: '10px', padding: '10px', background: 'rgba(255,255,255,0.2)', borderRadius: '5px' }}>
                      <strong>📝 备注:</strong> {record.notes}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}
