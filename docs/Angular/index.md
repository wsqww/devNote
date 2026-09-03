## 搭建项目

angular相关内容可参考个人练习项目：[Angular8-dev](https://github.com/wsqww/Angular8-dev)

### 本地环境
```shell
nodejs 10.9 + 
npm 
```

### ng 命令
```shell
// 全局安装 angular-cli
npm install -g @angular/cli

// 创建项目
ng new my-app

// 运行项目
ng serve

// 构建项目(预编译)
ng build --prod --aot

// 创建 component
ng generate component XXX
ng g component XXX

// 创建 service
ng g service XXX

// 创建 module + routing
ng g module XXX --routing

// 创建 interceptor 请求拦截器
ng g interceptor XXX

// 创建管道 pipe
ng g pipe XXX

// 创建指令 directive
ng g directive XXX
```

### angular项目目录结构
参考  
- [如何更好地组织Angular项目](https://zhuanlan.zhihu.com/p/63515048)  
- [ng-alain](https://github.com/ng-alain/ng-alain)  
```
├── node_modules
├── e2e
├── src
│   ├── app
│   │   ├── core                                # 核心模块
│   │   │   ├── i18n                            # 国际化
│   │   │   ├── net
│   │   │   │   └── default.interceptor.ts      # 默认HTTP拦截器
│   │   │   ├── services
│   │   │   │   └── startup.service.ts          # 初始化项目配置
│   │   │   └── core.module.ts                  # 核心模块文件
│   │   ├── layout                              # 通用布局
│   │   │   ├── header                          # 头部
│   │   │   ├── footer                          # 底部
│   │   │   └── shared.module.ts                # 通用布局文件
│   │   ├── routes
│   │   │   ├── **                              # 业务目录
│   │   │   ├── routes.module.ts                # 业务路由模块
│   │   │   └── routes-routing.module.ts        # 业务路由注册口
│   │   ├── shared                              # 共享模块
│   │   │   ├── pipe                            # 管道
│   │   │   ├── utils                           # 通用小组件
│   │   │   └── shared.module.ts                # 共享模块文件
│   │   ├── app.component.ts                    # 根组件
│   │   └── app.module.ts                       # 根模块
│   │   └── delon.module.ts                     # @delon模块导入
│   ├── assets                                  # 本地静态资源
│   ├── environments                            # 环境变量配置
│   ├── styles                                  # 样式目录
│   ├── index.html
│   ├── main.ts
│   └── style.scee
├── angular.json                                # angular 配置文件
├── proxy.config.json                           # 代理配置
├── tsconfig.json                               # ts 配置文件
├── tsconfig.app.jaon
└── README.md
```

