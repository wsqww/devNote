module.exports = {
  title: '开发笔记',
  description: '对开发和学习过程中遇到的问题进行记录总结。',
  // base: process.env.NODE_ENV === 'production' ? '/devNote/' : '/',
  base: '/',
  head: [
    ['link', { rel: 'icon', href: '/favicon.png' }]
  ],
  themeConfig: {
    logo: '/favicon.png',
    nav: [
      { text: '笔记', link: '/' },
      { text: '题目', link: '/Face/' },
      { text: 'Github', link: 'https://github.com/wsqww/devNote' }
    ],
    // displayAllHeaders: true,
    sidebarDepth: 0,
    lastUpdated: '上次更新',
    // 侧边栏
    sidebar: {
      '/Face/': [
        { title: '介绍', path: '/Face/' },
        { title: 'CSS', path: '/Face/Css/' },
        { title: 'JS', path: '/Face/Js/' },
      ],
      '/': [
        { title: '介绍', path: '/' },
        { title: 'Nginx', path: '/Nginx/' },
        {
          title: 'Angular',
          // path: '/Angular/',
          children: [
            { title: '搭建项目', path: '/Angular/' },
            { title: '模块 Module', path: '/Angular/module' },
            { title: '组件 Component', path: '/Angular/component' },
            { title: '路由 Route', path: '/Angular/route' },
            { title: 'http请求', path: '/Angular/httpClient' },
            { title: '请求拦截 Interceptor', path: '/Angular/interceptor' },
            { title: '服务 Service', path: '/Angular/service' },
            { title: '环境变量 environment', path: '/Angular/environment' },
            { title: '动态引入外部js', path: '/Angular/usejslink' },
            { title: 'RxJs', path: '/Angular/rxjs' },
            {
              title: '插件工具', path: '/Angular/utils/',
              children: [
                { title: 'mathquill', path: '/Angular/utils/mathquill' }
              ]
            },
          ]
        },
        {
          title: 'Vue',
          // path: '/Vue/',
          children: [
            { title: '搭建项目', path: '/Vue/' },
            { title: '资源优化', path: '/Vue/资源优化' },
          ]
        },
        { title: 'React', path: '/React/' },
        {
          title: 'Js Code',
          children: [
            { title: '文件操作', path: '/Javascript/文件操作' },
            { title: '手写代码', path: '/Javascript/手写代码' },
            { title: 'deepAssign', path: '/Javascript/deep-assign' },
            { title: '数组去重', path: '/Javascript/数组去重' },
            { title: '懒加载', path: '/Javascript/懒加载' },
            { title: 'audio播放器', path: '/Javascript/audio播放器' },
            { title: 'camera摄像头', path: '/Javascript/camera摄像头' },
            { title: 'microphone麦克风', path: '/Javascript/microphone麦克风' },
          ]
        },
        {
          title: 'NodeJs',
          // path: '/NodeJs/',
          children: [
            { title: '终端完整打印obj', path: '/NodeJs/终端打印obj' },
            { title: '终端显示提示选项', path: '/NodeJs/终端提示' },
            { title: '文件操作', path: '/NodeJs/文件操作' },
          ]
        },
        {
          title: 'LeetCode',
          // path: '/LeetCode/',
          children: [
            { title: '练习', path: '/LeetCode/test/' },
            { title: '剑指Offer', path: '/LeetCode/offer/' },
          ]
        },
        {
          title: '其他',
          // path: '/其他/',
          children: [
            { title: 'css: clip-path', path: '/其他/css_clip-path' },
            { title: 'css 天气图标', path: '/其他/css_icon' },
            { title: 'sso-Iframe示例', path: '/其他/sso-Iframe示例' },
            { title: 'css片段', path: '/其他/css片段' },
            { title: 'css改变dom排序', path: '/其他/flex_order' },
            { title: 'Git规范-husky', path: '/其他/Git规范-husky' },
          ]
        },
      ],
    }
  },
  markdown: {
    lineNumbers: true,
    toc: { includeLevel: [3, 4] }
  },
  plugins: ['@vuepress/back-to-top']
}
