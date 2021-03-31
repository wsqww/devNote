## HTML

### 新标签

video，audio，canvas

### html5哪些标签可以做SEO优化？

title、meta、header、footer、nav、article、aside

### defer和async的区别

- defer要等到整个页面在内存中正常渲染结束（DOM结构完全生成，以及其他脚本执行完成），才会执行。多个defer脚本会按照它们在页面出现的顺序加载。==“渲染完再执行”==
- async一旦下载完，渲染引擎就会中断渲染，执行这个脚本以后，再继续渲染。多个async脚本是不能保证加载顺序的。==“下载完就执行”==

### 常见的浏览器内核

- Trident内核：IE,MaxThon,TT,The Word,360,搜狗浏览器等。
- Gecko内核：Netscape6及以上版本，FF,MozillaSuite/SeaMonkey等；
- Presto内核：Opera7及以上。[现为：Blink]
- Webkit内核：Safari,Chrome等。[Chrome的:Blink(Webkit的分支)]

### 重塑 回流

- 回流必将引起重绘，重绘不一定会引起回流
- 重塑 当页面中元素样式的改变并不影响它在文档流中的位置时（例如：color、background-color、visibility等），浏览器会将新样式赋予给元素并重新绘制它，这个过程称为重绘
- 回流 当文档流中部分或全部元素的尺寸、结构、或某些属性发生改变时，浏览器重新渲染部分或全部文档的过程称为回流
一些常用且会导致回流的属性和方法
- clientWidth、clientHeight、clientTop、clientLeft、offsetWidth、offsetHeight、offsetTop、offsetLeft
- scrollWidth、scrollHeight、scrollTop、scrollLeft
- scrollIntoView()、scrollIntoViewIfNeeded()、scrollTo()
如何避免
- 避免使用table布局。
- 将动画效果应用到position属性为absolute或fixed的元素上。
- 避免使用CSS表达式（例如：calc()）。
- 避免频繁操作样式，最好一次性重写style属性，或者将样式列表定义为class并一次性更改class属性。
- 避免频繁操作DOM，创建一个documentFragment，在它上面应用所有DOM操作，最后再把它添加到文档中

## CSS

### 单位 px / rem / em / vh/vw

- px 相对于显示器屏幕分辨率
- rem 相对的HTML根元素
- em 相对于当前元素内文本的字体尺寸
- vh/vw 相对于窗口的尺寸 1vh/1vw = 1%高度/宽度；1vmin/1max = 1%窗口宽高中最小/最大的那个

### 盒模型，width 包括哪几部分

- 标准盒模型：width = content；
- 怪异盒模型：width = content + padding + border；（IE盒模型）
- 常用怪异盒模型：box-sizing: border-box;

### 清除浮动的 方法

```css
.clearfix:after {
    content: '.';
    height: 0;
    display: block;
    clear: both;
}
```

### 动画

- animation: animation-name(关键帧名字)，animation-duration(一个周期的时间), animation-timing-function(速度不变，慢快慢，开始慢，结束慢)，animation-delay(延迟)，animation-iteration-count(播放次数)，animation-direction(是否应该轮流反向播放动画)；
- transition 更改CSS属性时控制动画速度的方法
- @keyframes 关键帧 控制动画过程中每一个阶段的样式

### 透明度：rgba() / transparent / opacity    有什么区别

- opacity 是css的属性，rgba() 和 transparent 是值。
- opacity用来设置元素的不透明级别，从 0.0 （完全透明）到 1.0（完全不透明）。
- transparent 是颜色的一种，这种颜色叫透明色。
- rgba(r,g,b,a)，r：红色值；g：绿色值；b：蓝色值。三个颜色值组合在一起就形成最终颜色。a：alpha透明度。表示像素不透明性的值。像素越不透明，则隐藏越多呈现图像的背景。取值0~1之间。0表示完全透明的像素，1表示完全不透明的像素。

### 垂直居中布局

- flex
```css
.parent {
  display: flex;
  justify-content: center;
  align-items: center;
}
```
- position
```css
.parent {
  position: relative;
}
.child {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
}
```
- table-cell
```css
.parent {
  display: table-cell;
  vertical-align: center;
  text-align: center;
}
.child {
  display: inline-block;
}
```

### class

- 两个div文字分别什么颜色
样式从上到下加载，与html中 类名 顺序无关
```html
<style>
.red {
  color: red;
}
.blue {
  color: blue;
}
</style>
<div class="red blue">div1<div>
<div class="blue red">div2<div>
```
