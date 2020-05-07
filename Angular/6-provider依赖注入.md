### 依赖注入(DI)

#### 注入依赖的不同方式
1. 在module模块中注入
2. 在component组件中注入
```typescript
export class Component implements OnInit {
  constructor(
    private apiSer: apiService,
  ){}
}
```
3. provider 对象字面量 [DI提供者](https://angular.cn/guide/dependency-injection-providers)
```typescript
[{
  provide: XXX / APP_CONFIG / APP_INITIALIZER / PLATFORM_INITIALIZER  / APP_BOOTSTRAP_LISTENER,
  useClass: '',
  useExisting: '',
  useValue: '',

}]
```
- PLATFORM_INITIALIZER：平台初始化之后调用的回调函数。
- APP_BOOTSTRAP_LISTENER：每个启动组件启动完成之后调用的回调函数。这个处理器函数会收到这个启动组件的 ComponentRef 实例。
- APP_INITIALIZER：应用初始化之前调用的回调函数。注册的所有初始化器都可以（可选地）返回一个 Promise。所有返回 Promise 的初始化函数都必须在应用启动之前解析完。如果任何一个初始化器失败了，该应用就不会继续启动。
