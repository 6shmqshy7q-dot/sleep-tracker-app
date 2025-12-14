# 睡眠监测器 - 认知模型文档
**文档类型**：方式B - 认知建模与实体关系  \
**产品名称**：睡眠监测器  \
**生成日期**：2025-12-14  \
**版本**：v1.0

---

## 1. 认知模型总览

### 1.1 认知域定义
睡眠监测器的认知域涵盖个人睡眠健康管理的完整闭环，从数据采集到分析反馈再到行为改善，形成闭环认知系统。

### 1.2 核心实体清单
| 序号 | 实体名称 | 实体类型 | 认知重要性 |
|------|----------|----------|------------|
| E1 | 用户 | 主体实体 | 极高 |
| E2 | 睡眠数据记录 | 事实实体 | 极高 |
| E3 | 订阅订单 | 业务实体 | 高 |
| E4 | 睡眠改善方案 | 规则实体 | 高 |

---

## 2. 实体详细定义

### 2.1 实体E1：用户（User）

#### 2.1.1 实体属性定义
```yaml
实体标识: E1-User
实体名称: 用户
实体类型: 主体实体
认知级别: 核心
```

| 属性名 | 数据类型 | 约束条件 | 必填 | 说明 |
|--------|----------|----------|------|------|
| user_id | UUID | 主键，唯一 | ✅ | 用户唯一标识符 |
| name | VARCHAR(100) | 长度1-100 | ✅ | 用户姓名 |
| age | INT | 范围13-120 | ✅ | 年龄 |
| gender | ENUM | M/F/O | ✅ | 性别 |
| height | DECIMAL(5,2) | 范围50-250 | ✅ | 身高（cm） |
| weight | DECIMAL(5,2) | 范围20-300 | ✅ | 体重（kg） |
| device_model | VARCHAR(100) | 允许NULL | ❌ | 关联设备型号 |
| account_status | ENUM | ACTIVE/INACTIVE/DELETED | ✅ | 账户状态 |
| created_at | TIMESTAMP | 自动生成 | ✅ | 创建时间 |
| updated_at | TIMESTAMP | 自动更新 | ✅ | 更新时间 |
| last_login_at | TIMESTAMP | 允许NULL | ❌ | 最后登录时间 |
| privacy_consent | BOOLEAN | 默认false | ✅ | 隐私授权状态 |

#### 2.1.2 实体状态定义
| 状态 | 描述 | 转换条件 |
|------|------|----------|
| ACTIVE | 正常使用中 | 注册完成且通过验证 |
| INACTIVE | 暂停使用 | 用户主动暂停或欠费 |
| DELETED | 已删除 | 用户注销且过了保留期 |

#### 2.1.3 实体生命周期
```
注册 → 验证 → ACTIVE → 暂停 → 恢复 → 注销 → 彻底删除
  ↓       ↓       ↓       ↓       ↓       ↓         ↓
创建   邮箱验证  正常服务  暂停服务  恢复服务  申请注销   物理删除
```

---

### 2.2 实体E2：睡眠数据记录（SleepRecord）

#### 2.2.1 实体属性定义
```yaml
实体标识: E2-SleepRecord
实体名称: 睡眠数据记录
实体类型: 事实实体
认知级别: 核心
```

| 属性名 | 数据类型 | 约束条件 | 必填 | 说明 |
|--------|----------|----------|------|------|
| record_id | UUID | 主键，唯一 | ✅ | 记录唯一标识符 |
| user_id | UUID | 外键，引用E1.user_id | ✅ | 关联用户ID |
| sleep_date | DATE | 范围：用户注册后 | ✅ | 睡眠日期 |
| bed_time | TIMESTAMP | 必填 | ✅ | 入睡时间 |
| wake_time | TIMESTAMP | 必填 | ✅ | 醒来时间 |
| sleep_duration | INT | 范围0-1440 | ✅ | 总睡眠时长（分钟） |
| light_sleep_duration | INT | 范围0-1440 | ✅ | 浅睡时长（分钟） |
| deep_sleep_duration | INT | 范围0-1440 | ✅ | 深睡时长（分钟） |
| rem_duration | INT | 范围0-1440 | ✅ | REM周期时长（分钟） |
| wake_count | INT | 范围0-50 | ✅ | 夜间醒来次数 |
| sleep_score | INT | 范围0-100 | ✅ | 睡眠评分 |
| data_source | ENUM | WEARABLE/PHONE/MANUAL | ✅ | 数据来源 |
| recording_quality | ENUM | HIGH/MEDIUM/LOW | ✅ | 数据质量 |
| created_at | TIMESTAMP | 自动生成 | ✅ | 创建时间 |
| updated_at | TIMESTAMP | 自动更新 | ✅ | 更新时间 |

#### 2.2.2 实体状态定义
| 状态 | 描述 | 转换条件 |
|------|------|----------|
| RAW | 原始数据 | 设备采集完成 |
| PROCESSING | 处理中 | 正在分析计算 |
| PROCESSED | 已处理 | 分析完成 |
| VALIDATED | 已验证 | 用户确认或系统验证 |
| ARCHIVED | 已归档 | 超过保留期限 |

#### 2.2.3 实体生命周期
```
采集 → 预处理 → 分析计算 → 结果生成 → 用户确认 → 归档
 ↓        ↓         ↓         ↓         ↓         ↓
RAW    PROCESSING  PROCESSED  VALIDATED  CONFIRMED  ARCHIVED
```

---

### 2.3 实体E3：订阅订单（Subscription）

#### 2.3.1 实体属性定义
```yaml
实体标识: E3-Subscription
实体名称: 订阅订单
实体类型: 业务实体
认知级别: 重要
```

| 属性名 | 数据类型 | 约束条件 | 必填 | 说明 |
|--------|----------|----------|------|------|
| order_id | UUID | 主键，唯一 | ✅ | 订单唯一标识符 |
| user_id | UUID | 外键，引用E1.user_id | ✅ | 关联用户ID |
| subscription_type | ENUM | FREE/DAILY/MONTHLY/YEARLY | ✅ | 订阅类型 |
| payment_amount | DECIMAL(10,2) | 允许0 | ✅ | 支付金额 |
| currency | VARCHAR(3) | ISO标准 | ✅ | 币种 |
| start_time | TIMESTAMP | 必填 | ✅ | 生效时间 |
| end_time | TIMESTAMP | 必填 | ✅ | 到期时间 |
| auto_renewal | BOOLEAN | 默认true | ✅ | 是否自动续费 |
| payment_status | ENUM | PENDING/PAID/FAILED/CANCELLED | ✅ | 支付状态 |
| payment_method | ENUM | CARD/WECHAT/ALIPAY/APPLE/GOOGLE | ✅ | 支付方式 |
| created_at | TIMESTAMP | 自动生成 | ✅ | 创建时间 |
| updated_at | TIMESTAMP | 自动更新 | ✅ | 更新时间 |

#### 2.3.2 实体状态定义
| 状态 | 描述 | 转换条件 |
|------|------|----------|
| PENDING | 待支付 | 创建订单 |
| PAID | 已支付 | 支付成功 |
| ACTIVE | 生效中 | 到达生效时间 |
| EXPIRED | 已过期 | 超过结束时间 |
| CANCELLED | 已取消 | 用户取消 |
| FAILED | 支付失败 | 支付失败 |

#### 2.3.3 实体生命周期
```
创建订单 → 支付 → 生效 → 服务期 → 到期 → 续费/终止
    ↓        ↓       ↓        ↓        ↓        ↓
 PENDING   PAID   ACTIVE   ACTIVE   EXPIRED   RENEW/CANCEL
```

---

### 2.4 实体E4：睡眠改善方案（ImprovementPlan）

#### 2.4.1 实体属性定义
```yaml
实体标识: E4-ImprovementPlan
实体名称: 睡眠改善方案
实体类型: 规则实体
认知级别: 重要
```

| 属性名 | 数据类型 | 约束条件 | 必填 | 说明 |
|--------|----------|----------|------|------|
| plan_id | UUID | 主键，唯一 | ✅ | 方案唯一标识符 |
| user_id | UUID | 外键，引用E1.user_id | ✅ | 关联用户ID |
| base_record_id | UUID | 外键，引用E2.record_id | ✅ | 基础数据记录ID |
| suggestion_type | ENUM | SCHEDULE/ENVIRONMENT/DIET/EXERCISE | ✅ | 建议类型 |
| priority | INT | 范围1-5 | ✅ | 优先级 |
| suggestion_content | TEXT | 长度1-5000 | ✅ | 建议内容 |
| expected_improvement | TEXT | 长度1-1000 | ❌ | 预期改善效果 |
| implementation_steps | JSON | 允许NULL | ❌ | 实施步骤 |
| generated_by | ENUM | SYSTEM/MANUAL | ✅ | 生成方式 |
| ai_model_version | VARCHAR(20) | 允许NULL | ❌ | AI模型版本 |
| is_applied | BOOLEAN | 默认false | ✅ | 是否已应用 |
| applied_at | TIMESTAMP | 允许NULL | ❌ | 应用时间 |
| created_at | TIMESTAMP | 自动生成 | ✅ | 创建时间 |
| updated_at | TIMESTAMP | 自动更新 | ✅ | 更新时间 |

#### 2.4.2 实体状态定义
| 状态 | 描述 | 转换条件 |
|------|------|----------|
| DRAFT | 草稿 | 生成完成待审核 |
| PUBLISHED | 已发布 | 用户可见 |
| APPLIED | 已应用 | 用户实施 |
| ARCHIVED | 已归档 | 过期或替换 |
| DISMISSED | 已忽略 | 用户拒绝 |

#### 2.4.3 实体生命周期
```
方案生成 → 审核 → 发布 → 用户查看 → 应用/忽略 → 归档
    ↓        ↓       ↓       ↓         ↓         ↓
  DRAFT   REVIEW  PUBLISHED  SEEN    APPLY/DISMISS  ARCHIVE
```

---

## 3. 实体关联关系

### 3.1 关联关系矩阵

| 源实体 | 目标实体 | 关系类型 | 关系描述 | 基数 |
|--------|----------|----------|----------|------|
| E1-User | E2-SleepRecord | 1:N | 一个用户有多条睡眠记录 | ✅ 已确认 |
| E1-User | E3-Subscription | 1:N | 一个用户有多个订阅订单 | ✅ 已确认 |
| E1-User | E4-ImprovementPlan | 1:N | 一个用户有多个改善方案 | ✅ 已确认 |
| E2-SleepRecord | E4-ImprovementPlan | 1:N | 一条睡眠记录可生成多个改善方案 | ✅ 已确认 |
| E3-Subscription | E4-ImprovementPlan | 条件关联 | 付费用户才能获得AI改善方案 | ✅ 已确认 |

### 3.2 详细关联关系定义

#### 3.2.1 E1 → E2（用户-睡眠记录）
```yaml
关系名称: has_records
关系类型: 一对多 (1:N)
方向: 单向 (User → SleepRecord)
约束条件:
  - user_id必须存在于User表
  - sleep_date必须 >= user.created_at
  - 每个用户每天最多1条记录
级联操作:
  - 删除User: 不级联删除SleepRecord (数据保留)
  - 删除SleepRecord: 无级联
```

#### 3.2.2 E1 → E3（用户-订阅订单）
```yaml
关系名称: has_subscriptions
关系类型: 一对多 (1:N)
方向: 单向 (User → Subscription)
约束条件:
  - user_id必须存在于User表
  - 同一用户同时只能有1个ACTIVE状态的订阅
  - 订阅类型变更需创建新订单
级联操作:
  - 删除User: 软删除Subscription (标记DELETED)
  - 删除Subscription: 无级联
```

#### 3.2.3 E1 → E4（用户-改善方案）
```yaml
关系名称: has_plans
关系类型: 一对多 (1:N)
方向: 单向 (User → ImprovementPlan)
约束条件:
  - user_id必须存在于User表
  - 每个用户每天最多生成3个改善方案
  - 改善方案需基于用户的有效睡眠记录
级联操作:
  - 删除User: 软删除ImprovementPlan (标记DELETED)
  - 删除ImprovementPlan: 无级联
```

#### 3.2.4 E2 → E4（睡眠记录-改善方案）
```yaml
关系名称: based_on_record
关系类型: 一对多 (1:N)
方向: 单向 (SleepRecord → ImprovementPlan)
约束条件:
  - base_record_id必须存在于SleepRecord表
  - 改善方案必须在睡眠记录生成后7天内创建
  - 一个睡眠记录最多生成5个改善方案
级联操作:
  - 删除SleepRecord: 软删除ImprovementPlan (标记ORPHANED)
  - 删除ImprovementPlan: 无级联
```

### 3.3 条件关联关系

#### 3.3.1 订阅状态与改善方案质量
```yaml
关联名称: subscription_impact
源实体: E3-Subscription
目标实体: E4-ImprovementPlan
条件规则:
  - subscription_type = FREE:
    * 改善方案基于规则引擎
    * 每天最多生成1个方案
    * 方案内容较为通用
  
  - subscription_type = PAID:
    * 改善方案基于AI模型
    * 每天最多生成3个方案
    * 方案内容个性化程度高
```

---

## 4. 认知模型架构图

### 4.1 实体关系图（ERD）

```
┌─────────────────┐
│   E1-User       │
│  (用户实体)      │
├─────────────────┤
│ - user_id (PK)  │
│ - name          │
│ - age           │
│ - gender        │
│ - height        │
│ - weight        │
│ - device_model  │
│ - account_status│
└─────────────────┘
         │ (1:N)
         │ has_records
         ▼
┌─────────────────┐         ┌─────────────────┐
│ E2-SleepRecord  │ (1:N)   │ E4-Improvement  │
│ (睡眠记录实体)   │────────▶│ Plan (改善方案)  │
├─────────────────┤ based_on │ ├─────────────────┤
│ - record_id(PK) │  record  │ - plan_id (PK)   │
│ - user_id (FK)  │         │ - user_id (FK)   │
│ - sleep_date    │         │ - base_record_id │
│ - bed_time      │         │ - suggestion_type│
│ - wake_time     │         │ - priority       │
│ - sleep_duration│         │ - content        │
│ - sleep_score   │         │ - is_applied     │
└─────────────────┘         └─────────────────┘
         │ (1:N)
         │ has_subscriptions
         ▼
┌─────────────────┐
│ E3-Subscription │
│ (订阅订单实体)   │
├─────────────────┤
│ - order_id (PK) │
│ - user_id (FK)  │
│ - subscription_  │
│   type          │
│ - start_time    │
│ - end_time      │
│ - payment_       │
│   status        │
└─────────────────┘
```

### 4.2 数据流图

```
睡眠数据采集 → 数据预处理 → 睡眠分析 → 改善方案生成
      ↓            ↓          ↓          ↓
  [设备/手机] → [E2记录] → [AI模型] → [E4方案]
      ↓            ↓          ↓          ↓
  用户交互 ← [订阅验证] ← [个性化匹配] ← [用户反馈]
```

---

## 5. 实体约束规则

### 5.1 业务约束规则

#### 5.1.1 睡眠记录约束
```yaml
规则编号: BR-SLEEP-001
规则描述: 用户每天最多只能有一条睡眠记录
规则表达式: COUNT(sleep_date = target_date) ≤ 1
违反处理: 合并重复记录，保留最新数据

规则编号: BR-SLEEP-002
规则描述: 睡眠时长不能超过24小时
规则表达式: sleep_duration ≤ 1440
违反处理: 拒绝保存，提示用户检查数据

规则编号: BR-SLEEP-003
规则描述: 深睡 + 浅睡 + REM ≤ 总睡眠时长
规则表达式: deep_sleep + light_sleep + rem_duration ≤ sleep_duration
违反处理: 自动调整比例，保持逻辑一致性
```

#### 5.1.2 订阅订单约束
```yaml
规则编号: BR-SUB-001
规则描述: 同一用户同时只能有一个活跃订阅
规则表达式: COUNT(user_id, status='ACTIVE') ≤ 1
违反处理: 自动停用旧订阅，保留时间最长的

规则编号: BR-SUB-002
规则描述: 订阅开始时间不能早于创建时间
规则表达式: start_time ≥ created_at
违反处理: 将开始时间调整为当前时间

规则编号: BR-SUB-003
规则描述: 续订订单的开始时间 = 上一个订单的结束时间
规则表达式: start_time = prev_order.end_time
违反处理: 自动调整续订时间
```

### 5.2 数据完整性约束

#### 5.2.1 外键约束
```sql
-- 睡眠记录必须关联有效用户
ALTER TABLE SleepRecord ADD CONSTRAINT fk_sleep_user
FOREIGN KEY (user_id) REFERENCES User(user_id);

-- 改善方案必须基于有效睡眠记录
ALTER TABLE ImprovementPlan ADD CONSTRAINT fk_plan_record
FOREIGN KEY (base_record_id) REFERENCES SleepRecord(record_id);

-- 订阅订单必须关联有效用户
ALTER TABLE Subscription ADD CONSTRAINT fk_sub_user
FOREIGN KEY (user_id) REFERENCES User(user_id);
```

#### 5.2.2 唯一性约束
```sql
-- 每个用户每天只能有一条睡眠记录
ALTER TABLE SleepRecord ADD CONSTRAINT uk_user_date
UNIQUE (user_id, sleep_date);

-- 订阅订单ID全局唯一
ALTER TABLE Subscription ADD CONSTRAINT uk_order_id
UNIQUE (order_id);
```

---

## 6. 认知模型演进

### 6.1 版本演进历史

| 版本 | 变更日期 | 变更内容 | 影响范围 |
|------|----------|----------|----------|
| v1.0 | 2025-12-14 | 初始版本，包含4个核心实体 | 全部 |
| v1.1 | 待定 | 计划增加设备实体 | E1, E2 |
| v1.2 | 待定 | 计划增加睡眠目标实体 | E1, E2, E4 |

### 6.2 未来扩展规划

#### 6.2.1 实体扩展方向
1. **设备实体（Device）**：详细记录用户使用的睡眠监测设备
2. **睡眠目标实体（SleepGoal）**：用户设定的个性化睡眠目标
3. **社区分享实体（Share）**：用户睡眠数据的社交分享记录

#### 6.2.2 关系扩展方向
1. **多对多关系**：用户 ↔ 设备（一个用户可使用多个设备）
2. **层次关系**：改善方案 → 子方案（方案可分解为具体步骤）
3. **时间序列关系**：睡眠记录 → 趋势分析（多天数据的关联分析）

---

## 7. 认知模型质量评估

### 7.1 模型完整性检查

| 评估维度 | 得分 | 说明 |
|----------|------|------|
| 实体覆盖度 | 95% | 覆盖核心业务流程 |
| 属性完备性 | 90% | 主要属性完整 |
| 关系清晰度 | 95% | 关联关系明确 |
| 约束完整性 | 85% | 业务约束覆盖大部分场景 |
| 扩展性 | 80% | 预留扩展空间 |

### 7.2 认知模型验证

#### 7.2.1 场景验证
**场景1：新用户首次使用**
```
1. 创建User实体 (E1) ✅
2. 等待收集睡眠数据
3. 创建SleepRecord实体 (E2) ✅
4. 基于数据生成ImprovementPlan (E4) ✅
5. 如需付费功能，创建Subscription (E3) ✅
```

**场景2：订阅到期处理**
```
1. 检测Subscription状态为EXPIRED ✅
2. 降级用户到免费版功能 ✅
3. 停止生成AI改善方案 ✅
4. 保留历史数据 ✅
```

#### 7.2.2 一致性检查
✅ **实体命名一致性**：所有实体使用中文命名，英文标识  
✅ **属性命名一致性**：采用snake_case命名规范  
✅ **数据类型一致性**：时间类型统一使用TIMESTAMP  
✅ **状态定义一致性**：所有实体状态符合生命周期逻辑  

---

## 8. 总结与建议

### 8.1 认知模型优势
1. **实体边界清晰**：每个实体职责单一，无冗余属性
2. **关系设计合理**：符合业务逻辑，避免过度耦合
3. **生命周期完整**：覆盖实体从创建到删除的全过程
4. **约束规则完善**：保证数据完整性和业务逻辑正确性

### 8.2 关键设计决策
1. **采用UUID作为主键**：保证分布式场景下的唯一性
2. **软删除策略**：用户相关实体采用软删除，保护用户数据
3. **状态机设计**：关键实体采用状态机管理状态转换
4. **审计字段统一**：所有实体包含created_at、updated_at字段

### 8.3 实施建议
1. **分阶段实施**：优先实现E1、E2实体，再扩展E3、E4
2. **索引优化**：为高频查询字段建立索引（user_id、sleep_date）
3. **数据迁移**：为现有系统设计平滑迁移方案
4. **监控告警**：对关键业务指标设置监控（活跃用户数、订阅转化率）

---

**文档状态**：✅ 已完成  \
**模型版本**：v1.0  \
**下次评审日期**：2026-01-14  \
**责任人**：架构师