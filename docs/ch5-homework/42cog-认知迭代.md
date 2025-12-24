# 42cog认知迭代（ch4：单页网站 v1.1）
## 1. 迭代背景（阳老师42cog：基于MVP反馈优化）
MVP验证发现“导航无高亮”，违背ch3《对比分析.md》的“用户体验优先”要求，需小步迭代优化。

## 2. 迭代目标（最小成本优化）
仅补充导航高亮交互，不修改其他内容，保持ch3的极简核心。

## 3. 迭代代码实现（复用ch3样式规范）
```html
<!DOCTYPE html>
<html lang="zh-CN">
<head>
  <!-- 保留MVP的所有样式，新增高亮样式 -->
  <style>
    /* 复用ch3方式A_spec.md的主色#2196F3 */
    .nav a.active { font-weight: bold; color: #2196F3; border-bottom: 2px solid #2196F3; }
    /* 其他样式不变 */
    * { margin: 0; padding: 0; box-sizing: border-box; }
    body { font-size: 14px; line-height: 1.6; color: #333; padding: 20px; }
    .nav { margin-bottom: 30px; }
    .nav a { color: #2196F3; text-decoration: none; margin-right: 15px; }
    .section { margin: 20px 0; }
    .section h2 { color: #2196F3; margin-bottom: 10px; }
  </style>
</head>
<body>
  <div class="nav">
    <a href="#intro" onclick="setActive(this)">个人介绍</a>
    <a href="#skill" onclick="setActive(this)">核心技能</a>
    <a href="#project" onclick="setActive(this)">项目案例</a>
  </div>

  <!-- 保留所有MVP的内容模块 -->
  <div id="intro" class="section">
    <h2>个人介绍</h2>
    <p>前端开发学习者，专注极简产品设计</p>
  </div>
  <div id="skill" class="section">
    <h2>核心技能</h2>
    <p>HTML5/CSS3/JavaScript</p>
  </div>
  <div id="project" class="section">
    <h2>项目案例</h2>
    <p>极简待办清单，适配移动端</p>
  </div>

  <!-- 新增极简交互：导航高亮（符合ch3体验要求） -->
  <script>
    // 阳老师42cog：小步迭代，仅实现核心交互
    function setActive(elem) {
      // 移除所有高亮
      document.querySelectorAll('.nav a').forEach(link => {
        link.classList.remove('active');
      });
      // 给点击的导航加高亮
      elem.classList.add('active');
    }
    // 默认选中第一个导航
    document.querySelector('.nav a').classList.add('active');
  </script>
</body>
</html>