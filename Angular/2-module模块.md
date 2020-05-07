#### 模块（module）
```typescript
//app.module.ts

import { NgModule }      from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
@NgModule({
  imports:      [ BrowserModule ],
  providers:    [ Logger ],
  declarations: [ AppComponent ],
  exports:      [ AppComponent ],
  bootstrap:    [ AppComponent ]
})
export class AppModule { }
```
- imports: 本模块声明的组件模板需要的类所在的其它模块。
- declarations: 声明本模块中拥有的视图类。Angular 有三种视图类：组件、指令和管道。
- exports: declarations 的子集，可用于其它模块的组件模板。
- bootstrap: 指定应用的主视图（称为根组件），它是所有其它视图的宿主。只有根模块才能设置 bootstrap 属性。
- providers: 服务的创建者，并加入到全局服务列表中，可用于应用任何部分。*（注意：[DI提供者-预定义令牌与多提供者](https://angular.cn/guide/dependency-injection-providers#non-class-dependencies) ）*

#### 根模块


#### 核心模块


#### 业务模块


#### 布局模块


#### 共享模块