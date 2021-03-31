module.exports = {
  title: '开发笔记',
  description: '对开发和学习过程中遇到的问题进行记录总结',
  base: process.env.NODE_ENV  === '' ? 'devNote' : '/',
  // 侧边栏
  themeConfig: {
    // displayAllHeaders: true,
    sidebar: [
      {title: '介绍', path: '/'},
      {title: 'Angular', path: '/Angular/'},
      {title: 'Vue', path: '/Vue/'},
      {title: 'NodeJs', path: '/NodeJs/'},
    ]
  }
}
