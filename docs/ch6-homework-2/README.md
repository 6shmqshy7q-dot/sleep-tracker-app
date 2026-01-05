# 睡眠监测器网站 - Ch6 作业 2

## 项目概述

本项目基于 ch5 睡眠监测器产品展示网站，集成了 Neon 数据库，实现了真实的数据交互功能。

## 技术栈

- **前端框架**: Next.js 16.0.10 (App Router)
- **数据库**: Neon PostgreSQL
- **ORM**: Drizzle ORM
- **认证**: Neon Auth
- **样式**: Tailwind CSS 4.0
- **UI**: next-themes (主题切换)
- **其他**: bcryptjs (密码加密)

## 数据库结构

### 表结构

1. **users** - 用户表
   - id (主键)
   - email (邮箱，唯一)
   - username (用户名)
   - passwordHash (密码哈希)
   - createdAt (创建时间)

2. **sleep_records** - 睡眠记录表
   - id (主键)
   - userId (用户ID，外键)
   - sleepTime (入睡时间)
   - wakeTime (起床时间)
   - sleepQuality (睡眠质量: 好/中/差)
   - duration (睡眠时长，分钟)
   - notes (备注，可选)
   - createdAt (创建时间)

3. **user_profiles** - 用户资料表
   - id (主键)
   - userId (用户ID，外键)
   - fullName (全名)
   - age (年龄)
   - gender (性别)
   - createdAt (创建时间)

## 功能实现

### 1. 数据库连接
- 使用 Neon 数据库云服务
- 通过 Drizzle ORM 进行数据操作
- HTTP 适配器连接 (适用于 Vercel/Edge 环境)

### 2. 用户认证
- **Neon Auth** 集成
- API 路由: `/api/auth/[...path]`
- 支持邮箱/密码注册登录
- 会话管理

### 3. 数据交互功能

#### API 端点
- `POST /api/auth/register` - 用户注册
- `POST /api/auth/login` - 用户登录
- `POST /api/sleep/record` - 记录睡眠数据
- `GET /api/sleep/record?userId=xxx` - 获取用户睡眠记录

#### 前端功能
- 用户注册/登录界面
- 睡眠记录表单 (入睡时间、起床时间、睡眠质量、备注)
- 睡眠记录历史查看
- 实时数据持久化

### 4. UI 组件
- **SleepRecordDemo** - 数据库交互演示组件
- 响应式设计
- 主题切换支持
- 渐变色彩搭配

## 本地开发

### 环境要求
- Node.js 18+
- npm 或 pnpm

### 安装依赖
```bash
npm install
```

### 环境配置
在 `.env.local` 中配置：
```env
DATABASE_URL='postgresql://neondb_owner:xxx@ep-xxx.neon.tech/neondb?sslmode=require'
NEON_AUTH_BASE_URL='https://ep-xxx.neonauth.xxx.neon.tech/neondb/auth'
NEXT_PUBLIC_NEON_AUTH_URL='https://ep-xxx.neonauth.xxx.neon.tech/neondb/auth'
```

### 启动开发服务器
```bash
npm run dev
```

访问: http://localhost:3001

### 数据库操作命令
```bash
npm run db:generate  # 生成迁移文件
npm run db:migrate   # 应用迁移
npm run db:push      # 推送 schema (开发环境)
npm run db:studio    # 打开 Drizzle Studio
```

## 项目亮点

1. **完整数据库集成**: 从 schema 设计到 API 实现的全栈开发
2. **现代化技术栈**: Next.js 16 + Drizzle ORM + Neon
3. **生产级特性**: 密码加密、会话管理、错误处理
4. **优秀用户体验**: 响应式设计、主题切换、实时反馈
5. **数据持久化**: 真实数据库存储，不是本地存储

## 测试验证

✅ 数据库连接正常
✅ 表结构创建成功
✅ 用户注册功能
✅ 用户登录功能
✅ 睡眠记录存储
✅ 数据查询展示
✅ 页面渲染正常

## 部署说明

项目已配置好环境变量，可直接部署到 Vercel:
```bash
npm run build
npm start
```

## 学习收获

1. 掌握 Drizzle ORM 的使用
2. 理解 Next.js App Router
3. 学习 Neon 数据库云服务
4. 实现完整的用户认证流程
5. 前后端数据交互实践

---

**开发时间**: 2026-01-04
**项目路径**: `/Users/lihao/Documents/project-template-student/ch6-homework-2/`
