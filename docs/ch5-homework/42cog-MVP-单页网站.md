# 42cog MVP落地（ch4：单页版个人网站 v1.0）
## 1. MVP定义（阳老师42cog：最小可行、快速验证）
仅保留ch3定义的核心模块，不做任何冗余开发，能跑通即可。

## 2. 素材溯源（全部来自ch3）
| 模块       | 对应ch3文件（ch4目录内） | 核心复用内容                  |
|------------|--------------------------|-------------------------------|
| 页面内容   | 方式A_real.md            | 个人介绍：前端开发学习者；技能：HTML/CSS/JS；项目：极简待办清单 |
| 样式规范   | 方式A_spec.md            | 主色：#2196F3；字体：14px；行高：1.6 |
| 验证标准   | 对比分析.md              | 适配移动端、导航可点击、内容清晰 |

## 3. MVP代码实现（纯静态，复用ch3规范）
```html
<!DOCTYPE html>
<html lang="zh-CN">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>个人品牌网站（ch3落地）</title>
  <!-- 样式严格遵循ch3方式A_spec.md -->
  <style>
    * { margin: 0; padding: 0; box-sizing: border-box; }
    body { font-size: 14px; line-height: 1.6; color: #333; padding: 20px; }
    .nav { margin-bottom: 30px; }
    .nav a { color: #2196F3; text-decoration: none; margin-right: 15px; }
    .section { margin: 20px 0; }
    .section h2 { color: #2196F3; margin-bottom: 10px; }
  </style>
</head>
<body>
  <!-- 导航：基于ch3方式A_real.md的规划 -->
  <div class="nav">
    <a href="#intro">个人介绍</a>
    <a href="#skill">核心技能</a>
    <a href="#project">项目案例</a>
  </div>

  <!-- 个人介绍：直接复用ch3方式A_real.md内容 -->
  <div id="intro" class="section">
    <h2>个人介绍</h2>
    <p>前端开发学习者，专注极简产品设计</p>
  </div>

  <!-- 核心技能：复用ch3方式A_real.md -->
  <div id="skill" class="section">
    <h2>核心技能</h2>
    <p>HTML5/CSS3/JavaScript</p>
  </div>

  <!-- 项目案例：复用ch3方式A_real.md -->
  <div id="project" class="section">
    <h2>项目案例</h2>
    <p>极简待办清单，适配移动端</p>
  </div>
</body>
</html>