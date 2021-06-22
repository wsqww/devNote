## route 路由

#### 路由文件 RoutesRoutingModule

```javascript
// routes-routing.module.ts

import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { TestComponent } from './test/test.component';
import { AudioComponent } from './test/audio/audio.component';

import { BehaviorSubjectComponent } from './behavior-subject/behavior-subject.component';
import { UploadComponent } from './upload/upload.component';
import { AnimationComponent } from './animation/animation.component';
import { NgZoneDemoComponent } from './ng-zone-demo/ng-zone-demo.component';
import { PaginationTestComponent } from './pagination-test/pagination-test.component';
import { DragComponent } from './drag/drag.component';
import { RxjsComponent } from './rxjs/rxjs.component';

const routes: Routes = [
  {
    path: 'test', component: TestComponent,
    children: [
      { path: 'audio', component: AudioComponent, data: {title: 'audio'} }
    ]
  },
  {
    path: 'behaviorsubject', component: BehaviorSubjectComponent, data: {title: 'rxjs '}
  },
  {
    path: 'upload', component: UploadComponent, data: {title: 'upload image'}
  },
  {
    path: 'animation', component: AnimationComponent, data: { title: 'animation', animation: 'animation' }
  },
  {
    path: 'ng_zone_demo', component: NgZoneDemoComponent, data: {title: 'ng zone demo'}
  },
  {
    path: 'pagination_test', component: PaginationTestComponent, data: {title: 'pagination test'}
  },
  {
    path: 'drag', component: DragComponent, data: {title: 'drag'}
  },
  {
    path: 'rxjs', component: RxjsComponent, data: {title: 'rxjs'}
  },
  { path: '**', redirectTo: '/' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class RoutesRoutingModule { }

```
```javascript
// routes.module.ts

import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

// module
import { RoutesRoutingModule } from './routes-routing.module';
import { LayoutModule } from '@layout/layout.module';
import { SharedModule } from '@shared/shared.module';

// 页面组件
import { TestComponent } from './test/test.component';
import { AudioComponent } from './test/audio/audio.component';
import { BehaviorSubjectComponent } from './behavior-subject/behavior-subject.component';
import { SendComponent } from './behavior-subject/send/send.component';
import { AcceptComponent } from './behavior-subject/accept/accept.component';
import { UploadComponent } from './upload/upload.component';
import { AnimationComponent } from './animation/animation.component';
import { NgZoneDemoComponent } from './ng-zone-demo/ng-zone-demo.component';
import { PaginationTestComponent } from './pagination-test/pagination-test.component';
import { DragComponent } from './drag/drag.component';
import { RxjsComponent } from './rxjs/rxjs.component';


@NgModule({
  declarations: [
    TestComponent,
    AudioComponent,
    BehaviorSubjectComponent,
    SendComponent,
    AcceptComponent,
    UploadComponent,
    AnimationComponent,
    NgZoneDemoComponent,
    PaginationTestComponent,
    DragComponent,
    RxjsComponent,
  ],
  imports: [
    CommonModule,
    BrowserModule,
    BrowserAnimationsModule,
    RoutesRoutingModule,
    LayoutModule,
    SharedModule,
  ]
})
export class RoutesModule { }

```


#### 路由事件 [router event](https://angular.cn/api/router/Event)

可对路由事件进行拦截，分别在不同阶段进行不同的事件处理

```javascript
// app.component
import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Router, ActivatedRoute, NavigationError, NavigationEnd } from '@angular/router';
import { filter, map, mergeMap } from 'rxjs/operators';
import { Title } from '@angular/platform-browser';

import { PageAnimations } from '@shared/animations/page.animations';

@Component({
  selector: 'app-root',
  template: `<router-outlet></router-outlet>`,
  styles: ['']
})
export class AppComponent {
  constructor(
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private titleSer: Title,
  ) {
    this.router.events.pipe(
      filter(event => {
        // 其他事件 在此处 处理
        if (event instanceof NavigationError) {
          // console.log(event);
          // 代码build上线之后-懒加载报错chunkLoadError, 拦截错误 刷新页面
          const chunkFailedMessage = /Loading chunk [\d]+ failed/;
          if (chunkFailedMessage.test(event.error.message)) {
            window.location.href = event.url;
          }
        }
        // 返回 导航结束 事件
        return event instanceof NavigationEnd;
      }),
      map(() => this.activatedRoute), // 当前激活路由
      map(route => {
        // console.log(route);
        // 遍历路由表以获取到每一个页面对应的路由信息
        while (route.firstChild) { route = route.firstChild; }
        return route;
      }),
      filter(route => route.outlet === 'primary'),
      mergeMap(route => route.data)
    ).subscribe(
      (data) => {
        // console.log(data);
        const oldTitle = this.titleSer.getTitle();
        const signIndex = oldTitle.indexOf('|');
        const titlePrefix = signIndex > -1 ? oldTitle.substring(0, signIndex + 2) : `${oldTitle} | `;
        const newTitle = `${titlePrefix}${data.title ? data.title : ''}`;
        this.titleSer.setTitle(newTitle);
      }
    );
  }

  animationRoute(outlet: RouterOutlet) {
    // console.log(outlet.activatedRouteData);
    return outlet && outlet.activatedRouteData && outlet.activatedRouteData.animation;
  }
}


```
