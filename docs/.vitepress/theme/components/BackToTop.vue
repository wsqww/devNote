<script setup lang="ts">
/**
 * 回顶部按钮(移植自 agent-journey,样式内联)。
 *
 * 职责:滚动超过阈值时在右下角出现,点击平滑回顶;全站生效。
 * SSR 安全:scrollY 读取与监听器注册都在 onMounted(仅浏览器执行)。
 */
import { onMounted, onUnmounted, ref } from 'vue'

/** 按钮是否可见(reactive,驱动过渡动画)。 */
const visible = ref(false)

/** 出现阈值:向下滚动超过该像素数才显示。 */
const THRESHOLD = 300

/** 滚动回调:更新可见状态。副作用:修改 visible。 */
function onScroll(): void {
  visible.value = window.scrollY > THRESHOLD
}

/** 点击处理:平滑滚动回页顶。 */
function backToTop(): void {
  window.scrollTo({ top: 0, behavior: 'smooth' })
}

onMounted(() => {
  onScroll() // 处理刷新时已处于页面中部的情况
  window.addEventListener('scroll', onScroll, { passive: true })
})

onUnmounted(() => {
  window.removeEventListener('scroll', onScroll)
})
</script>

<template>
  <transition name="dn-backtop">
    <button
      v-if="visible"
      class="dn-backtop"
      aria-label="回到顶部"
      title="回到顶部"
      @click="backToTop"
    >
      ↑
    </button>
  </transition>
</template>

<style>
/* 移植自 agent-journey custom.css 的 .aj-backtop 段,类名改为 dn- 前缀 */
.dn-backtop {
  position: fixed;
  right: 20px;
  bottom: 48px;
  z-index: 80;
  width: 40px;
  height: 40px;
  border-radius: 50%;
  border: 1px solid var(--vp-c-divider);
  background: var(--vp-c-bg);
  color: var(--vp-c-text-2);
  font-size: 18px;
  line-height: 1;
  cursor: pointer;
  box-shadow: var(--vp-shadow-2);
  transition: color 0.2s ease, border-color 0.2s ease, transform 0.2s ease;
}

.dn-backtop:hover {
  color: var(--vp-c-brand-1);
  border-color: var(--vp-c-brand-1);
  transform: translateY(-2px);
}

/* 出现/消失过渡 */
.dn-backtop-enter-active,
.dn-backtop-leave-active {
  transition: opacity 0.2s ease, transform 0.2s ease;
}

.dn-backtop-enter-from,
.dn-backtop-leave-to {
  opacity: 0;
  transform: translateY(8px);
}
</style>
