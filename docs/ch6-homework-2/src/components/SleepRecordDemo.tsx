"use client";

import { useState } from "react";
import { authClient } from "@/lib/auth/client";

interface SleepRecord {
  id: number;
  userId: number;
  sleepTime: string;
  wakeTime: string;
  sleepQuality: string;
  duration: number;
  notes?: string;
}

export default function SleepRecordDemo() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [user, setUser] = useState<any>(null);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [username, setUsername] = useState("");
  const [isRegistering, setIsRegistering] = useState(false);
  const [message, setMessage] = useState("");

  // Sleep record form
  const [sleepTime, setSleepTime] = useState("");
  const [wakeTime, setWakeTime] = useState("");
  const [sleepQuality, setSleepQuality] = useState("好");
  const [notes, setNotes] = useState("");
  const [records, setRecords] = useState<SleepRecord[]>([]);

  const handleLogin = async () => {
    try {
      const response = await fetch("/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      const data = await response.json();

      if (data.success) {
        setIsLoggedIn(true);
        setUser(data.user);
        setMessage("登录成功！");
        await loadRecords(data.user.id);
      } else {
        setMessage(data.error || "登录失败");
      }
    } catch (error: any) {
      setMessage(`登录失败: ${error.message}`);
    }
  };

  const handleRegister = async () => {
    try {
      const response = await fetch("/api/auth/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, username, password }),
      });

      const data = await response.json();

      if (data.success) {
        setMessage("注册成功！请登录。");
        setIsRegistering(false);
      } else {
        setMessage(data.error || "注册失败");
      }
    } catch (error: any) {
      setMessage(`注册失败: ${error.message}`);
    }
  };

  const handleLogout = async () => {
    setIsLoggedIn(false);
    setUser(null);
    setRecords([]);
    setMessage("");
  };

  const loadRecords = async (userId: number) => {
    try {
      const response = await fetch(`/api/sleep/record?userId=${userId}`);
      const data = await response.json();

      if (data.success) {
        setRecords(data.records);
      }
    } catch (error) {
      console.error("Failed to load records:", error);
    }
  };

  const handleRecordSleep = async () => {
    if (!user) return;

    // 验证表单
    if (!sleepTime || !wakeTime) {
      setMessage("请填写入睡时间和起床时间");
      return;
    }

    // 验证时间格式
    const sleepDate = new Date(sleepTime);
    const wakeDate = new Date(wakeTime);

    if (isNaN(sleepDate.getTime()) || isNaN(wakeDate.getTime())) {
      setMessage("时间格式不正确，请重新选择");
      return;
    }

    // 验证起床时间在入睡时间之后
    if (wakeDate <= sleepDate) {
      setMessage("起床时间必须晚于入睡时间");
      return;
    }

    try {
      const response = await fetch("/api/sleep/record", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          userId: user.id,
          sleepTime,
          wakeTime,
          sleepQuality,
          notes,
        }),
      });

      const data = await response.json();

      if (data.success) {
        setMessage("睡眠记录添加成功！");
        setSleepTime("");
        setWakeTime("");
        setNotes("");
        await loadRecords(user.id);
      } else {
        setMessage(data.error || "添加失败，请检查输入信息");
      }
    } catch (error) {
      setMessage("添加失败，请重试");
    }
  };

  return (
    <section className="py-24 px-6 bg-white/50">
      <div className="max-w-4xl mx-auto">
        <h2 className="text-4xl font-bold text-center mb-4 bg-gradient-to-r from-teal-600 to-purple-600 bg-clip-text text-transparent">
          数据库对接演示
        </h2>
        <p className="text-center text-gray-600 mb-12">
          基于 Neon 数据库 + Drizzle ORM 的真实数据交互
        </p>

        {!isLoggedIn ? (
          <div className="bg-white rounded-2xl shadow-xl p-8 border border-gray-200">
            <h3 className="text-2xl font-semibold mb-6 text-center">
              {isRegistering ? "注册" : "登录"}睡眠监测账户
            </h3>

            {isRegistering && (
              <input
                type="text"
                placeholder="用户名"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                className="w-full px-4 py-3 mb-4 border border-gray-300 rounded-lg focus:outline-none focus:border-teal-500"
              />
            )}

            <input
              type="email"
              placeholder="邮箱"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-4 py-3 mb-4 border border-gray-300 rounded-lg focus:outline-none focus:border-teal-500"
            />

            <input
              type="password"
              placeholder="密码"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-4 py-3 mb-6 border border-gray-300 rounded-lg focus:outline-none focus:border-teal-500"
            />

            <div className="flex gap-4">
              <button
                onClick={isRegistering ? handleRegister : handleLogin}
                className="flex-1 bg-gradient-to-r from-teal-500 to-purple-500 text-white py-3 rounded-lg font-semibold hover:opacity-90 transition-opacity"
              >
                {isRegistering ? "注册" : "登录"}
              </button>
              <button
                onClick={() => {
                  setIsRegistering(!isRegistering);
                  setMessage("");
                }}
                className="px-6 py-3 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
              >
                {isRegistering ? "已有账户？登录" : "没有账户？注册"}
              </button>
            </div>
          </div>
        ) : (
          <div className="space-y-8">
            <div className="bg-white rounded-2xl shadow-xl p-8 border border-gray-200">
              <div className="flex justify-between items-center mb-6">
                <h3 className="text-2xl font-semibold">
                  欢迎，{user?.name || user?.email}
                </h3>
                <button
                  onClick={handleLogout}
                  className="px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-colors"
                >
                  退出登录
                </button>
              </div>

              <h4 className="text-xl font-semibold mb-4">记录睡眠数据</h4>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium mb-2">入睡时间</label>
                  <input
                    type="datetime-local"
                    value={sleepTime}
                    onChange={(e) => setSleepTime(e.target.value)}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:border-teal-500"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium mb-2">起床时间</label>
                  <input
                    type="datetime-local"
                    value={wakeTime}
                    onChange={(e) => setWakeTime(e.target.value)}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:border-teal-500"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium mb-2">睡眠质量</label>
                  <select
                    value={sleepQuality}
                    onChange={(e) => setSleepQuality(e.target.value)}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:border-teal-500"
                  >
                    <option value="好">好</option>
                    <option value="中">中</option>
                    <option value="差">差</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium mb-2">备注（可选）</label>
                  <textarea
                    value={notes}
                    onChange={(e) => setNotes(e.target.value)}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:border-teal-500"
                    rows={3}
                  />
                </div>

                <button
                  onClick={handleRecordSleep}
                  className="w-full bg-gradient-to-r from-teal-500 to-purple-500 text-white py-3 rounded-lg font-semibold hover:opacity-90 transition-opacity"
                >
                  保存睡眠记录
                </button>
              </div>
            </div>

            {records.length > 0 && (
              <div className="bg-white rounded-2xl shadow-xl p-8 border border-gray-200">
                <h4 className="text-xl font-semibold mb-6">我的睡眠记录</h4>
                <div className="space-y-4">
                  {records.map((record) => (
                    <div key={record.id} className="p-4 border border-gray-200 rounded-lg">
                      <div className="flex justify-between items-start">
                        <div>
                          <p className="font-medium">
                            {new Date(record.sleepTime).toLocaleString()} - {new Date(record.wakeTime).toLocaleString()}
                          </p>
                          <p className="text-sm text-gray-600">
                            睡眠质量: {record.sleepQuality} | 时长: {Math.floor(record.duration / 60)}小时{record.duration % 60}分钟
                          </p>
                          {record.notes && <p className="text-sm text-gray-500 mt-1">{record.notes}</p>}
                        </div>
                        <span className="text-xs text-gray-400">
                          {new Date(record.createdAt).toLocaleDateString()}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        )}

        {message && (
          <div className="mt-4 p-4 bg-blue-50 border border-blue-200 rounded-lg text-center">
            {message}
          </div>
        )}
      </div>
    </section>
  );
}
