### service服务 

[官方文档](https://angular.cn/guide/providers)
1. 创建 api.service.ts 文件
```shell
ng g service api
```
```typescript
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class ApiService {
  getSomething() {
    return 'something';
  }
}
```

2. 在 component 中注入 service 依赖
```typescript
import { Component, OnInit } from '@angular/core';
import { ApiService } from '@jc-service/api.service';

@Component({
  selector: 'app-XXX',
  templateUrl: './XXX.component.html',
  styleUrls: ['./XXX.component.scss']
})
export class SubMenuComponent implements OnInit {

  constructor(
    private apiSer: ApiService,
  ) { }

  ngOnInit() {
    const someThing = this.apiSer.getSomething();
    cosnole.log(someThing);
  }
}
```
使用组件限定服务提供者的作用域
组件中的提供者和 NgModule 中的提供者是彼此独立的。
在组件中提供服务，会限定该服务只能在该组件中有效（同一模块中的其它组件不能访问它）。
```typescript
@Component({
  /* . . . */
  providers: [UserService]
})
```

3. providedIn 属性
  - root, 把服务提供者添加到应用的根注入器中，它就在整个应用程序中可用
  - module, 也可以规定某个服务只有在特定的 @NgModule 中提供。当没有人注入它时，该服务就可以被摇树优化掉
```typescript
import { Injectable } from '@angular/core';
import { UserModule } from './user.module';

@Injectable({
  providedIn: UserModule,
  providedIn: 'root,
})
export class UserService {
}
```
```typescript
import { NgModule } from '@angular/core';

import { UserService } from './user.service';

@NgModule({
  providers: [UserService],
})
export class UserModule {
}
```