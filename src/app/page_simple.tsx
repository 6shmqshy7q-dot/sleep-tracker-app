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
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-slate-100 p-8">
      <div className="max-w-4xl mx-auto">
        {/* 标题 */}
        <div className="text-center mb-16">
          <h1 className="text-5xl font-bold text-blue-600 mb-4">
            小豪的个人博客
          </h1>
          <p className="text-gray-600 text-lg">
            来自青岛海边的一个有趣世界
          </p>
        </div>

        {/* 主题切换 */}
        <div className="fixed top-4 right-4">
          <button
            onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
            className="p-3 rounded-full bg-blue-500 text-white shadow-lg hover:bg-blue-600 transition-colors"
          >
            {theme === "dark" ? "🌞" : "🌙"}
          </button>
        </div>

        {/* 第一章 */}
        <section className="mb-12">
          <h2 className="text-3xl font-bold text-blue-600 mb-6">
            故事开始于...
          </h2>
          <div className="bg-white rounded-lg p-6 shadow-lg">
            <h3 className="text-xl font-semibold mb-3">青岛人</h3>
            <p className="text-gray-600 leading-relaxed">
              正宗青岛小哥！红瓦绿树、碧海蓝天是日常，
              夏天洗海澡、冬天看海鸥。哈啤酒吃蛤蜊是基本操作，
              海风给了我不急不躁的性格。
            </p>
          </div>
        </section>

        {/* 第二章 */}
        <section className="mb-12">
          <h2 className="text-3xl font-bold text-blue-600 mb-6">
            现在的我
          </h2>
          <div className="bg-white rounded-lg p-6 shadow-lg">
            <h3 className="text-xl font-semibold mb-3">医药行业培训</h3>
            <p className="text-gray-600 leading-relaxed">
              在医药行业做培训相关工作，
              负责新员工入职培训、岗位技能提升等。
              写过几篇行业相关的文章，记录工作经验和思考。
            </p>
          </div>
        </section>

        {/* 第三章 */}
        <section className="mb-12">
          <h2 className="text-3xl font-bold text-blue-600 mb-6">
            接下来...
          </h2>
          <div className="bg-white rounded-lg p-6 shadow-lg">
            <h3 className="text-xl font-semibold mb-3">职业发展方向</h3>
            <p className="text-gray-600 leading-relaxed">
              希望在医药行业深耕，专注于课程开发岗位。
              不断提升专业能力，为行业培训贡献更多价值。
            </p>
          </div>
        </section>

        {/* 版权 */}
        <footer className="text-center text-gray-500 mt-16">
          <p>© 2025 小豪 · 用文字讲故事</p>
        </footer>
      </div>
    </div>
  );
}
