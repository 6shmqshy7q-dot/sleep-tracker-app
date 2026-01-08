# 🚀 智能睡眠追踪器 Pro - 部署指南

## 📋 部署前准备

### 1. 确认 Vercel 部署成功
```bash
# 访问你的 Vercel 域名（替换为实际项目名）
https://你的项目名.vercel.app

# 应该看到主页显示"欢迎使用智能睡眠追踪器 Pro"
```

### 2. 配置环境变量（Vercel → Settings → Environment Variables）
```
DATABASE_URL=postgresql://username:password@host.neon.tech/dbname?sslmode=require
NEXTAUTH_SECRET=your-random-secret-key-here
NEXTAUTH_URL=https://你的项目名.vercel.app
```

### 3. 创建数据库表
```bash
# 在浏览器中访问
https://你的项目名.vercel.app/api/create-tables

# 预期返回：Tables created successfully
```

## 🎯 完整功能演示

### 步骤 1: 用户注册/登录
1. 访问：`/auth/signup` - 注册新用户
2. 访问：`/auth/signin` - 登录已有用户

### 步骤 2: 记录睡眠数据
1. 访问：`/sleep` - 睡眠记录页面
2. 点击"添加记录"按钮
3. 填写：
   - 入睡时间（必填）
   - 起床时间（必填）
   - 睡眠质量：1-10 分（必填）
   - 环境因素（可选，JSON格式）
   - 备注（可选）

### 步骤 3: 查看数据分析
1. 访问：`/analytics` - 数据分析页面
2. 查看：
   - 总记录数、平均睡眠时长、平均睡眠质量
   - 睡眠质量趋势（改善中/下降/稳定）
   - 智能建议（基于历史数据生成）
   - 睡眠质量趋势图表
   - 详细记录列表

### 步骤 4: 导出数据
1. 在数据分析页面，点击右上角"📥 导出数据"按钮
2. 系统会自动下载：
   - CSV格式数据文件（可在Excel中打开）
   - JSON格式数据文件（便于程序处理）
3. 数据包含：入睡/起床时间、睡眠质量、睡眠时长、环境因素、备注等

### 步骤 5: 智能建议功能
- 系统会自动分析您的睡眠模式
- 提供个性化建议（如：最佳入睡时间、改善建议）
- 建议至少记录 3 天数据以获得更准确建议

## 🔧 开发命令

### 本地开发
```bash
# 安装依赖
npm install

# 启动开发服务器
npm run dev

# 构建生产版本
npm run build

# 启动生产服务器
npm start
```

### API 接口
- `POST /api/sleep/record` - 创建睡眠记录
- `GET /api/sleep/record?userId=xxx` - 获取睡眠记录列表
- `GET /api/sleep/analysis?userId=xxx&period=week` - 获取睡眠分析
- `GET /api/sleep/export?userId=xxx&format=csv` - 导出CSV数据
- `GET /api/sleep/export?userId=xxx&format=json` - 导出JSON数据
- `POST /api/auth/register` - 用户注册
- `GET /api/test-db` - 测试数据库连接

## 📱 技术栈

- **前端**：Next.js 16 + React + Tailwind CSS
- **后端**：Next.js API Routes
- **数据库**：Neon PostgreSQL + Drizzle ORM
- **认证**：NextAuth.js
- **部署**：Vercel

## 🎨 功能特性

✅ 用户认证系统（注册/登录）
✅ 睡眠数据记录
✅ 数据持久化存储
✅ 睡眠质量分析
✅ 智能睡眠建议
✅ 数据可视化图表
✅ 数据导出功能（CSV/JSON格式）
✅ 响应式设计（支持手机/平板/桌面）
✅ 实时数据同步
✅ 趋势分析（周/月/年）

## 📞 技术支持

如有问题，请检查：
1. Vercel 部署日志
2. 环境变量配置
3. 数据库连接状态
4. API 接口响应

---

## 🎉 恭喜！

你已成功完成 **RCSW 工作流**的产品研发：
- ✅ Real（现实约束）
- ✅ Cog（认知模型）
- ✅ Spec（规约文档）
- ✅ Work（实际作品）

智能睡眠追踪器 Pro 现在已部署上线！🚀
