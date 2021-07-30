### Vue

### Project setup
```
npm install
```

### Compiles and hot-reloads for development
```
npm run serve
```

### Compiles and minifies for production
```
npm run build
```

### Run your tests
```
npm run test
```

### Lints and fixes files
```
npm run lint
```

### Customize configuration
See [Configuration Reference](https://cli.vuejs.org/config/).


### 目录结构

```
├── node_modules
├── public
├── src
│   ├── api
│   │    ├── Axios.js                           # 对 Axios 进行二次封装
│   │    ├── common.js                          # 编写公共接口
│   │    └── user.js                            # 用户相关接口
│   │
│   ├── assets                                  # 静态文件
│   │    ├── font                               # 字体
│   │    └── image                              # 图片
│   │
│   ├── components                              # 公共组件
│   │
│   ├── layout                                  # 页面布局
│   │    ├── Nav.vue                            # 侧边栏
│   │    └── Top.vue                            # 头部
│   │
│   ├── router                                  # 定义路由相关
│   │    ├── index.js                           # 定义注册路由
│   │    ├── guard.js                           # 导航守卫
│   │    └── routes.js                          # 导出一些需要 动态注册的路由
│   │
│   ├── store                                   # VueX
│   │    ├── index.js                           # 定义VueX
│   │    └── modules                            # VueX 模块化
│   │
│   ├── utils                                   # 自己封装的 函数库
│   │    ├── asyncRoutes.js                     # 动态注册路由的函数
│   │    └── ###
│   │
│   ├── views                                   # 页面代码
│   ├── style                                   # 样式
│   ├── App.vue                                 # 根组件
│   └── main.js                                 # 入口文件
│   
├── .browserslistrc                             # 浏览器兼容 （https://cli.vuejs.org/zh/guide/browser-compatibility.html#browserslist）
├── .eslintrc.js                                # eslint 的配置文件 （https://cli.vuejs.org/zh/config/#eslint）
├── babel.config.js                             # bable 配置文件 （https://cli.vuejs.org/zh/config/#babel）
├── postcss.config                              # 向 webpack 的预处理器 loader 传递选项 （https://cli.vuejs.org/zh/guide/css.html#%E5%90%91%E9%A2%84%E5%A4%84%E7%90%86%E5%99%A8-loader-%E4%BC%A0%E9%80%92%E9%80%89%E9%A1%B9）
├── vue.config.json                             # vue-cli 配置 （https://cli.vuejs.org/zh/config/#vue-config-js）
└── README.md
```
``
