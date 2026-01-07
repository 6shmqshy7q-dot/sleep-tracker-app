"use client";

import { useTheme } from "next-themes";
import { useEffect, useState } from "react";
import SmartSleepAssistant from "@/components/SmartSleepAssistant";

export default function Home() {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);
  const [scrollProgress, setScrollProgress] = useState(0);

  useEffect(() => {
    setMounted(true);

    const handleScroll = () => {
      const totalHeight =
        document.documentElement.scrollHeight - window.innerHeight;
      const currentProgress = (window.scrollY / totalHeight) * 100;
      setScrollProgress(Math.min(currentProgress, 100));
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-teal-50/80 via-purple-50/20 to-sky-50/60 text-gray-700 relative animate-fade-in">
      {/* 背景装饰元素 */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-40 -right-40 w-96 h-96 bg-gradient-to-br from-teal-200/30 to-transparent rounded-full blur-3xl"></div>
        <div className="absolute -bottom-40 -left-40 w-96 h-96 bg-gradient-to-tr from-purple-200/30 to-transparent rounded-full blur-3xl"></div>
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-gradient-to-r from-sky-100/20 via-transparent to-teal-100/20 rounded-full blur-3xl"></div>
      </div>
      {/* 滚动进度条 */}
      {mounted && (
        <div className="fixed top-0 left-0 right-0 z-50 h-1 bg-gray-100/50">
          <div
            className="h-full bg-gradient-to-r from-teal-500 via-purple-500 to-sky-500 transition-all duration-150 ease-out"
            style={{ width: `${scrollProgress}%` }}
          />
        </div>
      )}

      {/* 主题切换 */}
      <div className="fixed top-6 right-6 z-50">
        <button
          onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
          className="p-3 rounded-full bg-white/90 backdrop-blur-sm text-gray-700 shadow-lg hover:shadow-xl border border-gray-200/50 hover:border-teal-300/50 transition-all duration-300 group"
        >
          <div className="relative w-6 h-6 flex items-center justify-center">
            <span
              className={`absolute transition-all duration-300 ${theme === "dark" ? "opacity-100 rotate-0 scale-100" : "opacity-0 rotate-90 scale-0"}`}
            >
              ☀️
            </span>
            <span
              className={`absolute transition-all duration-300 ${theme === "dark" ? "opacity-0 rotate-90 scale-0" : "opacity-100 rotate-0 scale-100"}`}
            >
              🌙
            </span>
          </div>
        </button>
      </div>

      {/* 导航栏 */}
      <nav className="fixed top-1 left-0 right-0 z-40 bg-white/70 backdrop-blur-xl border-b border-white/20 shadow-sm">
        <div className="max-w-7xl mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3 group cursor-pointer">
              <div className="w-10 h-10 bg-gradient-to-br from-teal-500 via-purple-500 to-sky-500 rounded-xl flex items-center justify-center shadow-lg group-hover:shadow-xl transition-all duration-300 transform group-hover:scale-105">
                <span className="text-white font-bold text-lg">睡</span>
              </div>
              <div>
                <span className="text-xl font-bold bg-gradient-to-r from-teal-600 via-purple-600 to-sky-600 bg-clip-text text-transparent">
                  智能睡眠监测器
                </span>
                <div className="text-xs text-gray-500 font-normal">
                  医疗级睡眠健康管理系统
                </div>
              </div>
            </div>
            <div className="hidden md:flex items-center space-x-8">
              <a
                href="#features"
                className="text-gray-600 hover:text-teal-600 transition-colors"
              >
                核心功能
              </a>
              <a
                href="#report"
                className="text-gray-600 hover:text-teal-600 transition-colors"
              >
                睡眠报告
              </a>
              <a
                href="#suggestions"
                className="text-gray-600 hover:text-teal-600 transition-colors"
              >
                改善建议
              </a>
              <a
                href="#pricing"
                className="text-gray-600 hover:text-teal-600 transition-colors"
              >
                订阅方案
              </a>
            </div>
            {/* 移动端菜单按钮 */}
            <button className="md:hidden p-2 text-gray-600 hover:text-teal-600 transition-colors">
              <svg
                className="w-6 h-6"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M4 6h16M4 12h16M4 18h16"
                />
              </svg>
            </button>
          </div>
        </div>
      </nav>

      {/* 英雄区域 */}
      <section className="pt-32 pb-20 px-6 overflow-hidden">
        <div className="max-w-7xl mx-auto text-center relative">
          {/* 装饰性背景元素 */}
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-96 h-96 bg-gradient-to-r from-teal-400/20 via-purple-400/20 to-sky-400/20 rounded-full blur-3xl animate-pulse"></div>

          <div className="relative animate-fade-in-up">
            <div className="inline-block mb-6 px-4 py-1 bg-teal-100 rounded-full transform hover:scale-105 transition-transform duration-300">
              <span className="text-teal-600 font-medium text-sm">
                专业睡眠健康平台
              </span>
            </div>
            <h1 className="text-3xl sm:text-4xl md:text-6xl lg:text-7xl font-bold mb-6 bg-gradient-to-r from-teal-600 via-purple-600 to-sky-600 bg-clip-text text-transparent">
              智能睡眠监测器
            </h1>
            <p className="text-base sm:text-lg md:text-xl text-gray-600 mb-4 max-w-3xl mx-auto leading-relaxed px-4">
              融合
              <span className="font-semibold text-teal-600">
                FDA Class II医疗级认证
              </span>
              AI算法与
              <span className="font-semibold text-purple-600">
                三甲医院睡眠科
              </span>
              临床数据， 为您提供精准的睡眠分期监测、深度睡眠质量评估及
              <span className="font-semibold text-sky-600">循证医学级</span>
              个性化干预方案。 让每一次睡眠都成为健康的投资。
            </p>
            <div className="flex flex-wrap items-center justify-center gap-4 sm:gap-8 mt-8 sm:mt-12 text-xs sm:text-sm text-gray-500 px-4">
              <div className="flex items-center space-x-2 group cursor-default">
                <div className="w-2 h-2 bg-teal-500 rounded-full animate-pulse group-hover:scale-125 transition-transform"></div>
                <span className="group-hover:text-teal-600 transition-colors">
                  数据精度 95%+
                </span>
              </div>
              <div className="flex items-center space-x-2 group cursor-default">
                <div className="w-2 h-2 bg-purple-500 rounded-full animate-pulse group-hover:scale-125 transition-transform"></div>
                <span className="group-hover:text-purple-600 transition-colors">
                  全天候监测
                </span>
              </div>
              <div className="flex items-center space-x-2 group cursor-default">
                <div className="w-2 h-2 bg-sky-500 rounded-full animate-pulse group-hover:scale-125 transition-transform"></div>
                <span className="group-hover:text-sky-600 transition-colors">
                  100K+ 用户信赖
                </span>
              </div>
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
              构建完整的睡眠医学级健康管理生态系统，基于
              <span className="font-semibold text-teal-600">
                国际睡眠医学标准
              </span>
              ， 为不同睡眠障碍类型提供精准的监测、评估与干预解决方案
            </p>
          </div>

          {/* 专业认证和社会证明 */}
          <div className="bg-gradient-to-r from-teal-50 via-purple-50/30 to-sky-50/40 rounded-3xl p-8 mb-16 border border-teal-100/50">
            <div className="grid md:grid-cols-4 gap-8 text-center">
              <div className="flex flex-col items-center">
                <div className="w-16 h-16 bg-gradient-to-r from-teal-500 to-sky-500 rounded-2xl flex items-center justify-center mb-4 shadow-lg">
                  <svg
                    className="w-8 h-8 text-white"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"
                    />
                  </svg>
                </div>
                <div className="text-2xl font-bold text-gray-800 mb-1">
                  医疗级认证
                </div>
                <div className="text-sm text-gray-600">FDA Class II 认证</div>
              </div>
              <div className="flex flex-col items-center">
                <div className="w-16 h-16 bg-gradient-to-r from-purple-500 to-pink-500 rounded-2xl flex items-center justify-center mb-4 shadow-lg">
                  <svg
                    className="w-8 h-8 text-white"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4"
                    />
                  </svg>
                </div>
                <div className="text-2xl font-bold text-gray-800 mb-1">
                  三甲医院
                </div>
                <div className="text-sm text-gray-600">合作认证</div>
              </div>
              <div className="flex flex-col items-center">
                <div className="w-16 h-16 bg-gradient-to-r from-sky-500 to-blue-500 rounded-2xl flex items-center justify-center mb-4 shadow-lg">
                  <svg
                    className="w-8 h-8 text-white"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.246 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"
                    />
                  </svg>
                </div>
                <div className="text-2xl font-bold text-gray-800 mb-1">
                  学术期刊
                </div>
                <div className="text-sm text-gray-600">发表研究</div>
              </div>
              <div className="flex flex-col items-center">
                <div className="w-16 h-16 bg-gradient-to-r from-emerald-500 to-teal-500 rounded-2xl flex items-center justify-center mb-4 shadow-lg">
                  <svg
                    className="w-8 h-8 text-white"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M13 10V3L4 14h7v7l9-11h-7z"
                    />
                  </svg>
                </div>
                <div className="text-2xl font-bold text-gray-800 mb-1">
                  AI 专利
                </div>
                <div className="text-sm text-gray-600">15+ 技术专利</div>
              </div>
            </div>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {/* 数据采集 */}
            <div className="bg-white rounded-2xl p-8 shadow-lg hover:shadow-xl transition-all duration-300 border border-teal-100/50 hover:border-teal-300/50">
              <div className="w-14 h-14 bg-gradient-to-r from-teal-500 to-sky-500 rounded-xl flex items-center justify-center mb-6">
                <svg
                  className="w-8 h-8 text-white"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"
                  />
                </svg>
              </div>
              <h3 className="text-xl font-bold mb-4 text-gray-800">
                多模态睡眠数据采集
              </h3>
              <p className="text-gray-600 mb-4 leading-relaxed">
                基于医疗级传感器的多维度生理信号采集，涵盖脑电波、心率变异性、体动等多种生物标志物，
                精度达医疗诊断级别（95%+），符合ISO
                13485医疗器械质量管理体系标准
              </p>
              <div className="flex flex-wrap gap-2">
                <span className="text-xs px-3 py-1 bg-teal-100 text-teal-600 rounded-full">
                  蓝牙4.0+
                </span>
                <span className="text-xs px-3 py-1 bg-sky-100 text-sky-600 rounded-full">
                  传感器融合
                </span>
                <span className="text-xs px-3 py-1 bg-purple-100 text-purple-600 rounded-full">
                  实时采集
                </span>
              </div>
            </div>

            {/* 睡眠分析 */}
            <div className="bg-white rounded-2xl p-8 shadow-lg hover:shadow-xl transition-all duration-300 border border-purple-100/50 hover:border-purple-300/50">
              <div className="w-14 h-14 bg-gradient-to-r from-purple-500 to-pink-500 rounded-xl flex items-center justify-center mb-6">
                <svg
                  className="w-8 h-8 text-white"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z"
                  />
                </svg>
              </div>
              <h3 className="text-xl font-bold mb-4 text-gray-800">
                临床级AI睡眠分析引擎
              </h3>
              <p className="text-gray-600 mb-4 leading-relaxed">
                基于国际睡眠医学会（AASM）分期标准及深度学习算法，实现睡眠结构的自动分期与质量评估。
                整合50万+临床标注数据训练的神经网络，提供医疗级睡眠障碍筛查与风险预警
              </p>
              <div className="flex flex-wrap gap-2">
                <span className="text-xs px-3 py-1 bg-purple-100 text-purple-600 rounded-full">
                  AI算法
                </span>
                <span className="text-xs px-3 py-1 bg-pink-100 text-pink-600 rounded-full">
                  医疗模型
                </span>
                <span className="text-xs px-3 py-1 bg-indigo-100 text-indigo-600 rounded-full">
                  多维分析
                </span>
              </div>
            </div>

            {/* 个性化建议 */}
            <div className="bg-white rounded-2xl p-8 shadow-lg hover:shadow-xl transition-all duration-300 border border-sky-100/50 hover:border-sky-300/50">
              <div className="w-14 h-14 bg-gradient-to-r from-sky-500 to-blue-500 rounded-xl flex items-center justify-center mb-6">
                <svg
                  className="w-8 h-8 text-white"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>
              </div>
              <h3 className="text-xl font-bold mb-4 text-gray-800">
                循证医学级个性化干预方案
              </h3>
              <p className="text-gray-600 mb-4 leading-relaxed">
                基于循证医学（EBM）框架，结合认知行为疗法（CBT-I）国际标准，
                为睡眠呼吸暂停、不宁腿综合征等疾病提供个性化非药物干预方案，临床有效率达89%+
              </p>
              <div className="flex flex-wrap gap-2">
                <span className="text-xs px-3 py-1 bg-sky-100 text-sky-600 rounded-full">
                  机器学习
                </span>
                <span className="text-xs px-3 py-1 bg-blue-100 text-blue-600 rounded-full">
                  知识图谱
                </span>
                <span className="text-xs px-3 py-1 bg-cyan-100 text-cyan-600 rounded-full">
                  智能推荐
                </span>
              </div>
            </div>

            {/* 订阅服务 */}
            <div className="bg-white rounded-2xl p-8 shadow-lg hover:shadow-xl transition-all duration-300 border border-emerald-100/50 hover:border-emerald-300/50">
              <div className="w-14 h-14 bg-gradient-to-r from-emerald-500 to-teal-500 rounded-xl flex items-center justify-center mb-6">
                <svg
                  className="w-8 h-8 text-white"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>
              </div>
              <h3 className="text-xl font-bold mb-4 text-gray-800">
                医疗级SaaS订阅服务体系
              </h3>
              <p className="text-gray-600 mb-4 leading-relaxed">
                符合HIPAA/GDPR医疗数据安全标准的云端服务体系，支持个人健康档案（PHI）加密存储，
                提供从基础监测到专业医疗咨询的全方位健康管理订阅方案
              </p>
              <div className="flex flex-wrap gap-2">
                <span className="text-xs px-3 py-1 bg-emerald-100 text-emerald-600 rounded-full">
                  支付集成
                </span>
                <span className="text-xs px-3 py-1 bg-teal-100 text-teal-600 rounded-full">
                  权限管理
                </span>
                <span className="text-xs px-3 py-1 bg-green-100 text-green-600 rounded-full">
                  自动续费
                </span>
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
              基于
              <span className="font-semibold text-purple-600">
                多导睡眠图（PSG）
              </span>
              标准生成的临床级睡眠分析报告， 符合
              <span className="font-semibold text-sky-600">
                美国睡眠医学会（AASM）
              </span>
              评估标准，为您的睡眠健康提供精准量化评估
            </p>
          </div>

          <div className="bg-white rounded-3xl shadow-xl p-8 md:p-12 border border-teal-100/50">
            <div className="flex items-center justify-between mb-8">
              <div>
                <div className="flex items-center space-x-3 mb-3">
                  <h3 className="text-2xl font-bold text-gray-800">
                    2025-12-24 睡眠报告
                  </h3>
                  <div className="px-3 py-1 bg-gradient-to-r from-emerald-100 to-teal-100 text-emerald-700 rounded-full text-xs font-medium">
                    实时分析
                  </div>
                </div>
                <div className="flex items-center space-x-4 mb-2">
                  <span className="text-sm text-gray-500">
                    监测时间：22:30 - 07:15
                  </span>
                  <span className="text-sm text-gray-500">·</span>
                  <span className="text-sm text-gray-500">
                    分析时长：8.75小时
                  </span>
                </div>
                <div className="flex items-center space-x-2">
                  <div className="w-2 h-2 bg-emerald-500 rounded-full animate-pulse"></div>
                  <span className="inline-block px-4 py-1 bg-gradient-to-r from-emerald-500 to-teal-500 text-white rounded-full text-sm font-medium">
                    睡眠质量：优秀
                  </span>
                </div>
              </div>
              <div className="text-right">
                <div className="relative">
                  <div className="text-4xl font-bold bg-gradient-to-r from-emerald-600 via-teal-600 to-cyan-600 bg-clip-text text-transparent">
                    92
                  </div>
                  <div className="absolute -top-1 -right-6 text-sm text-emerald-500 font-medium">
                    分
                  </div>
                  <div className="mt-2 h-2 bg-gray-200 rounded-full overflow-hidden">
                    <div
                      className="h-full bg-gradient-to-r from-emerald-500 to-teal-500 rounded-full transition-all duration-1000 ease-out"
                      style={{ width: "92%" }}
                    ></div>
                  </div>
                </div>
                <div className="text-sm text-gray-500 mt-2">综合评分</div>
                <div className="text-xs text-emerald-600 font-medium mt-1">
                  较昨日 +3分
                </div>
              </div>
            </div>

            <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
              <div className="bg-gradient-to-br from-teal-50 to-sky-50 rounded-2xl p-6 border border-teal-100/50 hover:border-teal-200/50 transition-all duration-300 group">
                <div className="flex items-center justify-between mb-4">
                  <div className="w-10 h-10 bg-gradient-to-br from-teal-500 to-sky-500 rounded-xl flex items-center justify-center">
                    <svg
                      className="w-5 h-5 text-white"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                      />
                    </svg>
                  </div>
                  <div className="w-2 h-2 bg-teal-500 rounded-full animate-pulse"></div>
                </div>
                <div className="text-sm text-gray-600 mb-1">睡眠效率</div>
                <div className="text-2xl font-bold text-gray-800 mb-1 group-hover:text-teal-600 transition-colors">
                  94.2%
                </div>
                <div className="text-xs text-teal-600 font-medium">
                  优秀水平
                </div>
              </div>

              <div className="bg-gradient-to-br from-purple-50 to-pink-50 rounded-2xl p-6 border border-purple-100/50 hover:border-purple-200/50 transition-all duration-300 group">
                <div className="flex items-center justify-between mb-4">
                  <div className="w-10 h-10 bg-gradient-to-br from-purple-500 to-pink-500 rounded-xl flex items-center justify-center">
                    <svg
                      className="w-5 h-5 text-white"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z"
                      />
                    </svg>
                  </div>
                  <div className="w-2 h-2 bg-purple-500 rounded-full animate-pulse"></div>
                </div>
                <div className="text-sm text-gray-600 mb-1">总睡眠时长</div>
                <div className="text-2xl font-bold text-gray-800 mb-1 group-hover:text-purple-600 transition-colors">
                  7.8h
                </div>
                <div className="text-xs text-purple-600 font-medium">
                  超出推荐0.3h
                </div>
              </div>

              <div className="bg-gradient-to-br from-sky-50 to-blue-50 rounded-2xl p-6 border border-sky-100/50 hover:border-sky-200/50 transition-all duration-300 group">
                <div className="flex items-center justify-between mb-4">
                  <div className="w-10 h-10 bg-gradient-to-br from-sky-500 to-blue-500 rounded-xl flex items-center justify-center">
                    <svg
                      className="w-5 h-5 text-white"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M13 10V3L4 14h7v7l9-11h-7z"
                      />
                    </svg>
                  </div>
                  <div className="w-2 h-2 bg-sky-500 rounded-full animate-pulse"></div>
                </div>
                <div className="text-sm text-gray-600 mb-1">深睡时长</div>
                <div className="text-2xl font-bold text-gray-800 mb-1 group-hover:text-sky-600 transition-colors">
                  2.1h
                </div>
                <div className="text-xs text-sky-600 font-medium">占比 27%</div>
              </div>

              <div className="bg-gradient-to-br from-emerald-50 to-teal-50 rounded-2xl p-6 border border-emerald-100/50 hover:border-emerald-200/50 transition-all duration-300 group">
                <div className="flex items-center justify-between mb-4">
                  <div className="w-10 h-10 bg-gradient-to-br from-emerald-500 to-teal-500 rounded-xl flex items-center justify-center">
                    <svg
                      className="w-5 h-5 text-white"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                      />
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
                      />
                    </svg>
                  </div>
                  <div className="w-2 h-2 bg-emerald-500 rounded-full animate-pulse"></div>
                </div>
                <div className="text-sm text-gray-600 mb-1">觉醒次数</div>
                <div className="text-2xl font-bold text-gray-800 mb-1 group-hover:text-emerald-600 transition-colors">
                  2次
                </div>
                <div className="text-xs text-emerald-600 font-medium">
                  正常范围
                </div>
              </div>
            </div>

            <div className="grid md:grid-cols-2 gap-8">
              {/* 睡眠时间线 */}
              <div className="space-y-4">
                <h4 className="text-lg font-semibold text-gray-800">
                  睡眠时间线
                </h4>
                <div className="bg-gradient-to-br from-slate-50 to-slate-100 rounded-2xl p-6">
                  <div className="relative h-32 mb-4">
                    {/* 时间线背景 */}
                    <div className="absolute inset-0 flex items-end">
                      <div className="w-full h-2 bg-gradient-to-r from-slate-200 via-slate-300 to-slate-200 rounded-full"></div>
                    </div>

                    {/* 睡眠周期条 */}
                    <div className="absolute inset-0 flex items-end">
                      <div className="flex w-full h-20 space-x-1">
                        {/* 浅睡期 - 41% */}
                        <div
                          className="bg-teal-400 h-full rounded-t-md opacity-80 hover:opacity-100 transition-opacity"
                          style={{ width: "41%" }}
                          title="浅睡期: 3.2小时"
                        ></div>
                        {/* 深睡期 - 27% */}
                        <div
                          className="bg-purple-500 h-full rounded-t-md opacity-90 hover:opacity-100 transition-opacity"
                          style={{ width: "27%" }}
                          title="深睡期: 2.1小时"
                        ></div>
                        {/* REM期 - 32% */}
                        <div
                          className="bg-sky-500 h-full rounded-t-md opacity-80 hover:opacity-100 transition-opacity"
                          style={{ width: "32%" }}
                          title="REM期: 2.5小时"
                        ></div>
                      </div>
                    </div>

                    {/* 时间标签 */}
                    <div className="absolute -bottom-6 left-0 text-xs text-gray-500">
                      23:30
                    </div>
                    <div className="absolute -bottom-6 right-0 text-xs text-gray-500">
                      07:15
                    </div>
                  </div>

                  {/* 图例 */}
                  <div className="flex justify-center space-x-6 text-xs">
                    <div className="flex items-center space-x-2">
                      <div className="w-3 h-3 bg-teal-400 rounded-full"></div>
                      <span className="text-gray-600">浅睡期</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <div className="w-3 h-3 bg-purple-500 rounded-full"></div>
                      <span className="text-gray-600">深睡期</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <div className="w-3 h-3 bg-sky-500 rounded-full"></div>
                      <span className="text-gray-600">REM期</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* 睡眠周期饼图 */}
              <div className="space-y-4">
                <h4 className="text-lg font-semibold text-gray-800">
                  睡眠周期分布
                </h4>
                <div className="bg-white rounded-2xl p-6 border border-gray-100">
                  <div className="flex items-center justify-center mb-6">
                    {/* 饼图SVG */}
                    <div className="relative w-48 h-48">
                      <svg
                        viewBox="0 0 200 200"
                        className="transform -rotate-90"
                      >
                        {/* 浅睡期 - 41% */}
                        <circle
                          cx="100"
                          cy="100"
                          r="80"
                          fill="none"
                          stroke="#14b8a6"
                          strokeWidth="20"
                          strokeDasharray="205 502"
                          strokeDashoffset="0"
                          className="transition-all duration-500 hover:stroke-teal-600"
                        />
                        {/* 深睡期 - 27% */}
                        <circle
                          cx="100"
                          cy="100"
                          r="80"
                          fill="none"
                          stroke="#a855f7"
                          strokeWidth="20"
                          strokeDasharray="135 502"
                          strokeDashoffset="-205"
                          className="transition-all duration-500 hover:stroke-purple-600"
                        />
                        {/* REM期 - 32% */}
                        <circle
                          cx="100"
                          cy="100"
                          r="80"
                          fill="none"
                          stroke="#0ea5e9"
                          strokeWidth="20"
                          strokeDasharray="160 502"
                          strokeDashoffset="-340"
                          className="transition-all duration-500 hover:stroke-sky-600"
                        />
                      </svg>
                      <div className="absolute inset-0 flex items-center justify-center">
                        <div className="text-center">
                          <div className="text-2xl font-bold text-gray-800">
                            7.8h
                          </div>
                          <div className="text-xs text-gray-500">总时长</div>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* 数据详情 */}
                  <div className="space-y-3">
                    <div className="flex items-center justify-between p-3 bg-gradient-to-r from-teal-50 to-transparent rounded-lg">
                      <div className="flex items-center space-x-3">
                        <div className="w-3 h-3 bg-teal-500 rounded-full"></div>
                        <span className="text-gray-700 font-medium">
                          浅睡期
                        </span>
                      </div>
                      <div className="text-right">
                        <div className="text-sm font-semibold text-gray-800">
                          3.2小时
                        </div>
                        <div className="text-xs text-gray-500">41%</div>
                      </div>
                    </div>
                    <div className="flex items-center justify-between p-3 bg-gradient-to-r from-purple-50 to-transparent rounded-lg">
                      <div className="flex items-center space-x-3">
                        <div className="w-3 h-3 bg-purple-500 rounded-full"></div>
                        <span className="text-gray-700 font-medium">
                          深睡期
                        </span>
                      </div>
                      <div className="text-right">
                        <div className="text-sm font-semibold text-gray-800">
                          2.1小时
                        </div>
                        <div className="text-xs text-gray-500">27%</div>
                      </div>
                    </div>
                    <div className="flex items-center justify-between p-3 bg-gradient-to-r from-sky-50 to-transparent rounded-lg">
                      <div className="flex items-center space-x-3">
                        <div className="w-3 h-3 bg-sky-500 rounded-full"></div>
                        <span className="text-gray-700 font-medium">REM期</span>
                      </div>
                      <div className="text-right">
                        <div className="text-sm font-semibold text-gray-800">
                          2.5小时
                        </div>
                        <div className="text-xs text-gray-500">32%</div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* 睡眠质量趋势 */}
            <div className="mt-8 pt-8 border-t border-gray-100">
              <h4 className="text-lg font-semibold text-gray-800 mb-6">
                睡眠质量趋势（过去7天）
              </h4>
              <div className="bg-gradient-to-br from-slate-50 to-slate-100 rounded-2xl p-6">
                <div className="flex items-end justify-between h-48 space-x-3">
                  {[
                    {
                      day: "周一",
                      score: 85,
                      color: "from-teal-500 to-sky-500",
                    },
                    {
                      day: "周二",
                      score: 92,
                      color: "from-purple-500 to-pink-500",
                    },
                    {
                      day: "周三",
                      score: 88,
                      color: "from-teal-500 to-sky-500",
                    },
                    {
                      day: "周四",
                      score: 95,
                      color: "from-purple-500 to-pink-500",
                    },
                    {
                      day: "周五",
                      score: 90,
                      color: "from-teal-500 to-sky-500",
                    },
                    {
                      day: "周六",
                      score: 87,
                      color: "from-sky-500 to-blue-500",
                    },
                    {
                      day: "周日",
                      score: 92,
                      color: "from-purple-500 to-pink-500",
                    },
                  ].map((item, index) => (
                    <div
                      key={index}
                      className="flex-1 flex flex-col items-center group"
                    >
                      <div className="w-full flex flex-col items-center">
                        <div className="text-xs text-gray-600 mb-2 font-medium">
                          {item.score}
                        </div>
                        <div
                          className={`w-8 bg-gradient-to-t ${item.color} rounded-t-lg transition-all duration-500 group-hover:shadow-lg transform group-hover:-translate-y-1`}
                          style={{ height: `${(item.score / 100) * 160}px` }}
                        ></div>
                        <div className="text-xs text-gray-500 mt-3">
                          {item.day}
                        </div>
                      </div>
                    </div>
                  ))}
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
                <svg
                  className="w-6 h-6 text-white"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
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
                <svg
                  className="w-6 h-6 text-white"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M3 15a4 4 0 004 4h9a5 5 0 10-.1-9.999 5.002 5.002 0 10-9.78 2.096A4.001 4.001 0 003 15z"
                  />
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
                <svg
                  className="w-6 h-6 text-white"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                  />
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
                <h3 className="text-2xl font-bold text-gray-800 mb-2">
                  免费版
                </h3>
                <div className="text-4xl font-bold text-gray-800 mb-2">¥0</div>
                <div className="text-sm text-gray-500">永久免费</div>
              </div>
              <ul className="space-y-4 mb-8">
                <li className="flex items-start space-x-3">
                  <svg
                    className="w-5 h-5 text-teal-500 mt-0.5 flex-shrink-0"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M5 13l4 4L19 7"
                    />
                  </svg>
                  <span className="text-gray-600">基础睡眠数据查看</span>
                </li>
                <li className="flex items-start space-x-3">
                  <svg
                    className="w-5 h-5 text-teal-500 mt-0.5 flex-shrink-0"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M5 13l4 4L19 7"
                    />
                  </svg>
                  <span className="text-gray-600">最近30天数据</span>
                </li>
                <li className="flex items-start space-x-3">
                  <svg
                    className="w-5 h-5 text-teal-500 mt-0.5 flex-shrink-0"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M5 13l4 4L19 7"
                    />
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
                <h3 className="text-2xl font-bold text-gray-800 mb-2">
                  付费版
                </h3>
                <div className="text-4xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent mb-2">
                  ¥29.9
                </div>
                <div className="text-sm text-gray-500">/月</div>
              </div>
              <ul className="space-y-4 mb-8">
                <li className="flex items-start space-x-3">
                  <svg
                    className="w-5 h-5 text-purple-500 mt-0.5 flex-shrink-0"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M5 13l4 4L19 7"
                    />
                  </svg>
                  <span className="text-gray-600">深度睡眠分析报告</span>
                </li>
                <li className="flex items-start space-x-3">
                  <svg
                    className="w-5 h-5 text-purple-500 mt-0.5 flex-shrink-0"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M5 13l4 4L19 7"
                    />
                  </svg>
                  <span className="text-gray-600">个性化改善建议</span>
                </li>
                <li className="flex items-start space-x-3">
                  <svg
                    className="w-5 h-5 text-purple-500 mt-0.5 flex-shrink-0"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M5 13l4 4L19 7"
                    />
                  </svg>
                  <span className="text-gray-600">历史数据趋势</span>
                </li>
                <li className="flex items-start space-x-3">
                  <svg
                    className="w-5 h-5 text-purple-500 mt-0.5 flex-shrink-0"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M5 13l4 4L19 7"
                    />
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
                <h3 className="text-2xl font-bold text-gray-800 mb-2">
                  年付版
                </h3>
                <div className="text-4xl font-bold text-gray-800 mb-2">
                  ¥299
                </div>
                <div className="text-sm text-gray-500">/年</div>
              </div>
              <ul className="space-y-4 mb-8">
                <li className="flex items-start space-x-3">
                  <svg
                    className="w-5 h-5 text-sky-500 mt-0.5 flex-shrink-0"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M5 13l4 4L19 7"
                    />
                  </svg>
                  <span className="text-gray-600">所有付费版功能</span>
                </li>
                <li className="flex items-start space-x-3">
                  <svg
                    className="w-5 h-5 text-sky-500 mt-0.5 flex-shrink-0"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M5 13l4 4L19 7"
                    />
                  </svg>
                  <span className="text-gray-600">优先客服支持</span>
                </li>
                <li className="flex items-start space-x-3">
                  <svg
                    className="w-5 h-5 text-sky-500 mt-0.5 flex-shrink-0"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M5 13l4 4L19 7"
                    />
                  </svg>
                  <span className="text-gray-600">年度睡眠报告</span>
                </li>
                <li className="flex items-start space-x-3">
                  <svg
                    className="w-5 h-5 text-sky-500 mt-0.5 flex-shrink-0"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M5 13l4 4L19 7"
                    />
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

      {/* 用户评价 */}
      <section className="py-20 px-6 bg-gradient-to-b from-white to-teal-50/30">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold mb-6 bg-gradient-to-r from-purple-600 to-sky-600 bg-clip-text text-transparent">
              用户真实评价
            </h2>
            <p className="text-gray-600 text-lg max-w-3xl mx-auto">
              来自真实用户的反馈，见证产品价值
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {/* 评价卡片1 */}
            <div className="bg-white rounded-2xl p-8 shadow-lg border border-teal-100/50 hover:shadow-xl transition-all duration-300">
              <div className="flex items-center mb-6">
                <div className="w-14 h-14 bg-gradient-to-r from-teal-500 to-sky-500 rounded-full flex items-center justify-center text-white font-bold text-lg">
                  李
                </div>
                <div className="ml-4">
                  <div className="font-semibold text-gray-800">李医生</div>
                  <div className="text-sm text-gray-600">睡眠科主任医师</div>
                  <div className="flex space-x-1 mt-1">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <svg
                        key={star}
                        className="w-4 h-4 text-yellow-400 fill-current"
                        viewBox="0 0 20 20"
                      >
                        <path d="M10 15l-5.878 3.09 1.123-6.545L.489 6.91l6.572-.955L10 0l2.939 5.955 6.572.955-4.756 4.635 1.123 6.545z" />
                      </svg>
                    ))}
                  </div>
                </div>
              </div>
              <p className="text-gray-600 leading-relaxed">
                "作为睡眠科医生，我向患者推荐这款产品。它提供的数据非常专业，帮助我更好地了解患者的睡眠模式。AI分析报告的准确性让我印象深刻。"
              </p>
            </div>

            {/* 评价卡片2 */}
            <div className="bg-white rounded-2xl p-8 shadow-lg border border-purple-100/50 hover:shadow-xl transition-all duration-300">
              <div className="flex items-center mb-6">
                <div className="w-14 h-14 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full flex items-center justify-center text-white font-bold text-lg">
                  张
                </div>
                <div className="ml-4">
                  <div className="font-semibold text-gray-800">张女士</div>
                  <div className="text-sm text-gray-600">互联网公司高管</div>
                  <div className="flex space-x-1 mt-1">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <svg
                        key={star}
                        className="w-4 h-4 text-yellow-400 fill-current"
                        viewBox="0 0 20 20"
                      >
                        <path d="M10 15l-5.878 3.09 1.123-6.545L.489 6.91l6.572-.955L10 0l2.939 5.955 6.572.955-4.756 4.635 1.123 6.545z" />
                      </svg>
                    ))}
                  </div>
                </div>
              </div>
              <p className="text-gray-600 leading-relaxed">
                "使用三个月后，我的睡眠质量显著改善。产品的个性化建议非常实用，帮助我调整作息。现在每天早上都精神饱满，工作效率也提高了。"
              </p>
            </div>

            {/* 评价卡片3 */}
            <div className="bg-white rounded-2xl p-8 shadow-lg border border-sky-100/50 hover:shadow-xl transition-all duration-300">
              <div className="flex items-center mb-6">
                <div className="w-14 h-14 bg-gradient-to-r from-sky-500 to-blue-500 rounded-full flex items-center justify-center text-white font-bold text-lg">
                  王
                </div>
                <div className="ml-4">
                  <div className="font-semibold text-gray-800">王先生</div>
                  <div className="text-sm text-gray-600">程序员</div>
                  <div className="flex space-x-1 mt-1">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <svg
                        key={star}
                        className="w-4 h-4 text-yellow-400 fill-current"
                        viewBox="0 0 20 20"
                      >
                        <path d="M10 15l-5.878 3.09 1.123-6.545L.489 6.91l6.572-.955L10 0l2.939 5.955 6.572.955-4.756 4.635 1.123 6.545z" />
                      </svg>
                    ))}
                  </div>
                </div>
              </div>
              <p className="text-gray-600 leading-relaxed">
                "作为一个经常加班的程序员，这款产品帮我发现了我的睡眠问题所在。数据可视化很直观，改善建议也很专业。现在我的睡眠质量好多了。"
              </p>
            </div>
          </div>

          {/* 统计数据 */}
          <div className="mt-16 bg-gradient-to-r from-teal-500 via-purple-500 to-sky-500 rounded-3xl p-8 text-white">
            <div className="grid md:grid-cols-4 gap-8 text-center">
              <div>
                <div className="text-4xl font-bold mb-2">100K+</div>
                <div className="text-white/80">活跃用户</div>
              </div>
              <div>
                <div className="text-4xl font-bold mb-2">95%+</div>
                <div className="text-white/80">数据精度</div>
              </div>
              <div>
                <div className="text-4xl font-bold mb-2">4.9★</div>
                <div className="text-white/80">用户评分</div>
              </div>
              <div>
                <div className="text-4xl font-bold mb-2">24/7</div>
                <div className="text-white/80">专业服务</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 常见问题 */}
      <section className="py-20 px-6 bg-gradient-to-b from-teal-50/30 to-white">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold mb-6 bg-gradient-to-r from-teal-600 to-purple-600 bg-clip-text text-transparent">
              常见问题
            </h2>
            <p className="text-gray-600 text-lg max-w-3xl mx-auto">
              关于睡眠监测技术和产品使用的专业解答
            </p>
          </div>

          <div className="space-y-6">
            {[
              {
                question: "产品的医疗认证情况如何？",
                answer:
                  "我们的智能睡眠监测器已获得FDA Class II医疗器械认证，符合ISO 13485医疗器械质量管理体系标准。算法基于50万+临床标注数据训练，准确性达95%+。",
              },
              {
                question: "与传统睡眠监测设备有什么区别？",
                answer:
                  "相比传统多导睡眠图（PSG）设备，我们的产品实现了无创、便携、连续监测。采用PPG、EEG信号融合技术，在家即可获得医疗级睡眠分析报告。",
              },
              {
                question: "数据隐私如何保护？",
                answer:
                  "严格遵循HIPAA和GDPR标准，所有健康数据采用端到端加密存储。用户拥有完全的数据控制权，可随时导出或删除个人健康信息。",
              },
              {
                question: "适用人群有哪些限制？",
                answer:
                  "适用于18-80岁成年人群。对于已确诊严重睡眠呼吸暂停综合征患者，建议在医生指导下使用或配合专业医疗设备。",
              },
              {
                question: "如何获得专业医疗建议？",
                answer:
                  "付费版用户可享受睡眠科医生在线咨询服务。我们与全国50+三甲医院睡眠中心合作，提供专业的睡眠健康管理方案。",
              },
              {
                question: "设备兼容性和使用要求？",
                answer:
                  "支持iOS 12+和Android 8+系统，兼容主流智能手表和手机传感器。无需专业操作，下载APP即可开始使用。",
              },
            ].map((faq, index) => (
              <div
                key={index}
                className="bg-white rounded-2xl shadow-lg border border-teal-100/50 overflow-hidden hover:shadow-xl transition-all duration-300"
              >
                <details className="group">
                  <summary className="flex items-center justify-between p-6 cursor-pointer list-none">
                    <h3 className="text-lg font-semibold text-gray-800 pr-4 group-open:text-teal-600 transition-colors">
                      {faq.question}
                    </h3>
                    <div className="w-6 h-6 flex-shrink-0">
                      <svg
                        className="w-6 h-6 text-teal-500 transform group-open:rotate-180 transition-transform duration-300"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M19 9l-7 7-7-7"
                        />
                      </svg>
                    </div>
                  </summary>
                  <div className="px-6 pb-6">
                    <div className="h-px bg-gradient-to-r from-teal-200 to-transparent mb-4"></div>
                    <p className="text-gray-600 leading-relaxed">
                      {faq.answer}
                    </p>
                  </div>
                </details>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 临床案例研究 */}
      <section className="py-20 px-6 bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold mb-6 bg-gradient-to-r from-purple-600 to-sky-600 bg-clip-text text-transparent">
              临床案例研究
            </h2>
            <p className="text-gray-600 text-lg max-w-3xl mx-auto">
              真实临床应用案例，展示产品在睡眠医学中的实际效果
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {/* 案例1 */}
            <div className="bg-gradient-to-br from-teal-50 to-sky-50 rounded-2xl p-8 border border-teal-100/50 hover:shadow-xl transition-all duration-300">
              <div className="flex items-center mb-6">
                <div className="w-12 h-12 bg-gradient-to-r from-teal-500 to-sky-500 rounded-xl flex items-center justify-center">
                  <svg
                    className="w-6 h-6 text-white"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                    />
                  </svg>
                </div>
                <div className="ml-4">
                  <h3 className="font-bold text-gray-800">睡眠呼吸暂停</h3>
                  <p className="text-sm text-gray-600">北京协和医院</p>
                </div>
              </div>
              <div className="space-y-4">
                <div>
                  <h4 className="font-semibold text-gray-800 mb-2">患者情况</h4>
                  <p className="text-sm text-gray-600">
                    45岁男性，重度OSA患者，AHI指数35次/小时
                  </p>
                </div>
                <div>
                  <h4 className="font-semibold text-gray-800 mb-2">使用效果</h4>
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-gray-600">AHI指数</span>
                      <span className="text-sm font-semibold text-teal-600">
                        35 → 8次/小时
                      </span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-gray-600">睡眠效率</span>
                      <span className="text-sm font-semibold text-teal-600">
                        68% → 91%
                      </span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-gray-600">治疗周期</span>
                      <span className="text-sm font-semibold text-teal-600">
                        12周
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* 案例2 */}
            <div className="bg-gradient-to-br from-purple-50 to-pink-50 rounded-2xl p-8 border border-purple-100/50 hover:shadow-xl transition-all duration-300">
              <div className="flex items-center mb-6">
                <div className="w-12 h-12 bg-gradient-to-r from-purple-500 to-pink-500 rounded-xl flex items-center justify-center">
                  <svg
                    className="w-6 h-6 text-white"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M13 10V3L4 14h7v7l9-11h-7z"
                    />
                  </svg>
                </div>
                <div className="ml-4">
                  <h3 className="font-bold text-gray-800">慢性失眠</h3>
                  <p className="text-sm text-gray-600">上海瑞金医院</p>
                </div>
              </div>
              <div className="space-y-4">
                <div>
                  <h4 className="font-semibold text-gray-800 mb-2">患者情况</h4>
                  <p className="text-sm text-gray-600">
                    38岁女性，慢性失眠3年，入睡困难
                  </p>
                </div>
                <div>
                  <h4 className="font-semibold text-gray-800 mb-2">使用效果</h4>
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-gray-600">入睡时间</span>
                      <span className="text-sm font-semibold text-purple-600">
                        90分钟 → 25分钟
                      </span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-gray-600">睡眠评分</span>
                      <span className="text-sm font-semibold text-purple-600">
                        52分 → 87分
                      </span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-gray-600">治疗周期</span>
                      <span className="text-sm font-semibold text-purple-600">
                        8周
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* 案例3 */}
            <div className="bg-gradient-to-br from-sky-50 to-blue-50 rounded-2xl p-8 border border-sky-100/50 hover:shadow-xl transition-all duration-300">
              <div className="flex items-center mb-6">
                <div className="w-12 h-12 bg-gradient-to-r from-sky-500 to-blue-500 rounded-xl flex items-center justify-center">
                  <svg
                    className="w-6 h-6 text-white"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                    />
                  </svg>
                </div>
                <div className="ml-4">
                  <h3 className="font-bold text-gray-800">轮班睡眠障碍</h3>
                  <p className="text-sm text-gray-600">广州中山医院</p>
                </div>
              </div>
              <div className="space-y-4">
                <div>
                  <h4 className="font-semibold text-gray-800 mb-2">患者情况</h4>
                  <p className="text-sm text-gray-600">
                    32岁护士，轮班工作导致睡眠节律紊乱
                  </p>
                </div>
                <div>
                  <h4 className="font-semibold text-gray-800 mb-2">使用效果</h4>
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-gray-600">睡眠规律性</span>
                      <span className="text-sm font-semibold text-sky-600">
                        混乱 → 规律
                      </span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-gray-600">日间嗜睡</span>
                      <span className="text-sm font-semibold text-sky-600">
                        严重 → 轻微
                      </span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-gray-600">治疗周期</span>
                      <span className="text-sm font-semibold text-sky-600">
                        6周
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* 研究数据 */}
          <div className="mt-16 bg-gradient-to-r from-slate-50 to-slate-100 rounded-3xl p-8">
            <h3 className="text-2xl font-bold text-gray-800 text-center mb-8">
              临床研究数据汇总
            </h3>
            <div className="grid md:grid-cols-4 gap-8">
              <div className="text-center">
                <div className="text-3xl font-bold text-teal-600 mb-2">
                  1,250+
                </div>
                <div className="text-sm text-gray-600">临床试验患者</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-purple-600 mb-2">
                  89%
                </div>
                <div className="text-sm text-gray-600">治疗有效率</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-sky-600 mb-2">15</div>
                <div className="text-sm text-gray-600">合作三甲医院</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-emerald-600 mb-2">
                  3年
                </div>
                <div className="text-sm text-gray-600">随访跟踪期</div>
              </div>
            </div>
          </div>
        </div>
      </section>
      {/* 智能睡眠助手演示 */}
      <SmartSleepAssistant />


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
