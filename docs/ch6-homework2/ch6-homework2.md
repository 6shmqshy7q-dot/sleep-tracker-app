# CH6（下）实操作业 - 数据库与Web应用对接

## 一、对接项目说明

### 1. 选择的项目
自有Next.js用户认证项目（基于Next.js App Router构建，用于练习数据库对接与用户认证）

### 2. 实现的核心功能
- 用户认证：集成Neon Auth（兼容NextAuth）实现邮箱/密码注册、登录、退出功能；
- 数据存储：用户注册时，将用户名、加密后的密码、邮箱等信息写入Neon PostgreSQL数据库；
- 数据读取：用户登录后，从数据库读取并展示用户信息，也可通过API接口查询所有用户数据；
- 持久化验证：页面刷新后，登录状态和用户数据仍保留，验证数据持久化存储生效。

### 3. 使用的技术栈
- 前端/后端框架：Next.js (App Router)
- 数据库：Neon PostgreSQL（云原生PostgreSQL）
- ORM工具：Drizzle ORM（数据库结构管理与数据交互）
- 认证工具：NextAuth.js（兼容Neon Auth）
- 密码安全：bcrypt（密码加密存储）
- 环境管理：.env/.env.local（环境变量配置）

## 二、使用的AI模型/工具
AI Coding Plan：Claude Code v2.0.55
- 辅助完成Neon数据库连接配置、Drizzle Schema定义；
- 修复React Hooks顺序报错问题，优化组件架构；
- 编写数据库交互API接口，验证数据读写功能；
- 整理项目结构与作业提交文档。

## 三、核心验证结果
✅ 数据库连接：DATABASE_URL配置成功，Drizzle ORM与Neon数据库对接正常；
✅ 用户认证：邮箱/密码注册、登录、退出功能全流程正常；
✅ 数据交互：用户数据成功写入Neon数据库，读取/展示功能正常；
✅ 持久化：页面刷新后，登录状态和数据库数据均保留，持久化验证通过。
