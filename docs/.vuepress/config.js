module.exports = {
  title: '开发笔记',
  description: '对开发和学习过程中遇到的问题进行记录总结',
  base: process.env.NODE_ENV === 'production' ? '/devNote/' : '/',
  // 侧边栏
  themeConfig: {
    // displayAllHeaders: true,
    sidebarDepth: 0,
    sidebar: [
      { title: '介绍', path: '/' },
      {
        title: 'Angular',
        // path: '/Angular/',
        children: [
          { title: 'Angular搭建环境', path: '/Angular/' },
          { title: '模块', path: '/Angular/module' }
        ]
      },
      { title: 'Vue', path: '/Vue/' },
      { title: 'NodeJs',  path: '/NodeJs/' },
      { title: 'LeetCode',  path: '/LeetCode/' },
    ]
  }
}
