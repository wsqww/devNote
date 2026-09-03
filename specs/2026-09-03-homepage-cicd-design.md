# devNote 现代化：Home 首页 + GitHub Pages 官方 CI/CD

- 日期：2026-09-03
- 状态：已获用户批准（方案 A）
- 参考：`/Users/wsq/Code/WSQ/agent-journey`（同栈 VitePress 1.6，首页与部署已验证）

## 背景与目标

devNote 刚完成 VuePress 1 → VitePress 1.6.4 迁移。现状：

- 首页 `docs/index.md` 只有两行文字，是普通文档页，无导航价值。
- 部署链路陈旧：`.github/workflows/blank.yml` 用第三方 Action（JamesIves）+ `ACCESS_TOKEN` PAT 推 gh-pages 分支；另有本地 `deploy.sh` 手动推送。
- gh-pages 分支上有过期 CNAME `blog.shuaiqiang.wang`，而仓库 Pages 设置里的真实域名为 `devnote.shuaiqiang.wang`（已用 curl 验证：github.io/devNote 301 → devnote.shuaiqiang.wang）。

目标：仿照 agent-journey 增加 VitePress `layout: home` 首页；改为官方 Pages Actions 部署（OIDC 免 PAT）；顺带加本地全文搜索与返回顶部按钮。域名保留 `devnote.shuaiqiang.wang`。

非目标（YAGNI）：不做自定义 Vue 首页组件、动态统计卡片、评论系统、自动侧边栏扫描（现有手工 sidebar 保留）。

## 改动设计

### 1. 首页 `docs/index.md`（重写）

frontmatter 采用 `layout: home`，内容初稿（用户后续可改）：

- hero：
  - `name`: 开发笔记
  - `text`: 把踩过的坑变成可复用的笔记
  - `tagline`: Angular · Vue · React · JavaScript · NodeJs · WebRTC —— 记录问题、总结方法，附可直接运行的在线 Demo。
  - actions：`开始阅读 →`（brand，link `/Vue/`）、`面试题`（alt，link `/Face/`）、`GitHub`（alt，外链仓库）
- features：8 张卡片，图标 + 标题 + 一句话描述，对应现有分类——
  - 🅰️ Angular（搭建/组件/路由/拦截器/RxJs 等 11 篇）
  - 🖼️ Vue（项目搭建与资源优化）
  - ⚛️ React（入门与实践）
  - 🟨 JavaScript（文件操作、手写代码、深拷贝、去重、懒加载等）
  - 🟩 NodeJs（终端打印、交互提示、文件操作）
  - 📹 WebRTC（摄像头/麦克风/屏幕录制，附在线 Demo）
  - 🎭 隐写术（文字隐写，附在线 Demo）
  - 📝 面试题（CSS / JS 高频题整理）

home 布局自带大屏排版与暗色适配，不显示侧边栏；nav 保持不变。

### 2. 本地全文搜索（`docs/.vitepress/config.mts`）

`themeConfig.search.provider: 'local'`，构建时生成索引、无外部服务；按钮/弹层中文翻译照搬 agent-journey 配置。

### 3. 返回顶部（新建 `docs/.vitepress/theme/`）

- `theme/index.ts`：`extends DefaultTheme`，`Layout` 往 `layout-bottom` 插槽挂 `BackToTop`。
- `theme/components/BackToTop.vue`：从 agent-journey 移植（49 行：滚动阈值出现、平滑滚回），样式内联在组件内，不引入其 188 行 custom.css。

### 4. CI/CD：删 `.github/workflows/blank.yml`，新建 `.github/workflows/deploy.yml`

照搬 agent-journey 的 `deploy-site.yml` 结构：

- 触发：push master + `workflow_dispatch`
- `permissions: { contents: read, pages: write, id-token: write }`（OIDC，免 PAT）
- `concurrency: { group: pages, cancel-in-progress: false }`
- build job：checkout → setup-node（**Node 22**，与本地 v22.22.2 一致，`cache: npm`）→ configure-pages（`enablement: true`）→ `npm ci` → `npm run docs:build` → upload-pages-artifact（`docs/.vitepress/dist`）
- deploy job：`needs: build`，actions/deploy-pages@v4

替代原 workflow 的三处升级：第三方 Action + PAT → 官方 OIDC；`npm install` → `npm ci`；无并发控制 → concurrency 队列。

### 5. 域名自愈保险：新建 `docs/public/CNAME`

内容一行：`devnote.shuaiqiang.wang`。随构建产物落盘，域名配置意外重置时可自动纠正（`docs/public` 下的文件会被原样拷贝到 dist 根）。

### 6. 清理：删 `deploy.sh` + `package.json` 的 `scripts.deploy`

CI 取代本地推送；本地开发预览保留 `docs:dev` / `docs:preview`。

## 一次性手动步骤（合并后）

1. 仓库 Settings → Pages → Source 从 "Deploy from a branch" 切为 **"GitHub Actions"**（API 无法替已存在的 legacy source 自动切换；configure-pages 的 enablement 仅在 Pages 未启用时生效）。
2. 首次部署成功后：删除 gh-pages 分支（可选）；吊销 `ACCESS_TOKEN` PAT（可选但建议）。

DNS 无需改动（devnote.shuaiqiang.wang 已指向 GitHub Pages 并验证生效）。

## 风险与边界

- **Source 切换窗口**：切换到 "GitHub Actions" 后、deploy.yml 首次跑通前，线上 404。当前线上本就 404（迁移后未部署成功），无回退损失。
- **死链**：首页 links 全部指向现有路由，构建时 VitePress 死链检查兜底。
- **npm ci**：项目 lock 已重建且配置 npmmirror（记忆确认），CI 用官方 registry 无碍；lock 与 package.json 不同步时 `npm ci` 会显式报错，属预期保护。

## 验证清单

- 本地 `npm run docs:build` 零报错、`docs:preview` 首页/搜索/返回顶部可用。
- push 后 Actions 全绿，devnote.shuaiqiang.wang 首页为 home 布局。
- 连续两次 push，第二个 run 排队而非并行发布（concurrency 生效）。
