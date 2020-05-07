<!-- TOC -->

- [表格，表头固定，内容区域超出 滚动](#%e8%a1%a8%e6%a0%bc%e8%a1%a8%e5%a4%b4%e5%9b%ba%e5%ae%9a%e5%86%85%e5%ae%b9%e5%8c%ba%e5%9f%9f%e8%b6%85%e5%87%ba-%e6%bb%9a%e5%8a%a8)
- [禁止选择](#%e7%a6%81%e6%ad%a2%e9%80%89%e6%8b%a9)
- [单/复选 样式](#%e5%8d%95%e5%a4%8d%e9%80%89-%e6%a0%b7%e5%bc%8f)
- [单行文字超出显示省略号](#%e5%8d%95%e8%a1%8c%e6%96%87%e5%ad%97%e8%b6%85%e5%87%ba%e6%98%be%e7%a4%ba%e7%9c%81%e7%95%a5%e5%8f%b7)
- [滚动条样式](#%e6%bb%9a%e5%8a%a8%e6%9d%a1%e6%a0%b7%e5%bc%8f)
- [vertical-align](#vertical-align)
- [clip-path](#clip-path)

<!-- /TOC -->

#### 表格，表头固定，内容区域超出 滚动
```css
table.fixed_table thead {
  display: table;
  table-layout: fixed;
  width: 100%;
}

table.fixed_table tbody {
  display: block;
  overflow: auto;
  max-height: 500px; // 必须设置高度
}

table.fixed_table tbody tr {
  display: table;
  table-layout: fixed;
  width: 100%;
}
```

#### 禁止选择
```css
.unselect {
    -moz-user-select:none; /*火狐*/
    -webkit-user-select:none; /*webkit浏览器*/
    -ms-user-select:none; /*IE10*/
    -khtml-user-select:none; /*早期浏览器*/
    user-select:none;
}
```

#### 单/复选 样式
```html
// 单复选框 （不需要 js）
// 通过 .icon 标签展示选中状态
// type checkbox/radio
<label class="checkbox-wrap">
  <div class="checkbox-ipt">
    <input type="checkbox" checked autocomplete="off"/>
    <i class="icon jc-icon-font">&#xe64e;</i>
  </div>
  <span>这里是文字</span>
</label>
```
```scss
.checkbox-wrap {
  display: flex;
  align-items: center;
  margin-bottom: 0;
  font-weight: normal;

  .checkbox-ipt {
    position: relative;
    width: 16px;
    height: 16px;
    border: 1px solid #e7ebf2;
    border-radius: 3px;
    margin-right: 4px;
    background-color: #fff;
    overflow: hidden;

    .icon {
      display: block;
      width: 100%;
      height: 100%;
      line-height: 14px;
      text-align: center;
      font-size: 14px;
      color: transparent;
    }

    input {
      position: absolute;
      top: 0;
      left: 0;
      height: 100%;
      width: 100%;
      opacity: 0;
      cursor: pointer;

      &:checked+.icon {
        // 这里修改 展示状态图标 样式
        color: #fff;
        background-color: $defaultColor;
      }

      &:disabled {
        cursor: not-allowed;

        &+.icon {
          background-color: $bgColor;
        }
      }

      &:disabled:checked+.icon {
        color: #ccc;
        background-color: #fff;
      }
    }
  }
}
```

#### 单行文字超出显示省略号
```css
.ellipsis {
  overflow: hidden; // 超出的文本隐藏
  text-overflow: ellipsis; // 溢出用省略号显示
  white-space: nowrap; // 溢出不换行
}
```

#### 滚动条样式
```scss
.scrollbar {
  overflow: auto;

  &::-webkit-scrollbar {
    width: 6px;
    height: 6px;
    border-radius: 3px;
  }
  
  &::-webkit-scrollbar-track {
    border-radius: 3px;
  }
  &::-webkit-scrollbar-track-piece {
    background-color: transparent;
    border-radius: 3px;
  }
  
  &::-webkit-scrollbar-thumb,
  &::-webkit-scrollbar-thumb:horizontal,
  &::-webkit-scrollbar-thumb:vertical {
    border-radius: 3px;
    background-color: transparent;
  }

  &:hover {
    &::-webkit-scrollbar-track-piece {
      background-color: #ccc;
    }
    
    &::-webkit-scrollbar-thumb {
      background-color: #999;
    }
  }
}
```

#### vertical-align
[MDN](https://developer.mozilla.org/en-US/docs/Web/CSS/vertical-align)
```css
.inline-block {
  vertical-align: baseline; /* 使元素的基线与父元素的基线对齐。HTML规范没有详细说明部分可替换元素的基线，如<textarea> ，这意味着这些元素使用此值的表现因浏览器而异。 */
  vertical-align: sub; /* 使元素的基线与父元素的下标基线对齐。 */
  vertical-align: super; /* 使元素的基线与父元素的上标基线对齐。 */
  vertical-align: text-top; /* 使元素的基线与父元素的上标基线对齐。 */
  vertical-align: text-bottom; /* 使元素的底部与父元素的字体底部对齐。 */

  vertical-align: middle; /* 使元素的中部与父元素的基线加上父元素x-height（译注：x高度）的一半对齐 */
  vertical-align: top; /* 使元素及其后代的顶部与整个行的顶部对齐 */
  vertical-align: bottom; /* 使元素及其后代的底部与整个行的底部对齐 */
}
```

#### clip-path
[MDN](https://developer.mozilla.org/zh-CN/docs/Web/CSS/clip-path)
- 圆 circle:     clip-path: circle(25% at 50% 50%);
- 椭圆 ellipse:   clip-path: ellipse(25% 25% at 50% 50%);
- inset:         clip-path: inset(35% 35% 35% 35% round 0 70% 0 70%);
- 多边形 polygon: clip-path: polygon(50% 0, 25% 50% ,75% 50%);
```html
<div class="demo"></div>
<hr>
<div class="demo2"></div>
```
```css
.demo,
.demo2 {
    display: inline-block;
    width: 100px;
    height: 100px;
    background-color: skyblue;

    transition: .5s;
}

.demo {
    clip-path: polygon(50% 0, 100% 38%, 82% 100%, 18% 100%, 0% 38%);
    animation: clip 1s linear infinite;
}

@keyframes clip {
    0% {
        clip-path: polygon(50% 0, 100% 38%, 82% 100%, 18% 100%, 0 38%);
    }

    25% {
        clip-path: polygon(75% 0, 100% 69%, 65.5% 100%, 9% 100%, 0 19%);
    }

    50% {
        clip-path: polygon(100% 0, 100% 100%, 50% 100%, 0 100%, 0 0);
    }

    75% {
        clip-path: polygon(100% 19%, 91% 100%, 34% 100%, 0 69%, 25% 0);
    }

    100% {
        clip-path: polygon(100% 38%, 82% 100%, 18% 100%, 0 38%, 50% 0);
    }
}

.demo2 {
    clip-path: polygon(20% 0, 80% 0, 100% 50%, 80% 100%, 20% 100%, 0 50%);
    animation: clip2 1s linear infinite;
}

@keyframes clip2 {
    0% {
        clip-path: polygon(20% 0, 80% 0, 100% 50%, 80% 100%, 20% 100%, 0 50%);
    }

    25% {
        clip-path: polygon(35% 0, 90% 0, 100% 75%, 65% 100%, 10% 100%, 0 25%);
    }

    50% {
        clip-path: polygon(50% 0, 100% 0, 100% 100%, 50% 100%, 0 100%, 0 0);
    }

    75% {
        clip-path: polygon(65% 0, 100% 25%, 90% 100%, 35% 100%, 0 75%, 10% 0);
    }

    100% {
        clip-path: polygon(80% 0, 100% 50%, 80% 100%, 20% 100%, 0 50%, 20% 0);
    }
}
```