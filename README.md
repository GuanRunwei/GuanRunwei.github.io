# Runwei Guan — Academic Homepage

基于 al-folio 经典学术主页风格，使用 React + TypeScript + Vite + Tailwind CSS 构建。
访客地球仪使用 [react-globe.gl](https://globe.gl)（three.js）+ MapMyVisitors 实时挂件。

## 本地预览

```bash
npm install
npm run dev            # http://localhost:3000
npm run build          # 产物在 dist/，为纯静态站点
```

## 内容维护

所有内容均为数据驱动，改数据文件即可：

| 文件 | 内容 |
|---|---|
| `src/data/profile.ts` | 个人简介、新闻、研究兴趣、项目、合作者、学术服务、访客数据 |
| `src/data/publications.ts` | 全部论文（`selected: true` 表示精选） |

引用数、h-index 等统计请定期对照 Google Scholar 手动更新
（Scholar 无公开 API，第三方抓取易被封）。

## 访客地球仪

页面包含两个地球仪：

1. **MapMyVisitors 实时挂件**（页面顶部，iframe 隔离加载）：
   真实统计每位访客的位置，无需任何维护。管理后台：https://www.mapmyvisitors.com
2. **交互式 3D 地球仪**（react-globe.gl）：默认显示
   `src/data/profile.ts` 中 `visitorPoints` 的演示数据。
   如需切换为实时数据，写一个定时脚本从分析服务（如 GoatCounter /
   Cloudflare Web Analytics）导出按城市聚合的 JSON：
   ```json
   [{ "city": "Guangzhou", "country": "China", "lat": 23.13, "lng": 113.26, "visits": 486 }]
   ```
   然后在项目根目录创建 `.env`：
   ```
   VITE_VISITOR_API=https://你的域名/visitors.json
   ```
   重新构建后自动切换（拉取失败时回退演示数据）。

## 部署

已配置 GitHub Actions（`.github/workflows/deploy.yml`），
push 到 `main` 分支即自动构建并部署到 GitHub Pages：

```bash
git add .
git commit -m "update"
git push
```

访问地址：https://GuanRunwei.github.io
