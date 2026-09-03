import { defineConfig } from 'vitepress'

// 站点配置:由 VuePress 1 迁移而来,信息结构与原 config.js 一一对应
export default defineConfig({
  // 页面语言,影响 lastUpdated 等内置文案的本地化
  lang: 'zh-CN',
  title: '开发笔记',
  description: '对开发和学习过程中遇到的问题进行记录总结。',
  // 站点部署在自定义域名(devnote.shuaiqiang.wang)根路径下,保持 base 为 /
  base: '/',
  head: [
    ['link', { rel: 'icon', href: '/favicon.png' }]
  ],
  // 基于 git 提交时间展示"上次更新",替代原 @vuepress/last-updated 插件
  lastUpdated: true,
  markdown: {
    // 代码块显示行号,与原配置一致
    lineNumbers: true
  },
  themeConfig: {
    logo: '/favicon.png',
    nav: [
      { text: '笔记', link: '/' },
      { text: '题目', link: '/Face/' },
      { text: 'Github', link: 'https://github.com/wsqww/devNote' }
    ],
    // 页内大纲层级,对应原 markdown.toc.includeLevel: [3, 4]
    outline: {
      level: [3, 4],
      label: '本页目录'
    },
    // 本地搜索:构建时生成索引、无外部服务,中文文案对照 agent-journey
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
    lastUpdated: {
      text: '上次更新',
      formatOptions: {
        dateStyle: 'medium',
        timeStyle: 'short'
      }
    },
    docFooter: {
      prev: '上一页',
      next: '下一页'
    },
    // 侧边栏:VuePress 的 { title, path, children } 对应此处 { text, link, items }
    sidebar: {
      '/Face/': [
        { text: '介绍', link: '/Face/' },
        { text: 'CSS', link: '/Face/Css/' },
        { text: 'JS', link: '/Face/Js/' }
      ],
      '/': [
        { text: '介绍', link: '/' },
        { text: 'Nginx', link: '/Nginx/' },
        {
          text: 'Angular',
          items: [
            { text: '搭建项目', link: '/Angular/' },
            { text: '模块 Module', link: '/Angular/module' },
            { text: '组件 Component', link: '/Angular/component' },
            { text: '路由 Route', link: '/Angular/route' },
            { text: 'http请求', link: '/Angular/httpClient' },
            { text: '请求拦截 Interceptor', link: '/Angular/interceptor' },
            { text: '服务 Service', link: '/Angular/service' },
            { text: '环境变量 environment', link: '/Angular/environment' },
            { text: '动态引入外部js', link: '/Angular/usejslink' },
            { text: 'RxJs', link: '/Angular/rxjs' },
            {
              text: '插件工具',
              link: '/Angular/utils/',
              items: [
                { text: 'mathquill', link: '/Angular/utils/mathquill' }
              ]
            }
          ]
        },
        {
          text: 'Vue',
          items: [
            { text: '搭建项目', link: '/Vue/' },
            { text: '资源优化', link: '/Vue/资源优化' }
          ]
        },
        { text: 'React', link: '/React/' },
        {
          text: 'Js Code',
          items: [
            { text: '文件操作', link: '/Javascript/文件操作' },
            { text: '手写代码', link: '/Javascript/手写代码' },
            { text: 'deepAssign', link: '/Javascript/deep-assign' },
            { text: '数组去重', link: '/Javascript/数组去重' },
            { text: '懒加载', link: '/Javascript/懒加载' },
            { text: 'audio播放器', link: '/Javascript/audio播放器' },
            { text: '鼠标滚动 wheel', link: '/Javascript/鼠标滚动wheel' }
          ]
        },
        {
          text: 'NodeJs',
          items: [
            { text: '终端完整打印obj', link: '/NodeJs/终端打印obj' },
            { text: '终端显示提示选项', link: '/NodeJs/终端提示' },
            { text: '文件操作', link: '/NodeJs/文件操作' }
          ]
        },
        {
          text: 'WebRTC',
          items: [
            { text: 'camera摄像头', link: '/WebRTC/camera摄像头' },
            { text: 'microphone麦克风', link: '/WebRTC/microphone麦克风' },
            { text: 'displayMedia屏幕录制', link: '/WebRTC/displayMedia屏幕录制' }
          ]
        },
        {
          text: '隐写术',
          items: [
            { text: '文字隐写', link: '/Steganography/text' }
          ]
        },
        {
          text: '其他',
          items: [
            { text: 'css: clip-path', link: '/其他/css_clip-path' },
            { text: 'css 天气图标', link: '/其他/css_icon' },
            { text: 'sso-Iframe示例', link: '/其他/sso-Iframe示例' },
            { text: 'css片段', link: '/其他/css片段' },
            { text: 'css改变dom排序', link: '/其他/flex_order' },
            { text: 'Git规范-husky', link: '/其他/Git规范-husky' }
          ]
        }
      ]
    }
  }
})
