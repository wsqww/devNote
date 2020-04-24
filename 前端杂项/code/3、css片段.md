[TOC]
## css 代码片段

### 表格，表头固定，内容区域超出 滚动
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

### 禁止选择
```css
.unselect {
    -moz-user-select:none; /*火狐*/
    -webkit-user-select:none; /*webkit浏览器*/
    -ms-user-select:none; /*IE10*/
    -khtml-user-select:none; /*早期浏览器*/
    user-select:none;
}
```