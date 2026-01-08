# 🌙 智能睡眠追踪器 Pro

> 基于 RCSW 工作流开发的完整产品 | 遵循认知敏捷法（42COG）

## 🎯 项目概述

这是一个完整的智能睡眠追踪器应用，帮助用户记录睡眠数据、分析睡眠质量，并提供个性化建议。

## ✨ 核心功能

### 📝 睡眠记录
- 记录入睡/起床时间
- 评分睡眠质量（1-10分）
- 记录环境因素
- 添加个人备注

### 📊 数据分析
- 查看总记录数、平均睡眠时长、平均睡眠质量
- 追踪睡眠质量趋势（改善中/下降/稳定）
- 按时间范围分析（周/月/年）
- 查看详细记录列表

### 💡 智能建议
- 基于历史数据生成个性化建议
- 推荐最佳入睡时间
- 环境优化建议
- 睡眠习惯改善建议

### 📊 数据可视化
- 睡眠质量趋势图表
- 彩色进度条显示质量等级
- 实时数据更新
- 最近10条记录可视化

### 📥 数据导出
- 一键导出CSV格式数据
- 支持JSON格式导出
- 包含完整睡眠信息
- 便于外部分析和处理

### 🔐 用户系统
- 安全的用户注册/登录
- 个人数据隔离
- 数据持久化存储

### 📱 响应式设计
- 支持手机、平板、桌面端
- 现代化 UI 设计
- 流畅的用户体验

## 🏗️ 技术架构

### 前端
- **Next.js 16** - React 框架
- **React** - 用户界面库
- **Tailwind CSS** - 样式框架
- **NextAuth.js** - 认证系统

### 后端
- **Next.js API Routes** - 服务端接口
- **Drizzle ORM** - 数据库操作
- **Neon PostgreSQL** - 数据库服务

### 部署
- **Vercel** - 托管平台
- **GitHub** - 代码仓库

## 📁 项目结构

```
sleep-tracker-app/
├── app/
│   ├── page.tsx              # 主页
│   ├── sleep/page.tsx        # 睡眠记录页
│   ├── analytics/page.tsx     # 数据分析页
│   └── api/
│       ├── auth/             # 认证接口
│       ├── sleep/
│       │   ├── record/       # 睡眠记录接口
│       │   └── analysis/     # 睡眠分析接口
│       └── ...
├── src/
│   ├── db/
│   │   ├── schema.ts        # 数据库表结构
│   │   └── index.ts         # 数据库配置
│   └── lib/
├── RCSW_PRODUCT_SPEC.md      # 产品需求文档
└── DEPLOYMENT_GUIDE.md      # 部署指南
```

## 🚀 快速开始

### 在线访问
访问 Vercel 部署的在线版本（替换为实际项目名）：
```
https://你的项目名.vercel.app
```

### 本地开发

```bash
# 1. 克隆项目
git clone <你的仓库地址>
cd sleep-tracker-app

# 2. 安装依赖
npm install

# 3. 配置环境变量
cp .env.example .env.local
# 编辑 .env.local，填入你的配置

# 4. 启动开发服务器
npm run dev

# 5. 访问 http://localhost:3000
```

### 环境变量配置

在 `.env.local` 中配置：

```env
# 数据库连接
DATABASE_URL=postgresql://username:password@host.neon.tech/dbname?sslmode=require

# NextAuth 配置
NEXTAUTH_SECRET=your-random-secret-key-here
NEXTAUTH_URL=http://localhost:3000
```

## 📚 开发流程

本项目遵循 **RCSW 工作流**（认知敏捷法）开发：

### 1️⃣ Real（现实约束）
- ✅ 数据持久化存储
- ✅ 响应式设计
- ✅ 睡眠分析功能
- ✅ 安全性保障

### 2️⃣ Cog（认知模型）
- ✅ 定义核心实体（用户、睡眠记录、分析、建议）
- ✅ 明确用户心智模型
- ✅ 设计数据关系

### 3️⃣ Spec（规约文档）
- ✅ 功能需求文档
- ✅ 非功能需求文档
- ✅ 技术架构文档

### 4️⃣ Work（实际作品）
- ✅ 数据库设计
- ✅ API 接口开发
- ✅ 前端页面实现
- ✅ 部署上线

## 📖 使用指南

### 步骤 1: 注册/登录
1. 访问 `/auth/signup` 注册新用户
2. 或访问 `/auth/signin` 登录已有用户

### 步骤 2: 记录睡眠
1. 访问 `/sleep` 页面
2. 点击"添加记录"按钮
3. 填写睡眠信息并保存

### 步骤 3: 查看分析
1. 访问 `/analytics` 页面
2. 查看睡眠统计数据
3. 阅读智能建议

## 🔧 API 接口

### 睡眠记录
- `POST /api/sleep/record` - 创建记录
- `GET /api/sleep/record?userId=xxx` - 获取记录列表

### 睡眠分析
- `GET /api/sleep/analysis?userId=xxx&period=week` - 获取分析数据

### 数据导出
- `GET /api/sleep/export?userId=xxx&format=csv` - 导出CSV格式数据
- `GET /api/sleep/export?userId=xxx&format=json` - 导出JSON格式数据

### 用户认证
- `POST /api/auth/register` - 用户注册
- `POST /api/auth/signin` - 用户登录

## 📊 数据库设计

### users 表
- id, username, email, password, createdAt, updatedAt

### sleep_records 表
- id, userId, sleepTime, wakeTime, sleepQuality, duration, environment, notes, createdAt

### sleep_analyses 表
- id, userId, date, avgSleepDuration, avgSleepQuality, totalRecords, bestSleepTime, recommendation

## 🎨 UI 设计

采用现代化设计风格：
- 渐变色彩搭配
- 卡片式布局
- 响应式网格系统
- 直观的数据可视化

## 🔒 安全特性

- 密码加密存储（bcrypt）
- JWT Token 认证
- SQL 注入防护
- XSS 防护
- 环境变量保护

## 📈 性能优化

- 延迟数据库连接（Proxy 模式）
- 代码分割
- 图片优化
- 静态生成
- API 缓存

## 🐛 问题排查

### 部署失败
1. 检查环境变量配置
2. 查看 Vercel 部署日志
3. 确认 DATABASE_URL 格式正确

### 数据库连接错误
1. 访问 `/api/create-tables` 创建表
2. 检查 Neon 数据库状态
3. 验证连接字符串

### API 接口错误
1. 查看浏览器开发者工具
2. 检查请求参数格式
3. 查看服务端日志

## 📞 支持

如有问题，请：
1. 查看 `DEPLOYMENT_GUIDE.md` 部署指南
2. 检查 `RCSW_PRODUCT_SPEC.md` 产品文档
3. 访问 GitHub Issues 提交问题

## 🏆 项目亮点

✅ 完整遵循 RCSW 工作流
✅ 真实的产品级代码质量
✅ 现代化技术栈
✅ 完善的文档和指南
✅ 生产环境部署就绪
✅ 数据导出功能
✅ 可视化图表展示
✅ 智能数据分析
✅ 响应式设计

## 📄 许可证

MIT License

## 👨‍💻 开发者

基于 42COG 认知敏捷法开发

---

**🎉 恭喜！你已成功完成一个完整的产品研发流程！**

从需求分析到产品上线，每个步骤都有完整的文档和代码支持。
