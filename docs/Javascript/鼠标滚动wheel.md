## 鼠标滚动 切换图片

主要使用：
- **document.onwheel**

#### 事例
```js
const targetImg = document.getElementById('target');
targetImg.onwheel = function(event) {
  consol.log(event.deltaX); // 横向滚动距离
  consol.log(event.deltaY); // 总想滚动距离
}
body.onwheel = function(event) {
  return false; // 鼠标滚动时-禁止页面滚动
  return true; // 鼠标滚动时-允许面滚动（默认）
}
```

#### 效果
<br>
<iframe style="width: 100%; height: 450px; border: 1px solid #ccc;" onwheel="return false;" allowfullscreen="true" :src="$withBase('/demo/javascript/mousewheel.html')"></iframe>

#### 代码
<<< @/docs/.vuepress/public/demo/javascript/mousewheel.html
