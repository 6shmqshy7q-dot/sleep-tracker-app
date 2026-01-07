"use client";

import { useState, useEffect } from "react";

interface SleepRecord {
  id: number;
  userId: number;
  sleepTime: string;
  wakeTime: string;
  sleepQuality: string;
  duration: number;
  notes?: string;
  createdAt: string;
}

interface SleepAnalysis {
  recordId: number;
  date: string;
  score: number;
  trend: 'up' | 'down' | 'stable';
  anomaly?: string;
  duration: number;
  efficiency: number;
}

interface Recommendation {
  id: string;
  category: 'schedule' | 'environment' | 'diet' | 'exercise';
  title: string;
  content: string;
  priority: number;
  icon: string;
}

interface Achievement {
  id: string;
  title: string;
  description: string;
  icon: string;
  earned: boolean;
  earnedAt?: string;
}

export default function SmartSleepAssistant() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [user, setUser] = useState<any>(null);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [username, setUsername] = useState("");
  const [isRegistering, setIsRegistering] = useState(false);

  // Sleep record form
  const [sleepTime, setSleepTime] = useState("");
  const [wakeTime, setWakeTime] = useState("");
  const [sleepQuality, setSleepQuality] = useState("好");
  const [notes, setNotes] = useState("");

  const [records, setRecords] = useState<SleepRecord[]>([
    {
      id: 1,
      userId: 1,
      sleepTime: "2026-01-04T22:00:00",
      wakeTime: "2026-01-05T06:00:00",
      sleepQuality: "好",
      duration: 480,
      notes: "昨晚睡得很好",
      createdAt: "2026-01-05T07:00:00"
    },
    {
      id: 2,
      userId: 1,
      sleepTime: "2026-01-03T22:30:00",
      wakeTime: "2026-01-04T06:30:00",
      sleepQuality: "中",
      duration: 480,
      notes: "还行",
      createdAt: "2026-01-04T07:00:00"
    },
    {
      id: 3,
      userId: 1,
      sleepTime: "2026-01-02T23:00:00",
      wakeTime: "2026-01-03T07:00:00",
      sleepQuality: "好",
      duration: 480,
      notes: "很舒服",
      createdAt: "2026-01-03T07:30:00"
    },
    {
      id: 4,
      userId: 1,
      sleepTime: "2026-01-01T23:30:00",
      wakeTime: "2026-01-02T07:30:00",
      sleepQuality: "中",
      duration: 480,
      notes: "节假日作息乱了",
      createdAt: "2026-01-02T08:00:00"
    }
  ]);

  // Calculate analysis data
  const [analysis, setAnalysis] = useState<SleepAnalysis[]>([]);
  const [recommendations, setRecommendations] = useState<Recommendation[]>([]);
  const [achievements, setAchievements] = useState<Achievement[]>([
    {
      id: '1',
      title: '初次记录',
      description: '完成第一次睡眠记录',
      icon: '🌙',
      earned: true,
      earnedAt: '2026-01-01'
    },
    {
      id: '2',
      title: '坚持3天',
      description: '连续记录3天睡眠',
      icon: '🔥',
      earned: true,
      earnedAt: '2026-01-03'
    },
    {
      id: '3',
      title: '规律作息',
      description: '连续7天按时睡觉',
      icon: '⏰',
      earned: false
    },
    {
      id: '4',
      title: '睡眠达人',
      description: '连续记录30天',
      icon: '👑',
      earned: false
    }
  ]);

  // Calculate sleep score
  const calculateSleepScore = (record: SleepRecord): number => {
    const duration = record.duration; // in minutes
    const targetDuration = 480; // 8 hours

    // Base score from quality
    let baseScore = record.sleepQuality === '好' ? 8.5 :
                    record.sleepQuality === '中' ? 6.5 : 4.5;

    // Adjust based on duration
    const durationDiff = Math.abs(duration - targetDuration);
    const durationScore = Math.max(0, 10 - (durationDiff / 30) * 2);

    // Weighted average
    const finalScore = (baseScore * 0.7) + (durationScore * 0.3);
    return Math.round(finalScore * 10) / 10;
  };

  // Generate trend analysis
  useEffect(() => {
    const newAnalysis = records.map(record => {
      const score = calculateSleepScore(record);
      const date = new Date(record.createdAt).toISOString().split('T')[0];

      return {
        recordId: record.id,
        date,
        score,
        trend: 'up' as 'up' | 'down' | 'stable',
        duration: record.duration,
        efficiency: Math.min(100, (record.duration / 480) * 100)
      };
    });

    // Calculate trends
    for (let i = 1; i < newAnalysis.length; i++) {
      const diff = newAnalysis[i].score - newAnalysis[i-1].score;
      if (diff > 0.5) newAnalysis[i].trend = 'up';
      else if (diff < -0.5) newAnalysis[i].trend = 'down';
    }

    setAnalysis(newAnalysis);
  }, [records]);

  // Generate recommendations
  useEffect(() => {
    const latestRecord = records[0];
    if (!latestRecord) return;

    const score = calculateSleepScore(latestRecord);
    const recs: Recommendation[] = [];

    // Based on sleep quality
    if (latestRecord.sleepQuality === '差') {
      recs.push({
        id: '1',
        category: 'schedule',
        title: '调整作息时间',
        content: '建议您提前30分钟入睡，并保持固定的睡眠时间',
        priority: 1,
        icon: '⏰'
      });
    }

    // Based on duration
    if (latestRecord.duration < 420) { // Less than 7 hours
      recs.push({
        id: '2',
        category: 'schedule',
        title: '延长睡眠时间',
        content: '您的睡眠时间不足7小时，建议早点睡觉',
        priority: 1,
        icon: '😴'
      });
    } else if (latestRecord.duration > 540) { // More than 9 hours
      recs.push({
        id: '3',
        category: 'schedule',
        title: '优化睡眠时间',
        content: '睡眠时间超过9小时，可能影响睡眠质量，建议控制在7-8小时',
        priority: 2,
        icon: '⏰'
      });
    }

    // Based on notes
    if (latestRecord.notes?.includes('累') || latestRecord.notes?.includes('困')) {
      recs.push({
        id: '4',
        category: 'environment',
        title: '改善睡眠环境',
        content: '卧室温度保持在18-22℃，保持安静和黑暗',
        priority: 1,
        icon: '🌡️'
      });
    }

    // General tips
    recs.push({
      id: '5',
      category: 'diet',
      title: '饮食建议',
      content: '睡前3小时避免大量进食，晚餐不要过于油腻',
      priority: 3,
      icon: '🥗'
    });

    recs.push({
      id: '6',
      category: 'exercise',
      title: '运动建议',
      content: '每天运动30分钟，但避免睡前2小时剧烈运动',
      priority: 3,
      icon: '🏃'
    });

    setRecommendations(recs);
  }, [records]);

  // Mock login
  const handleLogin = async () => {
    setIsLoggedIn(true);
    setUser({ id: 1, email, username });
  };

  // Handle sleep record submission
  const handleSleepRecord = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!sleepTime || !wakeTime) {
      alert('请填写完整信息');
      return;
    }

    const duration = Math.floor((new Date(wakeTime).getTime() - new Date(sleepTime).getTime()) / 1000 / 60);

    const newRecord: SleepRecord = {
      id: records.length + 1,
      userId: user?.id || 1,
      sleepTime,
      wakeTime,
      sleepQuality,
      duration,
      notes,
      createdAt: new Date().toISOString()
    };

    setRecords([newRecord, ...records]);
    setSleepTime("");
    setWakeTime("");
    setSleepQuality("好");
    setNotes("");
  };

  // Calculate statistics
  const avgScore = analysis.length > 0
    ? (analysis.reduce((sum, a) => sum + a.score, 0) / analysis.length).toFixed(1)
    : 0;

  const avgDuration = records.length > 0
    ? Math.round(records.reduce((sum, r) => sum + r.duration, 0) / records.length)
    : 0;

  const currentStreak = records.length;

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-white to-purple-50">
      {/* Header */}
      <div className="bg-gradient-to-r from-indigo-600 to-purple-600 text-white">
        <div className="max-w-7xl mx-auto px-4 py-8">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold mb-2">🌙 智能睡眠助手</h1>
              <p className="text-indigo-100">科学记录 • 智能分析 • 改善睡眠</p>
            </div>
            {isLoggedIn && (
              <div className="text-right">
                <p className="text-sm text-indigo-100">欢迎回来</p>
                <p className="text-lg font-semibold">{user?.username || user?.email}</p>
              </div>
            )}
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-8">
        {!isLoggedIn ? (
          // Login Form
          <div className="max-w-md mx-auto mt-20">
            <div className="bg-white rounded-2xl shadow-xl p-8">
              <h2 className="text-2xl font-bold text-center mb-6">欢迎使用智能睡眠助手</h2>
              <form onSubmit={handleLogin} className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">邮箱</label>
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                    placeholder="请输入邮箱"
                    required
                  />
                </div>
                {isRegistering && (
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">用户名</label>
                    <input
                      type="text"
                      value={username}
                      onChange={(e) => setUsername(e.target.value)}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                      placeholder="请输入用户名"
                    />
                  </div>
                )}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">密码</label>
                  <input
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                    placeholder="请输入密码"
                    required
                  />
                </div>
                <button
                  type="submit"
                  className="w-full bg-gradient-to-r from-indigo-600 to-purple-600 text-white py-3 rounded-lg font-semibold hover:from-indigo-700 hover:to-purple-700 transition-all"
                >
                  {isRegistering ? '注册' : '登录'}
                </button>
              </form>
              <p className="text-center mt-4 text-sm text-gray-600">
                {isRegistering ? '已有账号？' : '还没有账号？'}
                <button
                  onClick={() => setIsRegistering(!isRegistering)}
                  className="text-indigo-600 hover:text-indigo-700 font-semibold ml-1"
                >
                  {isRegistering ? '立即登录' : '立即注册'}
                </button>
              </p>
            </div>
          </div>
        ) : (
          <div className="space-y-8">
            {/* Statistics Cards */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
              <div className="bg-white rounded-xl shadow-lg p-6 border-l-4 border-indigo-500">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-gray-600 mb-1">平均评分</p>
                    <p className="text-3xl font-bold text-gray-900">{avgScore}/10</p>
                  </div>
                  <div className="text-4xl">⭐</div>
                </div>
              </div>

              <div className="bg-white rounded-xl shadow-lg p-6 border-l-4 border-green-500">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-gray-600 mb-1">平均睡眠</p>
                    <p className="text-3xl font-bold text-gray-900">{Math.floor(avgDuration / 60)}h{avgDuration % 60}m</p>
                  </div>
                  <div className="text-4xl">😴</div>
                </div>
              </div>

              <div className="bg-white rounded-xl shadow-lg p-6 border-l-4 border-orange-500">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-gray-600 mb-1">连续记录</p>
                    <p className="text-3xl font-bold text-gray-900">{currentStreak}天</p>
                  </div>
                  <div className="text-4xl">🔥</div>
                </div>
              </div>

              <div className="bg-white rounded-xl shadow-lg p-6 border-l-4 border-purple-500">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-gray-600 mb-1">总记录数</p>
                    <p className="text-3xl font-bold text-gray-900">{records.length}</p>
                  </div>
                  <div className="text-4xl">📊</div>
                </div>
              </div>
            </div>

            {/* Sleep Record Form */}
            <div className="bg-white rounded-2xl shadow-xl p-8">
              <h2 className="text-2xl font-bold mb-6 flex items-center">
                <span className="mr-2">📝</span>
                记录今晚睡眠
              </h2>
              <form onSubmit={handleSleepRecord} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      入睡时间
                    </label>
                    <input
                      type="datetime-local"
                      value={sleepTime}
                      onChange={(e) => setSleepTime(e.target.value)}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      起床时间
                    </label>
                    <input
                      type="datetime-local"
                      value={wakeTime}
                      onChange={(e) => setWakeTime(e.target.value)}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                      required
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    睡眠质量
                  </label>
                  <select
                    value={sleepQuality}
                    onChange={(e) => setSleepQuality(e.target.value)}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                  >
                    <option value="好">😊 好</option>
                    <option value="中">😐 中</option>
                    <option value="差">😴 差</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    备注 (可选)
                  </label>
                  <textarea
                    value={notes}
                    onChange={(e) => setNotes(e.target.value)}
                    rows={3}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                    placeholder="记录任何想备注的内容..."
                  />
                </div>

                <button
                  type="submit"
                  className="w-full bg-gradient-to-r from-indigo-600 to-purple-600 text-white py-3 rounded-lg font-semibold hover:from-indigo-700 hover:to-purple-700 transition-all"
                >
                  保存记录
                </button>
              </form>
            </div>

            {/* Sleep Analysis Chart */}
            {analysis.length > 0 && (
              <div className="bg-white rounded-2xl shadow-xl p-8">
                <h2 className="text-2xl font-bold mb-6 flex items-center">
                  <span className="mr-2">📈</span>
                  睡眠趋势分析
                </h2>
                <div className="overflow-x-auto">
                  <div className="flex items-end space-x-4 h-64 pb-4">
                    {analysis.map((a, index) => (
                      <div key={index} className="flex-1 flex flex-col items-center">
                        <div
                          className="w-full bg-gradient-to-t from-indigo-500 to-purple-500 rounded-t-lg transition-all hover:from-indigo-600 hover:to-purple-600"
                          style={{
                            height: `${(a.score / 10) * 200}px`,
                            minHeight: '20px'
                          }}
                          title={`评分: ${a.score}/10`}
                        />
                        <p className="text-xs text-gray-600 mt-2">
                          {new Date(a.date).toLocaleDateString('zh-CN', { month: 'short', day: 'numeric' })}
                        </p>
                        <p className="text-sm font-semibold mt-1">{a.score}</p>
                      </div>
                    ))}
                  </div>
                </div>
                <div className="mt-4 flex items-center justify-center space-x-6 text-sm text-gray-600">
                  <div className="flex items-center">
                    <div className="w-3 h-3 bg-indigo-500 rounded mr-2"></div>
                    <span>睡眠评分 (1-10分)</span>
                  </div>
                </div>
              </div>
            )}

            {/* Recommendations */}
            <div className="bg-white rounded-2xl shadow-xl p-8">
              <h2 className="text-2xl font-bold mb-6 flex items-center">
                <span className="mr-2">💡</span>
                智能改善建议
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {recommendations.map((rec) => (
                  <div
                    key={rec.id}
                    className="border border-gray-200 rounded-lg p-4 hover:border-indigo-500 transition-all hover:shadow-md"
                  >
                    <div className="flex items-start space-x-3">
                      <div className="text-2xl">{rec.icon}</div>
                      <div className="flex-1">
                        <h3 className="font-semibold text-gray-900 mb-1">{rec.title}</h3>
                        <p className="text-sm text-gray-600">{rec.content}</p>
                        <span className={`inline-block mt-2 text-xs px-2 py-1 rounded-full ${
                          rec.category === 'schedule' ? 'bg-blue-100 text-blue-700' :
                          rec.category === 'environment' ? 'bg-green-100 text-green-700' :
                          rec.category === 'diet' ? 'bg-orange-100 text-orange-700' :
                          'bg-purple-100 text-purple-700'
                        }`}>
                          {rec.category === 'schedule' ? '作息的调整' :
                           rec.category === 'environment' ? '环境优化' :
                           rec.category === 'diet' ? '饮食建议' : '运动建议'}
                        </span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Achievements */}
            <div className="bg-white rounded-2xl shadow-xl p-8">
              <h2 className="text-2xl font-bold mb-6 flex items-center">
                <span className="mr-2">🏆</span>
                成就徽章
              </h2>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {achievements.map((achievement) => (
                  <div
                    key={achievement.id}
                    className={`border-2 rounded-xl p-6 text-center transition-all ${
                      achievement.earned
                        ? 'border-yellow-400 bg-yellow-50 hover:shadow-lg'
                        : 'border-gray-200 bg-gray-50 opacity-60'
                    }`}
                  >
                    <div className="text-4xl mb-2">{achievement.icon}</div>
                    <h3 className="font-semibold text-gray-900 mb-1">{achievement.title}</h3>
                    <p className="text-xs text-gray-600 mb-2">{achievement.description}</p>
                    {achievement.earned && achievement.earnedAt && (
                      <p className="text-xs text-green-600 font-medium">
                        ✓ 已获得 ({achievement.earnedAt})
                      </p>
                    )}
                    {!achievement.earned && (
                      <p className="text-xs text-gray-500">未获得</p>
                    )}
                  </div>
                ))}
              </div>
            </div>

            {/* Sleep Records History */}
            <div className="bg-white rounded-2xl shadow-xl p-8">
              <h2 className="text-2xl font-bold mb-6 flex items-center">
                <span className="mr-2">📚</span>
                历史记录
              </h2>
              <div className="space-y-4">
                {records.map((record) => {
                  const score = calculateSleepScore(record);
                  return (
                    <div
                      key={record.id}
                      className="border border-gray-200 rounded-lg p-4 hover:border-indigo-500 transition-all hover:shadow-md"
                    >
                      <div className="flex items-center justify-between mb-2">
                        <div className="flex items-center space-x-3">
                          <span className="text-2xl">
                            {record.sleepQuality === '好' ? '😊' :
                             record.sleepQuality === '中' ? '😐' : '😴'}
                          </span>
                          <div>
                            <p className="font-semibold text-gray-900">
                              {new Date(record.sleepTime).toLocaleString('zh-CN', {
                                month: 'long',
                                day: 'numeric',
                                hour: '2-digit',
                                minute: '2-digit'
                              })} → {new Date(record.wakeTime).toLocaleString('zh-CN', {
                                month: 'long',
                                day: 'numeric',
                                hour: '2-digit',
                                minute: '2-digit'
                              })}
                            </p>
                            <p className="text-sm text-gray-600">
                              时长: {Math.floor(record.duration / 60)}小时{record.duration % 60}分钟
                            </p>
                          </div>
                        </div>
                        <div className="text-right">
                          <div className="text-2xl font-bold text-indigo-600">{score}/10</div>
                          <p className="text-xs text-gray-500">评分</p>
                        </div>
                      </div>
                      {record.notes && (
                        <p className="text-sm text-gray-700 mt-2 bg-gray-50 rounded p-2">
                          {record.notes}
                        </p>
                      )}
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Logout Button */}
            <div className="text-center">
              <button
                onClick={() => {
                  setIsLoggedIn(false);
                  setUser(null);
                }}
                className="text-gray-600 hover:text-gray-800 text-sm font-medium"
              >
                退出登录
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
