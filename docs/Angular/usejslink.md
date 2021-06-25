## 引入外部js

如何动态 引入外部js

```javascript

// 声明 myNameSpace 防止 js 编译报错
declare global {
  interface Window { myNameSpace: any; }
}
window.myNameSpace = window.myNameSpace || {};

class myClass() {
  constructor() {}

  createScript() {
    const myScript = document.createElement('script');
    myScript.src = 'xxxx.xxxx/my.js'; // 需要引入的外部 js
    document.body.appendChild(myScript);
    const that = this;
    // 外部js 加载后执行
    myScript.onload = function() {
      console.log(window.myNameSpace);
    }
  }
}


```
