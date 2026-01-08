'use client';

import { useState, useEffect } from 'react';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';

interface UserSettings {
  username: string;
  email: string;
  targetSleepDuration: number; // 目标睡眠时长（分钟）
  targetSleepQuality: number; // 目标睡眠质量
  notificationsEnabled: boolean;
  darkMode: boolean;
}

export default function SettingsPage() {
  const { data: session, update } = useSession();
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [saving, setSaving] = useState(false);
  const [activeTab, setActiveTab] = useState('profile');

  const [settings, setSettings] = useState<UserSettings>({
    username: session?.user?.username || '',
    email: session?.user?.email || '',
    targetSleepDuration: 8 * 60, // 默认8小时
    targetSleepQuality: 8, // 默认8分
    notificationsEnabled: true,
    darkMode: false,
  });

  useEffect(() => {
    if (session?.user) {
      setSettings(prev => ({
        ...prev,
        username: session.user.username || '',
        email: session.user.email || '',
      }));
    }
  }, [session]);

  const handleSave = async () => {
    setSaving(true);
    try {
      // TODO: 实际保存到数据库
      await new Promise(resolve => setTimeout(resolve, 1000));
      alert('设置已保存！');
    } catch (error) {
      alert('保存失败，请重试');
    } finally {
      setSaving(false);
    }
  };

  const handlePasswordChange = async (currentPassword: string, newPassword: string) => {
    if (!newPassword || newPassword.length < 6) {
      alert('新密码至少需要6位字符');
      return;
    }

    setSaving(true);
    try {
      // TODO: 实际调用密码修改API
      await new Promise(resolve => setTimeout(resolve, 1000));
      alert('密码修改成功！');
    } catch (error) {
      alert('密码修改失败');
    } finally {
      setSaving(false);
    }
  };

  const handleDeleteAccount = async () => {
    if (!confirm('确定要删除账户吗？此操作不可恢复！')) return;

    const confirmText = prompt('请输入"DELETE"确认删除账户：');
    if (confirmText !== 'DELETE') {
      alert('删除已取消');
      return;
    }

    setLoading(true);
    try {
      // TODO: 实际调用账户删除API
      await new Promise(resolve => setTimeout(resolve, 1000));
      alert('账户已删除');
      router.push('/');
    } catch (error) {
      alert('账户删除失败');
    } finally {
      setLoading(false);
    }
  };

  const exportAllData = async () => {
    const userId = session?.user?.id;
    if (!userId) return;

    try {
      // 下载所有数据
      const response = await fetch(`/api/sleep/export?userId=${userId}&format=json`);
      const data = await response.json();

      const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' });
      const url = URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = url;
      link.download = `sleep_data_full_${new Date().toISOString().split('T')[0]}.json`;
      link.click();
      URL.revokeObjectURL(url);

      alert('数据导出成功！');
    } catch (error) {
      alert('数据导出失败');
    }
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
        <h1>⚙️ 用户设置</h1>
        <button
          onClick={() => router.push('/')}
          style={{
            padding: '8px 16px',
            background: 'rgba(255,255,255,0.2)',
            color: 'white',
            border: '2px solid white',
            borderRadius: '8px',
            cursor: 'pointer',
            fontWeight: 'bold',
          }}
        >
          返回首页
        </button>
      </div>

      {/* Tabs */}
      <div style={{
        display: 'flex',
        gap: '10px',
        marginBottom: '30px',
        borderBottom: '2px solid #e0e0e0',
      }}>
        {[
          { id: 'profile', label: '个人资料', icon: '👤' },
          { id: 'sleep', label: '睡眠目标', icon: '🎯' },
          { id: 'preferences', label: '偏好设置', icon: '🔔' },
          { id: 'account', label: '账户管理', icon: '🔐' },
        ].map(tab => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            style={{
              padding: '12px 24px',
              background: activeTab === tab.id ? '#667eea' : 'transparent',
              color: activeTab === tab.id ? 'white' : '#667eea',
              border: 'none',
              borderBottom: activeTab === tab.id ? 'none' : '2px solid transparent',
              borderRadius: '8px 8px 0 0',
              cursor: 'pointer',
              fontWeight: 'bold',
              transition: 'all 0.3s',
            }}
          >
            <span style={{ marginRight: '8px' }}>{tab.icon}</span>
            {tab.label}
          </button>
        ))}
      </div>

      {/* Content */}
      <div style={{
        background: 'white',
        padding: '30px',
        borderRadius: '15px',
        boxShadow: '0 4px 6px rgba(0,0,0,0.1)',
      }}>
        {/* Profile Tab */}
        {activeTab === 'profile' && (
          <div>
            <h2 style={{ marginBottom: '20px' }}>个人资料</h2>
            <div style={{ display: 'grid', gap: '20px', maxWidth: '600px' }}>
              <div>
                <label style={{ display: 'block', marginBottom: '8px', fontWeight: 'bold' }}>
                  用户名
                </label>
                <input
                  type="text"
                  value={settings.username}
                  onChange={(e) => setSettings({ ...settings, username: e.target.value })}
                  style={{
                    width: '100%',
                    padding: '12px',
                    border: '2px solid #ddd',
                    borderRadius: '8px',
                  }}
                />
              </div>
              <div>
                <label style={{ display: 'block', marginBottom: '8px', fontWeight: 'bold' }}>
                  邮箱
                </label>
                <input
                  type="email"
                  value={settings.email}
                  onChange={(e) => setSettings({ ...settings, email: e.target.value })}
                  style={{
                    width: '100%',
                    padding: '12px',
                    border: '2px solid #ddd',
                    borderRadius: '8px',
                  }}
                />
              </div>
            </div>
          </div>
        )}

        {/* Sleep Goals Tab */}
        {activeTab === 'sleep' && (
          <div>
            <h2 style={{ marginBottom: '20px' }}>睡眠目标设置</h2>
            <div style={{ display: 'grid', gap: '30px', maxWidth: '600px' }}>
              <div>
                <label style={{ display: 'block', marginBottom: '8px', fontWeight: 'bold' }}>
                  目标睡眠时长：{Math.floor(settings.targetSleepDuration / 60)}小时{settings.targetSleepDuration % 60}分钟
                </label>
                <input
                  type="range"
                  min="360"
                  max="720"
                  step="30"
                  value={settings.targetSleepDuration}
                  onChange={(e) => setSettings({ ...settings, targetSleepDuration: parseInt(e.target.value) })}
                  style={{ width: '100%' }}
                />
                <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '12px', color: '#666', marginTop: '5px' }}>
                  <span>6小时</span>
                  <span>12小时</span>
                </div>
              </div>

              <div>
                <label style={{ display: 'block', marginBottom: '8px', fontWeight: 'bold' }}>
                  目标睡眠质量：{settings.targetSleepQuality}分
                </label>
                <input
                  type="range"
                  min="1"
                  max="10"
                  value={settings.targetSleepQuality}
                  onChange={(e) => setSettings({ ...settings, targetSleepQuality: parseInt(e.target.value) })}
                  style={{ width: '100%' }}
                />
                <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '12px', color: '#666', marginTop: '5px' }}>
                  <span>1分（差）</span>
                  <span>10分（优秀）</span>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Preferences Tab */}
        {activeTab === 'preferences' && (
          <div>
            <h2 style={{ marginBottom: '20px' }}>偏好设置</h2>
            <div style={{ display: 'grid', gap: '20px', maxWidth: '600px' }}>
              <div style={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                padding: '15px',
                border: '2px solid #e0e0e0',
                borderRadius: '10px',
              }}>
                <div>
                  <div style={{ fontWeight: 'bold' }}>🔔 睡眠提醒通知</div>
                  <div style={{ fontSize: '14px', color: '#666' }}>开启后会在设定时间收到睡眠提醒</div>
                </div>
                <label style={{ position: 'relative', display: 'inline-block', width: '60px', height: '34px' }}>
                  <input
                    type="checkbox"
                    checked={settings.notificationsEnabled}
                    onChange={(e) => setSettings({ ...settings, notificationsEnabled: e.target.checked })}
                    style={{ opacity: 0, width: 0, height: 0 }}
                  />
                  <span style={{
                    position: 'absolute',
                    cursor: 'pointer',
                    top: 0,
                    left: 0,
                    right: 0,
                    bottom: 0,
                    backgroundColor: settings.notificationsEnabled ? '#667eea' : '#ccc',
                    borderRadius: '34px',
                    transition: 'all 0.3s',
                  }} />
                  <span style={{
                    position: 'absolute',
                    content: '""',
                    height: '26px',
                    width: '26px',
                    left: settings.notificationsEnabled ? '32px' : '4px',
                    bottom: '4px',
                    backgroundColor: 'white',
                    borderRadius: '50%',
                    transition: 'all 0.3s',
                  }} />
                </label>
              </div>

              <div style={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                padding: '15px',
                border: '2px solid #e0e0e0',
                borderRadius: '10px',
              }}>
                <div>
                  <div style={{ fontWeight: 'bold' }}>🌙 深色模式</div>
                  <div style={{ fontSize: '14px', color: '#666' }}>开启后将使用深色主题</div>
                </div>
                <label style={{ position: 'relative', display: 'inline-block', width: '60px', height: '34px' }}>
                  <input
                    type="checkbox"
                    checked={settings.darkMode}
                    onChange={(e) => setSettings({ ...settings, darkMode: e.target.checked })}
                    style={{ opacity: 0, width: 0, height: 0 }}
                  />
                  <span style={{
                    position: 'absolute',
                    cursor: 'pointer',
                    top: 0,
                    left: 0,
                    right: 0,
                    bottom: 0,
                    backgroundColor: settings.darkMode ? '#667eea' : '#ccc',
                    borderRadius: '34px',
                    transition: 'all 0.3s',
                  }} />
                  <span style={{
                    position: 'absolute',
                    content: '""',
                    height: '26px',
                    width: '26px',
                    left: settings.darkMode ? '32px' : '4px',
                    bottom: '4px',
                    backgroundColor: 'white',
                    borderRadius: '50%',
                    transition: 'all 0.3s',
                  }} />
                </label>
              </div>
            </div>
          </div>
        )}

        {/* Account Tab */}
        {activeTab === 'account' && (
          <div>
            <h2 style={{ marginBottom: '20px' }}>账户管理</h2>
            <div style={{ display: 'grid', gap: '20px', maxWidth: '600px' }}>
              <div style={{
                padding: '20px',
                background: '#f8f9fa',
                borderRadius: '10px',
                border: '2px solid #667eea',
              }}>
                <h3 style={{ marginBottom: '15px' }}>📥 导出我的数据</h3>
                <p style={{ color: '#666', marginBottom: '15px' }}>
                  下载您的所有睡眠数据（包括记录、分析和建议）
                </p>
                <button
                  onClick={exportAllData}
                  style={{
                    padding: '10px 20px',
                    background: '#667eea',
                    color: 'white',
                    border: 'none',
                    borderRadius: '8px',
                    cursor: 'pointer',
                    fontWeight: 'bold',
                  }}
                >
                  导出所有数据
                </button>
              </div>

              <div style={{
                padding: '20px',
                background: '#fff3cd',
                borderRadius: '10px',
                border: '2px solid #ffc107',
              }}>
                <h3 style={{ marginBottom: '15px' }}>🔑 修改密码</h3>
                <PasswordChangeForm onChangePassword={handlePasswordChange} saving={saving} />
              </div>

              <div style={{
                padding: '20px',
                background: '#f8d7da',
                borderRadius: '10px',
                border: '2px solid #dc3545',
              }}>
                <h3 style={{ marginBottom: '15px', color: '#dc3545' }}>⚠️ 危险操作</h3>
                <p style={{ color: '#666', marginBottom: '15px' }}>
                  删除您的账户和所有相关数据。此操作不可恢复！
                </p>
                <button
                  onClick={handleDeleteAccount}
                  disabled={loading}
                  style={{
                    padding: '10px 20px',
                    background: '#dc3545',
                    color: 'white',
                    border: 'none',
                    borderRadius: '8px',
                    cursor: loading ? 'not-allowed' : 'pointer',
                    fontWeight: 'bold',
                  }}
                >
                  {loading ? '删除中...' : '删除账户'}
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Save Button */}
        <div style={{
          display: 'flex',
          justifyContent: 'flex-end',
          gap: '10px',
          marginTop: '30px',
          paddingTop: '20px',
          borderTop: '2px solid #e0e0e0',
        }}>
          <button
            onClick={() => router.push('/')}
            style={{
              padding: '12px 24px',
              background: '#f8f9fa',
              color: '#667eea',
              border: '2px solid #667eea',
              borderRadius: '8px',
              cursor: 'pointer',
              fontWeight: 'bold',
            }}
          >
            取消
          </button>
          <button
            onClick={handleSave}
            disabled={saving}
            style={{
              padding: '12px 24px',
              background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
              color: 'white',
              border: 'none',
              borderRadius: '8px',
              cursor: saving ? 'not-allowed' : 'pointer',
              fontWeight: 'bold',
            }}
          >
            {saving ? '保存中...' : '保存设置'}
          </button>
        </div>
      </div>
    </div>
  );
}

// Password Change Component
function PasswordChangeForm({ onChangePassword, saving }: { onChangePassword: (current: string, newPass: string) => void, saving: boolean }) {
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (newPassword !== confirmPassword) {
      alert('新密码与确认密码不匹配');
      return;
    }
    onChangePassword(currentPassword, newPassword);
    setCurrentPassword('');
    setNewPassword('');
    setConfirmPassword('');
  };

  return (
    <form onSubmit={handleSubmit}>
      <div style={{ display: 'grid', gap: '15px' }}>
        <input
          type="password"
          placeholder="当前密码"
          value={currentPassword}
          onChange={(e) => setCurrentPassword(e.target.value)}
          required
          style={{
            width: '100%',
            padding: '12px',
            border: '2px solid #ddd',
            borderRadius: '8px',
          }}
        />
        <input
          type="password"
          placeholder="新密码"
          value={newPassword}
          onChange={(e) => setNewPassword(e.target.value)}
          required
          style={{
            width: '100%',
            padding: '12px',
            border: '2px solid #ddd',
            borderRadius: '8px',
          }}
        />
        <input
          type="password"
          placeholder="确认新密码"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
          required
          style={{
            width: '100%',
            padding: '12px',
            border: '2px solid #ddd',
            borderRadius: '8px',
          }}
        />
        <button
          type="submit"
          disabled={saving}
          style={{
            padding: '10px 20px',
            background: '#ffc107',
            color: 'white',
            border: 'none',
            borderRadius: '8px',
            cursor: saving ? 'not-allowed' : 'pointer',
            fontWeight: 'bold',
          }}
        >
          {saving ? '修改中...' : '修改密码'}
        </button>
      </div>
    </form>
  );
}
