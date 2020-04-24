[TOC]
## css 代码片段

1. #### 表格，表头固定，内容区域超出 滚动
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

2. #### 禁止选择
```css
.unselect {
    -moz-user-select:none; /*火狐*/
    -webkit-user-select:none; /*webkit浏览器*/
    -ms-user-select:none; /*IE10*/
    -khtml-user-select:none; /*早期浏览器*/
    user-select:none;
}
```

3. #### 单/复选 样式
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