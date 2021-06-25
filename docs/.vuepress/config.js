module.exports = {
  title: '开发笔记',
  description: '对开发和学习过程中遇到的问题进行记录总结',
  base: process.env.NODE_ENV === 'production' ? '/devNote/' : '/',
  head: [
    ['link', { rel: 'icon', href: '/favicon.png' }]
  ],
  // 侧边栏
  themeConfig: {
    // displayAllHeaders: true,
    sidebarDepth: 0,
    lastUpdated: '更新于',
    sidebar: [
      { title: '介绍', path: '/' },
      { title: 'Nginx', path: '/Nginx/' },
      {
        title: 'Angular',
        // path: '/Angular/',
        children: [
          { title: '搭建环境', path: '/Angular/' },
          { title: '模块 Module', path: '/Angular/module' },
          { title: '组件 Component', path: '/Angular/component' },
          { title: '路由 Route', path: '/Angular/route' },
          { title: 'http请求', path: '/Angular/httpClient' },
          { title: '请求拦截 Interceptor', path: '/Angular/interceptor' },
          { title: '服务 Service', path: '/Angular/service' },
          { title: '环境变量 environment', path: '/Angular/environment' },
          { title: '动态引入外部js', path: '/Angular/usejslink' },
          { title: 'RxJs', path: '/Angular/rxjs' },
        ]
      },
      { title: 'Vue', path: '/Vue/' },
      { title: 'NodeJs',  path: '/NodeJs/' },
      { title: 'LeetCode',  path: '/LeetCode/' }
    ]
  }
}
