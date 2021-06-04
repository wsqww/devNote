## RxJs

### RxJs 基本介绍

RxJS 是 Reactive Extensions for JavaScript 的缩写，起源于 Reactive Extensions，是一个基于可观测数据流 Stream 结合观察者模式和迭代器模式的一种异步编程的应用库。RxJS 是 Reactive Extensions 在 JavaScript 上的实现。

RxJS 是一个库，它通过使用 observable 序列来编写异步和基于事件的程序。它提供了一个核心类型 Observable，附属类型 (Observer、 Schedulers、 Subjects) 和受 [Array#extras] 启发的操作符 (map、filter、reduce、every, 等等)，这些数组操作符可以把异步事件作为集合来处理。

可以把 RxJS 当做是用来处理事件的 Lodash 。

ReactiveX 结合了 观察者模式、迭代器模式 和 使用集合的函数式编程，以满足以一种理想方式来管理事件序列所需要的一切。

在 RxJS 中用来解决异步事件管理的的基本概念是：

- Observable (可观察对象): 表示一个概念，这个概念是一个可调用的未来值或事件的集合。
- Observer (观察者): 一个回调函数的集合，它知道如何去监听由 Observable 提供的值。
- Subscription (订阅): 表示 Observable 的执行，主要用于取消 Observable 的执行。
- Operators (操作符): 采用函数式编程风格的纯函数 (pure function)，使用像 map、filter、concat、flatMap 等这样的操作符来处理集合。
- Subject (主体): 相当于 EventEmitter，并且是将值或事件多路推送给多个 Observer 的唯一方式。
- Schedulers (调度器): 用来控制并发并且是中央集权的调度员，允许我们在发生计算时进行协调，例如 setTimeout 或 requestAnimationFrame 或其他。

### 学习资料

- [30天精通RxJs](https://blog.jerry-hong.com/series/rxjs/)
- [RxJs 官方文档](https://rxjs.dev/guide/overview)
- [RxJs 中文文档](https://cn.rx.js.org/manual/overview.html)

## 学习 [30天精通RxJs](https://blog.jerry-hong.com/series/rxjs/)

### 00 

##### 大綱規劃
- 核心觀念篇 (5天)：介紹 Rx 相關的核心觀念，及前置知識等。
- Observable (12～14天)：講解 Observable 及其方法，並會搭配簡單的範例和使用場景。
- Subject (5～6天)：講解 Subject，包含觀念以及各種不同的子類別。
- 實務應用 (4～6天)：會選實務上較為複雜的需求，作為一段學習的完整應用練習。

### 01


### 02


### 03


### 04


### 05


### 06


### 07


### 08


### 09


### 10


### 11


### 12


### 13


### 14


### 15


### 16


### 17


### 18


### 19


### 20


### 21


### 22


### 23


### 24


### 25


### 26


### 27


### 28


### 29


### 30


### 31


