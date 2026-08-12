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

交互式 3D 地球仪（react-globe.gl）+ 自建 Cloudflare Worker 统计后端
（`cloudflare-worker/worker.js`，城市级访客位置与访问量，数据完全自有）。

**启用实时统计（一次性，约 10 分钟）：**

1. 注册 Cloudflare 免费账号 → Workers & Pages → Create Worker
2. 粘贴 `cloudflare-worker/worker.js` 全部代码，Deploy
3. Worker Settings → Bindings → 添加 KV Namespace，变量名必须为 `VISITOR_KV`
4. 复制 Worker URL（形如 `https://xxx.<you>.workers.dev`）
5. 两处配置该地址（不带末尾斜杠）：
   - 本地：项目根目录 `.env` 加 `VITE_VISITOR_API=<Worker URL>`
   - CI：GitHub 仓库 → Settings → Secrets and variables → Actions →
     **Variables** → 新建 `VITE_VISITOR_API`
6. push 一次触发重新部署，地球仪即切换为真实数据

未配置时地球仪显示 `src/data/profile.ts` 中 `visitorPoints` 的演示数据；
配置后每次页面访问都会调用 `GET /stats?hit=1` 记录并返回最新统计。
第三方挂件（MapMyVisitors/ClustrMaps）已因服务端瘫痪弃用。

## 部署

已配置 GitHub Actions（`.github/workflows/deploy.yml`），
push 到 `main` 分支即自动构建并部署到 GitHub Pages：

```bash
git add .
git commit -m "update"
git push
```

访问地址：https://GuanRunwei.github.io
