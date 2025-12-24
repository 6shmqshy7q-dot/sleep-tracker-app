"use client";

import { useTheme } from "next-themes";
import { useEffect, useState } from "react";

export default function Home() {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  return (
    <div className="min-h-screen bg-gradient-to-b from-teal-50 via-purple-50/30 to-sky-50/40 text-gray-700">
      {/* 主题切换 */}
      <div className="fixed top-6 right-6 z-50">
        <button
          onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
          className="p-3 rounded-full bg-gradient-to-r from-teal-500 to-purple-500 text-white shadow-lg hover:from-teal-600 hover:to-purple-600 transition-all duration-300"
        >
          {theme === "dark" ? "☀️" : "🌙"}
        </button>
      </div>

      {/* 导航栏 */}
      <nav className="fixed top-0 left-0 right-0 z-40 bg-white/80 backdrop-blur-md border-b border-teal-100/50">
        <div className="max-w-7xl mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-gradient-to-r from-teal-500 to-purple-500 rounded-lg flex items-center justify-center">
                <span className="text-white font-bold">睡</span>
              </div>
              <span className="text-xl font-bold bg-gradient-to-r from-teal-600 to-purple-600 bg-clip-text text-transparent">
                智能睡眠监测器
              </span>
            </div>
            <div className="hidden md:flex items-center space-x-8">
              <a href="#features" className="text-gray-600 hover:text-teal-600 transition-colors">核心功能</a>
              <a href="#report" className="text-gray-600 hover:text-teal-600 transition-colors">睡眠报告</a>
              <a href="#suggestions" className="text-gray-600 hover:text-teal-600 transition-colors">改善建议</a>
              <a href="#pricing" className="text-gray-600 hover:text-teal-600 transition-colors">订阅方案</a>
            </div>
          </div>
        </div>
      </nav>

      {/* 英雄区域 */}
      <section className="pt-32 pb-20 px-6">
        <div className="max-w-7xl mx-auto text-center">
          <div className="inline-block mb-6 px-4 py-1 bg-teal-100 rounded-full">
            <span className="text-teal-600 font-medium text-sm">专业睡眠健康平台</span>
          </div>
          <h1 className="text-5xl md:text-7xl font-bold mb-6 bg-gradient-to-r from-teal-600 via-purple-600 to-sky-600 bg-clip-text text-transparent">
            智能睡眠监测器
          </h1>
          <p className="text-xl text-gray-600 mb-4 max-w-3xl mx-auto leading-relaxed">
            基于AI算法的专业睡眠监测系统，科学分析睡眠数据，提供个性化改善建议，
            助您拥有更健康、更优质的睡眠体验
          </p>
          <div className="flex items-center justify-center space-x-8 mt-12 text-sm text-gray-500">
            <div className="flex items-center space-x-2">
              <div className="w-2 h-2 bg-teal-500 rounded-full animate-pulse"></div>
              <span>数据精度 95%+</span>
            </div>
            <div className="flex items-center space-x-2">
              <div className="w-2 h-2 bg-purple-500 rounded-full animate-pulse"></div>
              <span>全天候监测</span>
            </div>
            <div className="flex items-center space-x-2">
              <div className="w-2 h-2 bg-sky-500 rounded-full animate-pulse"></div>
              <span>100K+ 用户信赖</span>
            </div>
          </div>
        </div>
      </section>

      {/* 核心功能 */}
      <section id="features" className="py-20 px-6 bg-white/50">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold mb-6 bg-gradient-to-r from-teal-600 to-purple-600 bg-clip-text text-transparent">
              核心功能模块
            </h2>
            <p className="text-gray-600 text-lg max-w-3xl mx-auto">
              四大核心功能，全方位守护您的睡眠健康
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {/* 数据采集 */}
            <div className="bg-white rounded-2xl p-8 shadow-lg hover:shadow-xl transition-all duration-300 border border-teal-100/50 hover:border-teal-300/50">
              <div className="w-14 h-14 bg-gradient-to-r from-teal-500 to-sky-500 rounded-xl flex items-center justify-center mb-6">
                <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                </svg>
              </div>
              <h3 className="text-xl font-bold mb-4 text-gray-800">数据采集系统</h3>
              <p className="text-gray-600 mb-4 leading-relaxed">
                支持蓝牙智能手环/手表和手机传感器，自动采集睡眠数据，精度高达95%以上
              </p>
              <div className="flex flex-wrap gap-2">
                <span className="text-xs px-3 py-1 bg-teal-100 text-teal-600 rounded-full">蓝牙4.0+</span>
                <span className="text-xs px-3 py-1 bg-sky-100 text-sky-600 rounded-full">传感器融合</span>
                <span className="text-xs px-3 py-1 bg-purple-100 text-purple-600 rounded-full">实时采集</span>
              </div>
            </div>

            {/* 睡眠分析 */}
            <div className="bg-white rounded-2xl p-8 shadow-lg hover:shadow-xl transition-all duration-300 border border-purple-100/50 hover:border-purple-300/50">
              <div className="w-14 h-14 bg-gradient-to-r from-purple-500 to-pink-500 rounded-xl flex items-center justify-center mb-6">
                <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
                </svg>
              </div>
              <h3 className="text-xl font-bold mb-4 text-gray-800">睡眠分析引擎</h3>
              <p className="text-gray-600 mb-4 leading-relaxed">
                基于合作医疗机构睡眠健康模型，深度分析浅睡/深睡/REM周期，生成科学评分
              </p>
              <div className="flex flex-wrap gap-2">
                <span className="text-xs px-3 py-1 bg-purple-100 text-purple-600 rounded-full">AI算法</span>
                <span className="text-xs px-3 py-1 bg-pink-100 text-pink-600 rounded-full">医疗模型</span>
                <span className="text-xs px-3 py-1 bg-indigo-100 text-indigo-600 rounded-full">多维分析</span>
              </div>
            </div>

            {/* 个性化建议 */}
            <div className="bg-white rounded-2xl p-8 shadow-lg hover:shadow-xl transition-all duration-300 border border-sky-100/50 hover:border-sky-300/50">
              <div className="w-14 h-14 bg-gradient-to-r from-sky-500 to-blue-500 rounded-xl flex items-center justify-center mb-6">
                <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <h3 className="text-xl font-bold mb-4 text-gray-800">个性化建议系统</h3>
              <p className="text-gray-600 mb-4 leading-relaxed">
                根据睡眠数据生成个性化改善方案，涵盖作息调整、环境优化、饮食运动等
              </p>
              <div className="flex flex-wrap gap-2">
                <span className="text-xs px-3 py-1 bg-sky-100 text-sky-600 rounded-full">机器学习</span>
                <span className="text-xs px-3 py-1 bg-blue-100 text-blue-600 rounded-full">知识图谱</span>
                <span className="text-xs px-3 py-1 bg-cyan-100 text-cyan-600 rounded-full">智能推荐</span>
              </div>
            </div>

            {/* 订阅服务 */}
            <div className="bg-white rounded-2xl p-8 shadow-lg hover:shadow-xl transition-all duration-300 border border-emerald-100/50 hover:border-emerald-300/50">
              <div className="w-14 h-14 bg-gradient-to-r from-emerald-500 to-teal-500 rounded-xl flex items-center justify-center mb-6">
                <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <h3 className="text-xl font-bold mb-4 text-gray-800">订阅服务管理</h3>
              <p className="text-gray-600 mb-4 leading-relaxed">
                灵活的付费模式：免费版查看基础数据，付费版享受深度报告和个性化建议
              </p>
              <div className="flex flex-wrap gap-2">
                <span className="text-xs px-3 py-1 bg-emerald-100 text-emerald-600 rounded-full">支付集成</span>
                <span className="text-xs px-3 py-1 bg-teal-100 text-teal-600 rounded-full">权限管理</span>
                <span className="text-xs px-3 py-1 bg-green-100 text-green-600 rounded-full">自动续费</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 睡眠报告 */}
      <section id="report" className="py-20 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold mb-6 bg-gradient-to-r from-purple-600 to-sky-600 bg-clip-text text-transparent">
              睡眠报告展示
            </h2>
            <p className="text-gray-600 text-lg max-w-3xl mx-auto">
              真实睡眠数据，科学分析您的睡眠质量
            </p>
          </div>

          <div className="bg-white rounded-3xl shadow-xl p-8 md:p-12 border border-teal-100/50">
            <div className="flex items-center justify-between mb-8">
              <div>
                <h3 className="text-2xl font-bold text-gray-800 mb-2">2025-12-24 睡眠报告</h3>
                <span className="inline-block px-4 py-1 bg-gradient-to-r from-teal-500 to-purple-500 text-white rounded-full text-sm">
                  睡眠质量：优秀
                </span>
              </div>
              <div className="text-right">
                <div className="text-3xl font-bold bg-gradient-to-r from-teal-600 to-purple-600 bg-clip-text text-transparent">
                  92分
                </div>
                <div className="text-sm text-gray-500">综合评分</div>
              </div>
            </div>

            <div className="grid md:grid-cols-3 gap-8 mb-8">
              <div className="bg-gradient-to-br from-teal-50 to-sky-50 rounded-2xl p-6">
                <div className="text-sm text-gray-600 mb-2">睡眠时间</div>
                <div className="text-2xl font-bold text-gray-800 mb-1">23:30 - 07:15</div>
                <div className="text-sm text-teal-600">7小时45分钟</div>
              </div>
              <div className="bg-gradient-to-br from-purple-50 to-pink-50 rounded-2xl p-6">
                <div className="text-sm text-gray-600 mb-2">总时长</div>
                <div className="text-2xl font-bold text-gray-800 mb-1">7.8小时</div>
                <div className="text-sm text-purple-600">超出推荐0.3小时</div>
              </div>
              <div className="bg-gradient-to-br from-sky-50 to-blue-50 rounded-2xl p-6">
                <div className="text-sm text-gray-600 mb-2">深睡时长</div>
                <div className="text-2xl font-bold text-gray-800 mb-1">2.1小时</div>
                <div className="text-sm text-sky-600">占比 27%</div>
              </div>
            </div>

            <div className="space-y-4">
              <h4 className="text-lg font-semibold text-gray-800">睡眠周期分析</h4>
              <div className="space-y-3">
                <div className="flex items-center justify-between p-4 bg-gradient-to-r from-teal-50 to-transparent rounded-xl">
                  <div className="flex items-center space-x-3">
                    <div className="w-4 h-4 bg-teal-500 rounded-full"></div>
                    <span className="text-gray-700">浅睡期</span>
                  </div>
                  <div className="text-right">
                    <div className="text-sm font-medium text-gray-800">3.2小时</div>
                    <div className="text-xs text-gray-500">41%</div>
                  </div>
                </div>
                <div className="flex items-center justify-between p-4 bg-gradient-to-r from-purple-50 to-transparent rounded-xl">
                  <div className="flex items-center space-x-3">
                    <div className="w-4 h-4 bg-purple-500 rounded-full"></div>
                    <span className="text-gray-700">深睡期</span>
                  </div>
                  <div className="text-right">
                    <div className="text-sm font-medium text-gray-800">2.1小时</div>
                    <div className="text-xs text-gray-500">27%</div>
                  </div>
                </div>
                <div className="flex items-center justify-between p-4 bg-gradient-to-r from-sky-50 to-transparent rounded-xl">
                  <div className="flex items-center space-x-3">
                    <div className="w-4 h-4 bg-sky-500 rounded-full"></div>
                    <span className="text-gray-700">REM期</span>
                  </div>
                  <div className="text-right">
                    <div className="text-sm font-medium text-gray-800">2.5小时</div>
                    <div className="text-xs text-gray-500">32%</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 改善建议 */}
      <section id="suggestions" className="py-20 px-6 bg-white/50">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold mb-6 bg-gradient-to-r from-sky-600 to-purple-600 bg-clip-text text-transparent">
              个性化改善建议
            </h2>
            <p className="text-gray-600 text-lg max-w-3xl mx-auto">
              基于AI分析的个性化建议，助您改善睡眠质量
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-white rounded-2xl p-8 shadow-lg border border-teal-100/50">
              <div className="w-12 h-12 bg-gradient-to-r from-teal-500 to-sky-500 rounded-xl flex items-center justify-center mb-6">
                <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <h3 className="text-xl font-bold mb-4 text-gray-800">作息调整</h3>
              <p className="text-gray-600 mb-4 leading-relaxed">
                建议提前30分钟入睡，保持规律的作息时间，避免熬夜和睡眠不足
              </p>
              <ul className="space-y-2 text-sm text-gray-600">
                <li className="flex items-start space-x-2">
                  <span className="text-teal-500 mt-1">•</span>
                  <span>每天同一时间上床睡觉</span>
                </li>
                <li className="flex items-start space-x-2">
                  <span className="text-teal-500 mt-1">•</span>
                  <span>睡前1小时停止使用电子设备</span>
                </li>
                <li className="flex items-start space-x-2">
                  <span className="text-teal-500 mt-1">•</span>
                  <span>午休时间控制在30分钟内</span>
                </li>
              </ul>
            </div>

            <div className="bg-white rounded-2xl p-8 shadow-lg border border-purple-100/50">
              <div className="w-12 h-12 bg-gradient-to-r from-purple-500 to-pink-500 rounded-xl flex items-center justify-center mb-6">
                <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 15a4 4 0 004 4h9a5 5 0 10-.1-9.999 5.002 5.002 0 10-9.78 2.096A4.001 4.001 0 003 15z" />
                </svg>
              </div>
              <h3 className="text-xl font-bold mb-4 text-gray-800">环境优化</h3>
              <p className="text-gray-600 mb-4 leading-relaxed">
                卧室温度保持在18-22℃，湿度控制在40-60%，创造舒适的睡眠环境
              </p>
              <ul className="space-y-2 text-sm text-gray-600">
                <li className="flex items-start space-x-2">
                  <span className="text-purple-500 mt-1">•</span>
                  <span>使用遮光窗帘，保持房间黑暗</span>
                </li>
                <li className="flex items-start space-x-2">
                  <span className="text-purple-500 mt-1">•</span>
                  <span>减少环境噪音或使用耳塞</span>
                </li>
                <li className="flex items-start space-x-2">
                  <span className="text-purple-500 mt-1">•</span>
                  <span>选择舒适的床垫和枕头</span>
                </li>
              </ul>
            </div>

            <div className="bg-white rounded-2xl p-8 shadow-lg border border-sky-100/50">
              <div className="w-12 h-12 bg-gradient-to-r from-sky-500 to-blue-500 rounded-xl flex items-center justify-center mb-6">
                <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                </svg>
              </div>
              <h3 className="text-xl font-bold mb-4 text-gray-800">饮食建议</h3>
              <p className="text-gray-600 mb-4 leading-relaxed">
                晚餐时间提前到睡前3小时，避免油腻食物，适量摄入有助于睡眠的食物
              </p>
              <ul className="space-y-2 text-sm text-gray-600">
                <li className="flex items-start space-x-2">
                  <span className="text-sky-500 mt-1">•</span>
                  <span>睡前可饮用温牛奶或蜂蜜水</span>
                </li>
                <li className="flex items-start space-x-2">
                  <span className="text-sky-500 mt-1">•</span>
                  <span>避免睡前3小时进食</span>
                </li>
                <li className="flex items-start space-x-2">
                  <span className="text-sky-500 mt-1">•</span>
                  <span>减少咖啡因和酒精摄入</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* 订阅方案 */}
      <section id="pricing" className="py-20 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold mb-6 bg-gradient-to-r from-teal-600 to-purple-600 bg-clip-text text-transparent">
              订阅方案
            </h2>
            <p className="text-gray-600 text-lg max-w-3xl mx-auto">
              选择适合您的订阅模式，享受个性化睡眠健康管理服务
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {/* 免费版 */}
            <div className="bg-white rounded-2xl shadow-lg p-8 border border-gray-200">
              <div className="text-center mb-8">
                <h3 className="text-2xl font-bold text-gray-800 mb-2">免费版</h3>
                <div className="text-4xl font-bold text-gray-800 mb-2">¥0</div>
                <div className="text-sm text-gray-500">永久免费</div>
              </div>
              <ul className="space-y-4 mb-8">
                <li className="flex items-start space-x-3">
                  <svg className="w-5 h-5 text-teal-500 mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  <span className="text-gray-600">基础睡眠数据查看</span>
                </li>
                <li className="flex items-start space-x-3">
                  <svg className="w-5 h-5 text-teal-500 mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  <span className="text-gray-600">最近30天数据</span>
                </li>
                <li className="flex items-start space-x-3">
                  <svg className="w-5 h-5 text-teal-500 mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  <span className="text-gray-600">简单睡眠评分</span>
                </li>
              </ul>
              <button className="w-full py-3 border border-gray-300 rounded-xl text-gray-700 font-medium hover:bg-gray-50 transition-colors">
                免费使用
              </button>
            </div>

            {/* 付费版 */}
            <div className="bg-white rounded-2xl shadow-xl p-8 border-2 border-purple-500 relative">
              <div className="absolute -top-4 left-1/2 -translate-x-1/2">
                <span className="bg-gradient-to-r from-purple-500 to-pink-500 text-white px-4 py-1 rounded-full text-sm font-medium">
                  推荐
                </span>
              </div>
              <div className="text-center mb-8">
                <h3 className="text-2xl font-bold text-gray-800 mb-2">付费版</h3>
                <div className="text-4xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent mb-2">
                  ¥29.9
                </div>
                <div className="text-sm text-gray-500">/月</div>
              </div>
              <ul className="space-y-4 mb-8">
                <li className="flex items-start space-x-3">
                  <svg className="w-5 h-5 text-purple-500 mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  <span className="text-gray-600">深度睡眠分析报告</span>
                </li>
                <li className="flex items-start space-x-3">
                  <svg className="w-5 h-5 text-purple-500 mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  <span className="text-gray-600">个性化改善建议</span>
                </li>
                <li className="flex items-start space-x-3">
                  <svg className="w-5 h-5 text-purple-500 mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  <span className="text-gray-600">历史数据趋势</span>
                </li>
                <li className="flex items-start space-x-3">
                  <svg className="w-5 h-5 text-purple-500 mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  <span className="text-gray-600">睡眠模式对比</span>
                </li>
              </ul>
              <button className="w-full py-3 bg-gradient-to-r from-purple-500 to-pink-500 text-white rounded-xl font-medium hover:from-purple-600 hover:to-pink-600 transition-all">
                立即订阅
              </button>
            </div>

            {/* 年付版 */}
            <div className="bg-white rounded-2xl shadow-lg p-8 border border-gray-200">
              <div className="text-center mb-8">
                <h3 className="text-2xl font-bold text-gray-800 mb-2">年付版</h3>
                <div className="text-4xl font-bold text-gray-800 mb-2">¥299</div>
                <div className="text-sm text-gray-500">/年</div>
              </div>
              <ul className="space-y-4 mb-8">
                <li className="flex items-start space-x-3">
                  <svg className="w-5 h-5 text-sky-500 mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  <span className="text-gray-600">所有付费版功能</span>
                </li>
                <li className="flex items-start space-x-3">
                  <svg className="w-5 h-5 text-sky-500 mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  <span className="text-gray-600">优先客服支持</span>
                </li>
                <li className="flex items-start space-x-3">
                  <svg className="w-5 h-5 text-sky-500 mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  <span className="text-gray-600">年度睡眠报告</span>
                </li>
                <li className="flex items-start space-x-3">
                  <svg className="w-5 h-5 text-sky-500 mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  <span className="text-gray-600">健康数据导出</span>
                </li>
              </ul>
              <button className="w-full py-3 border border-sky-500 text-sky-600 rounded-xl font-medium hover:bg-sky-50 transition-colors">
                立即订阅
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* 页脚 */}
      <footer className="bg-white/80 border-t border-teal-100/50 py-12 px-6">
        <div className="max-w-7xl mx-auto text-center">
          <div className="flex items-center justify-center space-x-2 mb-4">
            <div className="w-8 h-8 bg-gradient-to-r from-teal-500 to-purple-500 rounded-lg flex items-center justify-center">
              <span className="text-white font-bold">睡</span>
            </div>
            <span className="text-xl font-bold bg-gradient-to-r from-teal-600 to-purple-600 bg-clip-text text-transparent">
              智能睡眠监测器
            </span>
          </div>
          <p className="text-gray-600 mb-6">
            科学监测，智能分析，守护您的睡眠健康
          </p>
          <div className="flex items-center justify-center space-x-8 text-sm text-gray-500">
            <span>© 2025 智能睡眠监测器</span>
            <span>·</span>
            <span>数据精度 95%+</span>
            <span>·</span>
            <span>100K+ 用户信赖</span>
          </div>
        </div>
      </footer>
    </div>
  );
}
