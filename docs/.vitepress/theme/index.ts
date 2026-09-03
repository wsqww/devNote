import { h } from 'vue'
import DefaultTheme from 'vitepress/theme'
import BackToTop from './components/BackToTop.vue'
import './custom.css'

/**
 * 自定义主题:在默认主题基础上注入返回顶部按钮。
 *
 * 职责:往 layout-bottom 插槽挂 BackToTop,长文档页快速回顶;
 *      其余外观与行为全部沿用 VitePress 默认主题。
 */
export default {
  extends: DefaultTheme,
  Layout: () =>
    h(DefaultTheme.Layout, null, {
      'layout-bottom': () => h(BackToTop)
    })
}
