#### 路由事件（event）

1. 路由开始跳转
    可在路由行开始跳转 做一些 处理，比如：
    关闭模态框、
2. 拦截路由错误 NavigationError 
    可进行路由错误拦截 进行相关处理，比如：
    项目build上线后 懒加载 缓存错误时，进行页面刷新；

```javascript
// app.component
import { Component } from '@angular/core';
import { Router, NavigationStart, NavigationError } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-root',
  template: `
    <router-outlet></router-outlet>
    <app-error-confirm></app-error-confirm>
  `,
  styles: ['']
})
export class AppComponent {
  constructor(
    private router: Router,
    private modalServer: NgbModal,
  ) {

    // 路由监听
    this.router.events.subscribe(
      (event) => {
        if (event instanceof NavigationStart) {
          this.modalServer.dismissAll(); // 关闭模态框
        }
        if (event instanceof NavigationError) {
          // console.log(event);
          // 代码build上线之后-懒加载报错chunkLoadError, 拦截错误 刷新页面
          const chunkFailedMessage = /Loading chunk [\d]+ failed/;
          if (chunkFailedMessage.test(event.error.message)) {
            window.location.href = event.url;
          }
        }
      }
    );
  }

}

```
