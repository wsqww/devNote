(window.webpackJsonp=window.webpackJsonp||[]).push([[38],{392:function(s,n,e){"use strict";e.r(n);var a=e(45),t=Object(a.a)({},(function(){var s=this,n=s.$createElement,e=s._self._c||n;return e("ContentSlotsDistributor",{attrs:{"slot-key":s.$parent.slotKey}},[e("h3",{attrs:{id:"vue"}},[e("a",{staticClass:"header-anchor",attrs:{href:"#vue"}},[s._v("#")]),s._v(" Vue")]),s._v(" "),e("h3",{attrs:{id:"project-setup"}},[e("a",{staticClass:"header-anchor",attrs:{href:"#project-setup"}},[s._v("#")]),s._v(" Project setup")]),s._v(" "),e("div",{staticClass:"language- line-numbers-mode"},[e("pre",{pre:!0,attrs:{class:"language-text"}},[e("code",[s._v("npm install\n")])]),s._v(" "),e("div",{staticClass:"line-numbers-wrapper"},[e("span",{staticClass:"line-number"},[s._v("1")]),e("br")])]),e("h3",{attrs:{id:"compiles-and-hot-reloads-for-development"}},[e("a",{staticClass:"header-anchor",attrs:{href:"#compiles-and-hot-reloads-for-development"}},[s._v("#")]),s._v(" Compiles and hot-reloads for development")]),s._v(" "),e("div",{staticClass:"language- line-numbers-mode"},[e("pre",{pre:!0,attrs:{class:"language-text"}},[e("code",[s._v("npm run serve\n")])]),s._v(" "),e("div",{staticClass:"line-numbers-wrapper"},[e("span",{staticClass:"line-number"},[s._v("1")]),e("br")])]),e("h3",{attrs:{id:"compiles-and-minifies-for-production"}},[e("a",{staticClass:"header-anchor",attrs:{href:"#compiles-and-minifies-for-production"}},[s._v("#")]),s._v(" Compiles and minifies for production")]),s._v(" "),e("div",{staticClass:"language- line-numbers-mode"},[e("pre",{pre:!0,attrs:{class:"language-text"}},[e("code",[s._v("npm run build\n")])]),s._v(" "),e("div",{staticClass:"line-numbers-wrapper"},[e("span",{staticClass:"line-number"},[s._v("1")]),e("br")])]),e("h3",{attrs:{id:"run-your-tests"}},[e("a",{staticClass:"header-anchor",attrs:{href:"#run-your-tests"}},[s._v("#")]),s._v(" Run your tests")]),s._v(" "),e("div",{staticClass:"language- line-numbers-mode"},[e("pre",{pre:!0,attrs:{class:"language-text"}},[e("code",[s._v("npm run test\n")])]),s._v(" "),e("div",{staticClass:"line-numbers-wrapper"},[e("span",{staticClass:"line-number"},[s._v("1")]),e("br")])]),e("h3",{attrs:{id:"lints-and-fixes-files"}},[e("a",{staticClass:"header-anchor",attrs:{href:"#lints-and-fixes-files"}},[s._v("#")]),s._v(" Lints and fixes files")]),s._v(" "),e("div",{staticClass:"language- line-numbers-mode"},[e("pre",{pre:!0,attrs:{class:"language-text"}},[e("code",[s._v("npm run lint\n")])]),s._v(" "),e("div",{staticClass:"line-numbers-wrapper"},[e("span",{staticClass:"line-number"},[s._v("1")]),e("br")])]),e("h3",{attrs:{id:"customize-configuration"}},[e("a",{staticClass:"header-anchor",attrs:{href:"#customize-configuration"}},[s._v("#")]),s._v(" Customize configuration")]),s._v(" "),e("p",[s._v("See "),e("a",{attrs:{href:"https://cli.vuejs.org/config/",target:"_blank",rel:"noopener noreferrer"}},[s._v("Configuration Reference"),e("OutboundLink")],1),s._v(".")]),s._v(" "),e("h3",{attrs:{id:"目录结构"}},[e("a",{staticClass:"header-anchor",attrs:{href:"#目录结构"}},[s._v("#")]),s._v(" 目录结构")]),s._v(" "),e("div",{staticClass:"language- line-numbers-mode"},[e("pre",{pre:!0,attrs:{class:"language-text"}},[e("code",[s._v("├── node_modules\n├── public\n├── src\n│   ├── api\n│   │    ├── Axios.js                           # 对 Axios 进行二次封装\n│   │    ├── common.js                          # 编写公共接口\n│   │    └── user.js                            # 用户相关接口\n│   │\n│   ├── assets                                  # 静态文件\n│   │    ├── font                               # 字体\n│   │    └── image                              # 图片\n│   │\n│   ├── components                              # 公共组件\n│   │\n│   ├── layout                                  # 页面布局\n│   │    ├── Nav.vue                            # 侧边栏\n│   │    └── Top.vue                            # 头部\n│   │\n│   ├── router                                  # 定义路由相关\n│   │    ├── index.js                           # 定义注册路由\n│   │    ├── guard.js                           # 导航守卫\n│   │    └── routes.js                          # 导出一些需要 动态注册的路由\n│   │\n│   ├── store                                   # VueX\n│   │    ├── index.js                           # 定义VueX\n│   │    └── modules                            # VueX 模块化\n│   │\n│   ├── utils                                   # 自己封装的 函数库\n│   │    ├── asyncRoutes.js                     # 动态注册路由的函数\n│   │    └── ###\n│   │\n│   ├── views                                   # 页面代码\n│   ├── style                                   # 样式\n│   ├── App.vue                                 # 根组件\n│   └── main.js                                 # 入口文件\n│   \n├── .browserslistrc                             # 浏览器兼容 （https://cli.vuejs.org/zh/guide/browser-compatibility.html#browserslist）\n├── .eslintrc.js                                # eslint 的配置文件 （https://cli.vuejs.org/zh/config/#eslint）\n├── babel.config.js                             # bable 配置文件 （https://cli.vuejs.org/zh/config/#babel）\n├── postcss.config                              # 向 webpack 的预处理器 loader 传递选项 （https://cli.vuejs.org/zh/guide/css.html#%E5%90%91%E9%A2%84%E5%A4%84%E7%90%86%E5%99%A8-loader-%E4%BC%A0%E9%80%92%E9%80%89%E9%A1%B9）\n├── vue.config.json                             # vue-cli 配置 （https://cli.vuejs.org/zh/config/#vue-config-js）\n└── README.md\n")])]),s._v(" "),e("div",{staticClass:"line-numbers-wrapper"},[e("span",{staticClass:"line-number"},[s._v("1")]),e("br"),e("span",{staticClass:"line-number"},[s._v("2")]),e("br"),e("span",{staticClass:"line-number"},[s._v("3")]),e("br"),e("span",{staticClass:"line-number"},[s._v("4")]),e("br"),e("span",{staticClass:"line-number"},[s._v("5")]),e("br"),e("span",{staticClass:"line-number"},[s._v("6")]),e("br"),e("span",{staticClass:"line-number"},[s._v("7")]),e("br"),e("span",{staticClass:"line-number"},[s._v("8")]),e("br"),e("span",{staticClass:"line-number"},[s._v("9")]),e("br"),e("span",{staticClass:"line-number"},[s._v("10")]),e("br"),e("span",{staticClass:"line-number"},[s._v("11")]),e("br"),e("span",{staticClass:"line-number"},[s._v("12")]),e("br"),e("span",{staticClass:"line-number"},[s._v("13")]),e("br"),e("span",{staticClass:"line-number"},[s._v("14")]),e("br"),e("span",{staticClass:"line-number"},[s._v("15")]),e("br"),e("span",{staticClass:"line-number"},[s._v("16")]),e("br"),e("span",{staticClass:"line-number"},[s._v("17")]),e("br"),e("span",{staticClass:"line-number"},[s._v("18")]),e("br"),e("span",{staticClass:"line-number"},[s._v("19")]),e("br"),e("span",{staticClass:"line-number"},[s._v("20")]),e("br"),e("span",{staticClass:"line-number"},[s._v("21")]),e("br"),e("span",{staticClass:"line-number"},[s._v("22")]),e("br"),e("span",{staticClass:"line-number"},[s._v("23")]),e("br"),e("span",{staticClass:"line-number"},[s._v("24")]),e("br"),e("span",{staticClass:"line-number"},[s._v("25")]),e("br"),e("span",{staticClass:"line-number"},[s._v("26")]),e("br"),e("span",{staticClass:"line-number"},[s._v("27")]),e("br"),e("span",{staticClass:"line-number"},[s._v("28")]),e("br"),e("span",{staticClass:"line-number"},[s._v("29")]),e("br"),e("span",{staticClass:"line-number"},[s._v("30")]),e("br"),e("span",{staticClass:"line-number"},[s._v("31")]),e("br"),e("span",{staticClass:"line-number"},[s._v("32")]),e("br"),e("span",{staticClass:"line-number"},[s._v("33")]),e("br"),e("span",{staticClass:"line-number"},[s._v("34")]),e("br"),e("span",{staticClass:"line-number"},[s._v("35")]),e("br"),e("span",{staticClass:"line-number"},[s._v("36")]),e("br"),e("span",{staticClass:"line-number"},[s._v("37")]),e("br"),e("span",{staticClass:"line-number"},[s._v("38")]),e("br"),e("span",{staticClass:"line-number"},[s._v("39")]),e("br"),e("span",{staticClass:"line-number"},[s._v("40")]),e("br"),e("span",{staticClass:"line-number"},[s._v("41")]),e("br"),e("span",{staticClass:"line-number"},[s._v("42")]),e("br")])]),e("p",[s._v("``")])])}),[],!1,null,null,null);n.default=t.exports}}]);