# AGENTS.md

本文件供 AI 智能体在本仓库工作时参考。通用规则见全局 `~/.zcode/AGENTS.md`,此处只写项目特有约定;冲突时以本文件为准。

**每次修改项目内容结束后,自查本次改动是否影响本文件所载事实(命令、目录结构、约定、部署流程等),有影响时同步更新本文件,再结束任务。**

## 项目概述

- 基于 VitePress ^1.6.4 的个人开发笔记站,2026-09 由 VuePress 1 迁移而来(设计与迁移文档见 `specs/`)。
- srcDir 为 `docs/`,部署在自定义域名根路径:https://devnote.shuaiqiang.wang(`base: '/'`)。
- 无额外运行时依赖:搜索用内置 local search;主题仅扩展 BackToTop 组件与首页样式(`docs/.vitepress/theme/`)。

## 常用命令

| 用途 | 命令 |
| --- | --- |
| 安装依赖 | `npm ci`(npm 生态,勿用 pnpm/yarn) |
| 本地开发 | `npm run docs:dev`(默认端口 5173) |
| 构建产物 | `npm run docs:build`(输出 `docs/.vitepress/dist`) |
| 本地预览构建结果 | `npm run docs:preview` |

- Node 版本 22(本地与 CI 一致)。
- npm registry 走 npmmirror 镜像(见 `.npmrc`)。

## 目录结构

```
docs/                 # VitePress srcDir,笔记内容
├── .vitepress/
│   ├── config.mts    # 站点配置:nav、sidebar、搜索等全在此
│   └── theme/        # 自定义主题:index.ts + components/BackToTop.vue + custom.css
├── public/           # 静态资源:favicon.png、CNAME、demo/(文章配套可运行 HTML)
├── index.md          # 首页(layout: home)
├── Angular/ Vue/ React/ Javascript/ NodeJs/ WebRTC/ Nginx/ ...  # 按技术栈分目录
└── Face/             # 面试题,独立 sidebar 组
specs/                # 设计/计划文档(勿放 docs/,会被当作页面构建)
```

- 每个内容目录通常有 `index.md` 作介绍页;文件名中英文混用(kebab-case 或中文),跟随所在目录现状即可。

## 关键约定(改内容必读)

1. **新增/重命名文章必须手动同步 `docs/.vitepress/config.mts` 的 `sidebar`**,否则页面不可见。sidebar 分两组:`'/Face/'` 与 `'/'`。
2. 文章一般**不写 frontmatter**(首页 `index.md` 除外),标题从 `##` 开始——页内大纲配置为 `outline.level: [3, 4]`,只收 H3/H4。
3. 文章配套的可运行 demo 放 `docs/public/demo/<分类>/xxx.html`,正文用 `<iframe src="/demo/...">` 嵌入;`base` 为 `/`,路径无需特殊处理。
4. **不要改动**:`docs/public/CNAME`(自定义域名)、`config.mts` 中的 `base: '/'`。
5. 设计/计划类文档放仓库根 `specs/`,命名 `YYYY-MM-DD-<主题>-design.md` / `-plan.md`。

## 代码风格

- 单引号、无行尾分号,遵循 `config.mts` 与 `theme/` 现有风格。
- 为函数/组件添加中文注释且紧邻代码;自定义组件类名用 `dn-` 前缀(参考 BackToTop.vue)。
- `theme/` 下的 Vue 组件须 SSR 安全:浏览器 API 只在 `onMounted` 等客户端钩子中使用。

## 部署与 Git

- **push 到 master 即自动部署**:`.github/workflows/deploy.yml` 构建并发布到 GitHub Pages(官方 Actions + OIDC),无 gh-pages 分支。
- 因此 commit/push 前务必本地 `npm run docs:build` 验证;遵循全局规则**不自动 git add/commit/push**,需用户明确授权。
- commit message:中文描述 + Conventional 前缀(`feat:` / `fix:` / `style:` / `chore:`),参考 `git log`。

## 注意事项 / 坑

- `.gitignore` 已忽略智能体/IDE 产物(`.zcode/`、`.history/`、`**/superpowers` 等),这些目录不要提交。
- 构建产物 `docs/.vitepress/dist` 与缓存 `docs/.vitepress/cache` 均已 gitignore,勿手动修改或提交。
