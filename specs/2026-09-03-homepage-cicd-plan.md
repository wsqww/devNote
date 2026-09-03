# devNote 现代化（Home 首页 + 官方 CI/CD）实现计划

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** 为 devNote 增加 VitePress `layout: home` 首页、本地搜索、返回顶部按钮，并把部署切换为官方 GitHub Pages Actions（免 PAT）。

**Architecture:** 纯配置/内容层改动，无新增 npm 依赖。首页是带 frontmatter 的 markdown；搜索与回顶按钮分别来自 VitePress 内置能力和一个 49 行的默认主题插槽组件；CI 用官方 `configure-pages/upload-pages-artifact/deploy-pages` 三件套 + OIDC。

**Tech Stack:** VitePress 1.6.4、Node 22、GitHub Actions（官方 Pages actions v4/v5）。

**设计文档:** `specs/2026-09-03-homepage-cicd-design.md`（本计划的任务与其第 1–6 节一一对应）

## Global Constraints

- 零新增 npm 依赖；Node 本地版本 v22.22.2，CI 用 22。
- `base: '/'` 不变；域名固定 `devnote.shuaiqiang.wang`。
- nav / sidebar / 现有文档内容一律不动。
- config.mts 沿用现有风格：单引号、无行尾分号、中文注释紧邻代码。
- 按 AGENTS.md：**不自动 git add/commit/push**；Task 7 的提交命令需用户明确授权后才执行。
- 计划与设计文档放仓库根 `specs/`（`docs/` 是 VitePress srcDir，不能放）。

---

### Task 1: 首页 home 布局

**Files:**
- Modify: `docs/index.md`（整文件重写，原两行占位内容由首页取代）

**Interfaces:**
- Produces: 首页路由 `/`（VitePress 死链检查依赖的 `/Vue/`、`/Face/`、`/Angular/`、`/Javascript/文件操作`、`/NodeJs/文件操作`、`/WebRTC/camera摄像头`、`/Steganography/text` 均为现有路由）。

- [ ] **Step 1: 重写 `docs/index.md`**

```markdown
---
layout: home

hero:
  name: 开发笔记
  text: 把踩过的坑变成可复用的笔记
  tagline: Angular · Vue · React · JavaScript · NodeJs · WebRTC —— 记录问题、总结方法，附可直接运行的在线 Demo。
  actions:
    - theme: brand
      text: 开始阅读 →
      link: /Vue/
    - theme: alt
      text: 面试题
      link: /Face/
    - theme: alt
      text: GitHub
      link: https://github.com/wsqww/devNote

features:
  - icon: 🅰️
    title: Angular
    details: 搭建、模块、组件、路由、拦截器、RxJs 等实战笔记，附插件工具用法。
    link: /Angular/
    linkText: 阅读
  - icon: 🖼️
    title: Vue
    details: 项目搭建与资源优化，Vue 生态的踩坑记录。
    link: /Vue/
    linkText: 阅读
  - icon: ⚛️
    title: React
    details: React 入门与实践要点。
    link: /React/
    linkText: 阅读
  - icon: 🟨
    title: JavaScript
    details: 文件操作、手写代码、深拷贝、数组去重、懒加载等实用片段。
    link: /Javascript/文件操作
    linkText: 阅读
  - icon: 🟩
    title: NodeJs
    details: 终端完整打印对象、交互式提示选项、文件操作。
    link: /NodeJs/文件操作
    linkText: 阅读
  - icon: 📹
    title: WebRTC
    details: 摄像头、麦克风、屏幕录制实战，附可运行的在线 Demo。
    link: /WebRTC/camera摄像头
    linkText: 阅读
  - icon: 🎭
    title: 隐写术
    details: 文字隐写——把信息藏进看不见的地方，附在线体验 Demo。
    link: /Steganography/text
    linkText: 阅读
  - icon: 📝
    title: 面试题
    details: CSS / JS 高频面试题整理，求职季速查。
    link: /Face/
    linkText: 阅读
---
```

- [ ] **Step 2: 构建验证**

Run: `npm run docs:build`
Expected: 退出码 0，无死链报错（features 的 link 全部存在）。

- [ ] **Step 3: 产物内容验证**

Run: `grep -c "把踩过的坑变成可复用的笔记" docs/.vitepress/dist/index.html`
Expected: 输出 `1`（首页 SSR HTML 含 hero 文案）。

---

### Task 2: 本地全文搜索

**Files:**
- Modify: `docs/.vitepress/config.mts`（themeConfig 内 `outline` 之后插入 search 配置）

**Interfaces:**
- Consumes: 无（VitePress 内置 local search）。
- Produces: 构建产物含搜索索引 chunk；顶栏出现搜索按钮。

- [ ] **Step 1: 在 config.mts 的 `outline: { ... }` 块之后插入**

```ts
    // 本地搜索:构建时生成索引、无外部服务;中文文案与 agent-journey 保持一致
    search: {
      provider: 'local',
      options: {
        translations: {
          button: { buttonText: '搜索文档', buttonAriaLabel: '搜索文档' },
          modal: {
            noResultsText: '没有找到结果',
            resetButtonTitle: '清空关键词',
            footer: { selectText: '选择', navigateText: '切换', closeText: '关闭' }
          }
        }
      }
    },
```

- [ ] **Step 2: 构建验证**

Run: `npm run docs:build`
Expected: 退出码 0。

- [ ] **Step 3: 产物验证**

Run: `ls docs/.vitepress/dist/assets/chunks/ | grep -i search | head -3`
Expected: 至少输出一个文件名含 `local-search`（索引已生成）。

---

### Task 3: 返回顶部按钮

**Files:**
- Create: `docs/.vitepress/theme/index.ts`
- Create: `docs/.vitepress/theme/components/BackToTop.vue`

**Interfaces:**
- Produces: 全站页面 `layout-bottom` 插槽挂载回顶按钮（滚动 >300px 出现，点击平滑回顶）。
- 移植说明：源组件在 agent-journey，样式原在其 custom.css，此处内联进组件 `<style>`；类名前缀 `aj-` 改为 `dn-`（5 处：transition name + class 共 5 个选择器组）。

- [ ] **Step 1: 创建 `docs/.vitepress/theme/index.ts`**

```ts
import { h } from 'vue'
import DefaultTheme from 'vitepress/theme'
import BackToTop from './components/BackToTop.vue'

/**
 * 自定义主题：在默认主题基础上注入返回顶部按钮。
 *
 * 职责：往 layout-bottom 插槽挂 BackToTop，长文档页快速回顶；
 *       其余外观与行为全部沿用 VitePress 默认主题。
 */
export default {
  extends: DefaultTheme,
  Layout: () =>
    h(DefaultTheme.Layout, null, {
      'layout-bottom': () => h(BackToTop)
    })
}
```

- [ ] **Step 2: 创建 `docs/.vitepress/theme/components/BackToTop.vue`**

```vue
<script setup lang="ts">
/**
 * 回顶部按钮（移植自 agent-journey，样式内联）。
 *
 * 职责：滚动超过阈值时在右下角出现，点击平滑回顶；全站生效。
 * SSR 安全：scrollY 读取与监听器注册都在 onMounted（仅浏览器执行）。
 */
import { onMounted, onUnmounted, ref } from 'vue'

/** 按钮是否可见（reactive，驱动过渡动画）。 */
const visible = ref(false)

/** 出现阈值：向下滚动超过该像素数才显示。 */
const THRESHOLD = 300

/** 滚动回调：更新可见状态。副作用：修改 visible。 */
function onScroll(): void {
  visible.value = window.scrollY > THRESHOLD
}

/** 点击处理：平滑滚动回页顶。 */
function backToTop(): void {
  window.scrollTo({ top: 0, behavior: 'smooth' })
}

onMounted(() => {
  onScroll() // 处理刷新时已处于页面中部的情况
  window.addEventListener('scroll', onScroll, { passive: true })
})

onUnmounted(() => {
  window.removeEventListener('scroll', onScroll)
})
</script>

<template>
  <transition name="dn-backtop">
    <button
      v-if="visible"
      class="dn-backtop"
      aria-label="回到顶部"
      title="回到顶部"
      @click="backToTop"
    >
      ↑
    </button>
  </transition>
</template>

<style>
/* 移植自 agent-journey custom.css 的 .aj-backtop 段，类名改为 dn- 前缀 */
.dn-backtop {
  position: fixed;
  right: 20px;
  bottom: 48px;
  z-index: 80;
  width: 40px;
  height: 40px;
  border-radius: 50%;
  border: 1px solid var(--vp-c-divider);
  background: var(--vp-c-bg);
  color: var(--vp-c-text-2);
  font-size: 18px;
  line-height: 1;
  cursor: pointer;
  box-shadow: var(--vp-shadow-2);
  transition: color 0.2s ease, border-color 0.2s ease, transform 0.2s ease;
}

.dn-backtop:hover {
  color: var(--vp-c-brand-1);
  border-color: var(--vp-c-brand-1);
  transform: translateY(-2px);
}

/* 出现/消失过渡 */
.dn-backtop-enter-active,
.dn-backtop-leave-active {
  transition: opacity 0.2s ease, transform 0.2s ease;
}

.dn-backtop-enter-from,
.dn-backtop-leave-to {
  opacity: 0;
  transform: translateY(8px);
}
</style>
```

- [ ] **Step 3: 构建验证**

Run: `npm run docs:build`
Expected: 退出码 0（theme 组件编译通过）。

---

### Task 4: 域名自愈 CNAME

**Files:**
- Create: `docs/public/CNAME`（内容一行，无换行外字符）

- [ ] **Step 1: 写入文件，内容**

```
devnote.shuaiqiang.wang
```

- [ ] **Step 2: 产物验证**

Run: `npm run docs:build && cat docs/.vitepress/dist/CNAME`
Expected: 输出 `devnote.shuaiqiang.wang`（public 目录已拷贝到 dist 根）。

---

### Task 5: 官方 Pages Actions 工作流

**Files:**
- Delete: `.github/workflows/blank.yml`
- Create: `.github/workflows/deploy.yml`

**Interfaces:**
- Consumes: `package.json` 的 `docs:build` script；`package-lock.json`（`npm ci` 校验同步性）。
- Produces: push master / 手动触发 → 构建并发布到 GitHub Pages（OIDC 授权，无需 PAT）。

- [ ] **Step 1: 删除旧工作流**

Run: `rm .github/workflows/blank.yml`
Expected: 文件删除（其功能由 deploy.yml 完整取代）。

- [ ] **Step 2: 创建 `.github/workflows/deploy.yml`**

```yaml
# 开发笔记自动部署：push 到 master 后自动构建并发布到 GitHub Pages
name: Deploy 开发笔记

on:
  push:
    branches: [master]
  workflow_dispatch: # 允许在 Actions 页面手动触发

permissions:
  contents: read
  pages: write
  id-token: write

# 同一时间只保留一个部署；连续 push 时新的排队等待，不打断进行中的发布
concurrency:
  group: pages
  cancel-in-progress: false

jobs:
  build:
    runs-on: ubuntu-latest
    steps:
      - name: 拉取代码
        uses: actions/checkout@v4
      - name: 配置 Node 22（与本地一致）
        uses: actions/setup-node@v4
        with:
          node-version: 22
          cache: npm
      - name: 配置 GitHub Pages
        uses: actions/configure-pages@v5
        with:
          # 仓库尚未开启 Pages 时自动开启；Source 切到 "GitHub Actions" 需在 Settings 手动操作一次
          enablement: true
      - name: 安装依赖（按 package-lock.json 锁定版本）
        run: npm ci
      - name: 构建站点
        run: npm run docs:build
      - name: 上传构建产物
        uses: actions/upload-pages-artifact@v3
        with:
          path: docs/.vitepress/dist

  deploy:
    needs: build # 构建成功才发布
    runs-on: ubuntu-latest
    environment:
      name: github-pages
      url: ${{ steps.deployment.outputs.page_url }}
    steps:
      - name: 发布到 GitHub Pages
        id: deployment
        uses: actions/deploy-pages@v4
```

- [ ] **Step 3: YAML 语法验证**

Run: `python3 -c "import yaml; yaml.safe_load(open('.github/workflows/deploy.yml')); print('YAML OK')"`
Expected: 输出 `YAML OK`（若本机缺 PyYAML 则人工核对缩进后跳过）。

- [ ] **Step 4: 依赖锁校验（模拟 npm ci 的前置检查）**

Run: `npm ci --dry-run`
Expected: 退出码 0，lock 与 package.json 同步（真实 CI 中 `npm ci` 依赖此条件）。

---

### Task 6: 清理旧部署脚本

**Files:**
- Delete: `deploy.sh`
- Modify: `package.json`（删 `scripts.deploy`）

- [ ] **Step 1: 删除 `deploy.sh`**

Run: `rm deploy.sh`

- [ ] **Step 2: package.json 的 scripts 改为（删除 deploy 行及其前一行的逗号归属不变）**

```json
  "scripts": {
    "docs:dev": "vitepress dev docs",
    "docs:build": "vitepress build docs",
    "docs:preview": "vitepress preview docs"
  },
```

- [ ] **Step 3: JSON 合法性验证**

Run: `node -e "JSON.parse(require('fs').readFileSync('package.json','utf8')); console.log('JSON OK')"`
Expected: 输出 `JSON OK`。

- [ ] **Step 4: scripts 可用性验证**

Run: `npm run docs:build`
Expected: 退出码 0。

---

### Task 7: 终验与提交（提交需用户授权）

**Files:** 无新增修改；只验证与汇报。

- [ ] **Step 1: 干净构建终验**

Run: `rm -rf docs/.vitepress/dist docs/.vitepress/cache && npm run docs:build`
Expected: 退出码 0。

- [ ] **Step 2: 本地预览人工核验**

Run: `npm run docs:preview`
Expected（浏览器逐项）: 首页 home 布局 + 8 张卡片；顶栏搜索可检索「拦截器」等关键词；长页面滚动 >300px 出现回顶按钮；暗色模式外观正常。

- [ ] **Step 3: 变更清单核对**

Run: `git status --short`
Expected 恰好包含：`M docs/index.md`、`M docs/.vitepress/config.mts`、`M package.json`、`D .github/workflows/blank.yml`、`D deploy.sh`、`?? docs/.vitepress/theme/`、`?? docs/public/CNAME`、`?? .github/workflows/deploy.yml`（另有此前迁移遗留的未提交改动，不动）。

- [ ] **Step 4: 提交（等用户明确说提交后执行）**

```bash
git add docs/index.md docs/.vitepress/config.mts package.json package-lock.json \
  .github/workflows/deploy.yml docs/.vitepress/theme docs/public/CNAME
git rm .github/workflows/blank.yml deploy.sh
git commit -m "feat: home 首页 + 本地搜索 + 回顶按钮，部署切换官方 GitHub Pages Actions"
```

---

## 合并后一次性手动步骤（无法自动化）

1. Settings → Pages → Source 切为 **"GitHub Actions"**。
2. 首次部署成功后（可选）：删 gh-pages 分支、吊销 `ACCESS_TOKEN` PAT。
