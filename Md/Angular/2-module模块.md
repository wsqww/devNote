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
```typescript
// '/src/app/app.module.ts'

```


#### 核心模块
```typescript
// '/src/app/core/core.module.ts'

```


#### 业务模块
```typescript
// '/src/app/routes/routes.module.ts'

```


#### 布局模块
```typescript
// '/src/app/layout/layout.module.ts'

```


#### 共享模块
```typescript
// '/src/app/shared/shared.module.ts'

```


### 总结

- AppModule 应该 导入 SharedModule、CoreModule、LayoutModule、RouterModule、Angular 模块(例如：- - - BrowserModule、BrowserAnimationsModule、HttpClientModule)；
- LayoutModule 应该 导入 SharedModule；
- LayoutModule 应该 导出所有 layout component；
- LayoutModule 不应该 导入和声明任何路由；
- RouterModule 应该 导入 SharedModule、CoreModule、LayoutModule以及RouteRoutingModule；
- CoreModule 应该 只保留providers属性；
- SharedModule 应该 包含 Angular 通用模块(例如：CommonModule、FormsModule、RouterModule、ReactiveFormsModule)、第三方通用依赖模块、所有组件（自己写的非业务相关的通用组件）、指令、管道；
- SharedModule 应该导出所有包含模块；
- SharedModule 不应该 有providers属性；
- Service 应该 承担应用的数据操作和数据交互；
- Componen 应该 组织视图层的展示和服务计算数据的收集
样式分层