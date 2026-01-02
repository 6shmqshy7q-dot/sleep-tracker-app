# CH6 实操作业（上）- Neon数据库创建作业
## 一、数据库设计说明
### 1. 项目信息
- 项目名称：personal-site-db
- PostgreSQL版本：17
- 区域：新加坡（Singapore）
- 用途：个人网站留言功能数据存储

### 2. 表结构设计
表名：`messages`（存储用户留言信息）
| 字段名       | 类型                | 约束         | 用途说明                     |
|--------------|---------------------|--------------|------------------------------|
| id           | SERIAL              | PRIMARY KEY  | 留言唯一标识（自增）|
| name         | VARCHAR(255)        | NOT NULL     | 留言人姓名                   |
| email        | VARCHAR(255)        | 可选         | 留言人邮箱（用于回复）|
| content      | TEXT                | NOT NULL     | 留言内容                     |
| created_at   | TIMESTAMP           | DEFAULT NOW()| 留言创建时间（自动生成）|
| is_read      | BOOLEAN             | DEFAULT FALSE| 留言是否已读（默认未读）|

### 3. 安全配置
- 连接字符串存储在`.env`文件中，避免明文泄露
- `.env`已添加到`.gitignore`，防止提交到Git仓库

## 二、遇到的问题及解决方案
| 问题现象                                  | 解决方案                                                                 |
|-------------------------------------------|--------------------------------------------------------------------------|
| neonctl授权失败，提示证书错误+API Key格式不对 | 1. 放弃neonctl，直接用psql连接数据库操作；2. 明确API Key是`sk_live_`开头，而非连接字符串片段 |
| 安装postgresql-client提示包不存在          | 使用Homebrew安装`libpq`替代，获取psql客户端工具                          |
| psql命令执行提示找不到路径                | 将libpq的bin目录添加到系统PATH，确保psql全局可用                          |
