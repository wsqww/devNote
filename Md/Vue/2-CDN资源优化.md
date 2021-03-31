### CDN 资源优化
CDN 的全称是 Content Delivery Network，即内容分发网络。CDN 是构建在网络之上的内容分发网络，依靠部署在各地的边缘服务器，通过中心平台的负载均衡、内容分发、调度等功能模块，使用户就近获取所需内容，降低网络拥塞，提高用户访问响应速度和命中率。CDN 的关键技术主要有内容存储和分发技术。
随着项目越做越大，依赖的第三方 npm 包越来越多，构建之后的文件也会越来越大。再加上又是单页应用，这就会导致在网速较慢或者服务器带宽有限的情况出现长时间的白屏。此时我们可以使用 CDN 的方法，优化网络加载速度。
1. 将 vue、vue-router、vuex、axios 这些 vue 全家桶的资源，全部改为通过 CDN 链接获取，在 index.html 里插入 相应链接。
```html
<body>
  <div id="app"></div>
  <script src="https://cdn.bootcss.com/vue/2.6.10/vue.min.js"></script>
  <script src="https://cdn.bootcss.com/axios/0.19.0-beta.1/axios.min.js"></script>
  <script src="https://cdn.bootcss.com/vuex/3.1.0/vuex.min.js"></script>
  <script src="https://cdn.bootcss.com/vue-router/3.0.2/vue-router.min.js"></script>
  <script src="https://cdn.bootcss.com/element-ui/2.6.1/index.js"></script>
</body>
```
2. 在 vue.config.js 配置 externals 属性
```js
module.exports = {
 ···
    externals: {
      'vue': 'Vue',
      'vuex': 'Vuex',
      'vue-router': 'VueRouter',
      'axios':'axios'
    }
  }
```
3. 卸载相关依赖的 npm 包
```shell
npm uninstall  vue vue-router vuex axios
```
此时启动项目运行就可以了。我们在控制台就能发现项目加载了以上四个 CDN 资源。
不过现在有不少声音说，vue 全家桶加载 CDN 资源其实作用并不大，而且公共的 CDN 资源也没有 npm 包那么稳定，这个就见仁见智了。所以我在源码时新建的分支做这个优化。当项目较小的就不考虑 CDN 优化了。
当然，当引入其他较大第三方资源，比如 echarts，AMAP(高德地图)，采用 CDN 资源还是很有必要的。
