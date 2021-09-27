## RxJs

### 学习资料

- [30 天精通 RxJs](https://blog.jerry-hong.com/series/rxjs/)
- [RxJs 官方文档](https://rxjs.dev/guide/overview)
- [RxJs 中文文档](https://cn.rx.js.org/manual/overview.html)

## RxJs 简介

RxJS 是 Reactive Extensions for JavaScript 的缩写，起源于 Reactive Extensions，是一个基于可观测数据流 Stream 结合观察者模式和迭代器模式的一种异步编程的应用库。RxJS 是 Reactive Extensions 在 JavaScript 上的实现。

RxJS 是一个库，它通过使用 observable 序列来编写异步和基于事件的程序。它提供了一个核心类型 Observable，附属类型 (Observer、 Schedulers、 Subjects) 和受 [Array#extras] 启发的操作符 (map、filter、reduce、every, 等等)，这些数组操作符可以把异步事件作为集合来处理。

可以把 RxJS 当做是用来处理事件的 Lodash 。

ReactiveX 结合了 观察者模式、迭代器模式 和 使用集合的函数式编程，以满足以一种理想方式来管理事件序列所需要的一切。

### 优势

- 三大统一，异步与同步，获取与订阅，现在与未来
- 可组合的数据变更过程

在实际应用中，很多问题可以抽象成数据流，网页的 DOM 事件、Ajax 获取数据资源等操作都可以看成(抽象)是一个数据流。
RxJS 擅长处理异步操作，因为它对数据是采用推的处理方式。当一个数据产生的时候，会被推送给对应的处理函数，这个处理函数不用关心数据是同步产生的还是异步产生的，异步与同步做到了有机统一，实现了同一套 API 处理异步、同步数据流。
Rxjs 中的数据流可能包含复杂的功能，但是可以分解成一个个单体来实现，实现某个小功能就是操作符，学习 RxJS 就是学习如何组合操作符来解决复杂问题。

### RxJS 核心概念：

- `Observable` (可观察对象): 表示一个概念，这个概念是一个可调用的未来值或事件的集合。
- `Observer` (观察者): 一个回调函数的集合，它知道如何去监听由 Observable 提供的值。
- `Subscription` (订阅): 表示 Observable 的执行，主要用于取消 Observable 的执行。
- `Operators` (操作符): 采用函数式编程风格的纯函数 (pure function)，使用像 map、filter、concat、flatMap 等这样的操作符来处理集合。
- `Subject` (主体): 相当于 EventEmitter，并且是将值或事件多路推送给多个 Observer 的唯一方式。
- `Schedulers` (调度器): 用来控制并发并且是中央集权的调度员，允许我们在发生计算时进行协调，例如 setTimeout 或 requestAnimationFrame 或其他。


<!-- ### 函数式编程

### 流

### 理解 Observable

### 认识运算符 -->

### 操作符

#### 创建

```js
  mCreate() {
    const source = new Observable(observer => {
      observer.next('Jerry');
      observer.next('Anna');
      observer.complete();
    });

    source.subscribe((x) => console.log('create', x));
  }

  // 从一个数组、类数组对象、Promise、迭代器对象或者类 Observable 对象创建一个 Observable.
  mFrom() {
    const source = from([10, 20, 30]);
    source.subscribe((x) => console.log('from', x));
  }

  // 创建一个 Observable，该 Observable 发出来自给定事件对象的指定类型事件。可用于浏览器环境中的Dom事件或Node环境中的EventEmitter事件等。
  mFromEvent() {
    const source = fromEvent(document.getElementById('fromEvent'), 'click');
    source.subscribe((x) => console.log('', x));
  }

  // 将Promise转换成Observable， rxjs v6 之后不再 将 fromPromise 作为公共的 Api，而是放在 from 中
  mFromPromise() {
    const mPromise = new Promise((resolve, reject) => {
      setTimeout(() => {
        resolve('my promise');
      }, 1500);
    });
    const source = from(mPromise);
    source.subscribe((x) => console.log('fromPromise', x));
  }

  // 使用该操作符创建的Observable可以在指定时间内发出连续的数字
  mInterval() {
    const source = interval(1000);
    source.subscribe((x) => console.log('interval', x));
  }

  // 与from的能力差不太多，只不过在使用的时候是传入一个一个参数来调用的，有点类似于js中的concat方法
  mOf() {
    const source = of('Jerry', 'Anna');
    source.subscribe((x) => console.log('of', x));
  }

  // 将数据源重复n次，n为你传入的数字类型参数。
  mRepeat() {
    // const source = of(1, 2, 3).pipe( repeat(3) );
    const source = interval(1000).pipe( take(3), repeat(3) );
    source.subscribe((x) => console.log('repeat', x));
  }

  // 创建一个 Observable ，它发出指定范围内的数字序列
  mRange() {
    const source = range(1, 6);
    source.subscribe((x) => console.log('range', x));
  }
```

#### 转换操作符

```js
  // 将过往的值收集到一个数组中，并且仅当另一个 Observable 发出通知时才发出此数组。这相当于有一个缓冲区，将数据收集起来，等到一个信号来临，再释放出去。
  mBuffer() {
    const source = interval(500);
    this.obsSub(source, 'buffer source');
    const click = fromEvent(document.getElementById('bufferEnd'), 'click');
    const result = source.pipe( buffer(click) );
    source.subscribe((x) => console.log('buffer', x));
  }

  // 参考 js中数组的map方法
  mMap() {
    const source = interval(1000).pipe( take(3) );
    const result = source.pipe( map(data => data * 2 ) );
    source.subscribe((x) => console.log('map', x));
  }

  // 忽略数据源发送的数据，只发送指定的值（传参）
  mMapTo() {
    const source = interval(1000).pipe( take(3) );
    const result = source.pipe( mapTo('mapTo') );
    source.subscribe((x) => console.log('mapTo', x));
  }

  // mergeMap主要做了一个整合的能力，我们可以将它与map进行对比，我们可以发现map的返回值必须是一个数值，而mergeMap返回值是要求是一个Observable，也就是说，我们可以返回任意转换或具备其他能力的Observable。
  mMergeMap() {
    const source = interval(1000).pipe( take(5) );
    const result = source.pipe( mergeMap(data => data % 2 ? of(data) : EMPTY) );
    source.subscribe((x) => console.log('mergeMap', x));
  }

  // 将源值投射为一个合并到输出 Observable 的 Observable,以串行的方式等待前一个完成再合并下一个 Observable
  mConcatMap() {
    const source = interval(3000);
    const result =  source.pipe(
      concatMap(data => interval(1000).pipe( take(2) ))
    );
    source.subscribe((x) => console.log('concatMap', x));
  }

  // 主要作用首先会对多个Observable进行合并，并且具备打断能力，也就是说合并的这个几个Observable，某个Observable最先开始发送数据，这个时候订阅者能正常的接收到它的数据，但是这个时候另一个Observable也开始发送数据了，那么第一个Observable发送数据就被打断了，只会发送后来者发送的数据。
  mSwitchMap() {
    const source = new Observable(observable => {
      setTimeout(() => {
        observable.next('A');
      }, 1000);
    });
    const result = source.pipe(
      switchMap(data => {
        return new Observable(observable => {
          setTimeout(() => {
            observable.next(`${data}-B`);
          }, 1000);
        });
      })
    );
    console.log(`<< switchMap >>>>>>>>>>`);
    result.subscribe(
      (res) => {
        console.log(res);
      },
      (err) => console.log(err),
    );
  }

  // 用于选择出每个数据对象上的指定属性值。
  mPluck() {
    const source = of({name: '张三'}, {name: '李四'});
    const result = source.pipe( pluck('name') );
    source.subscribe((x) => console.log('pluck', x));
  }

  // 累加器操作符，可以用来做状态管理
  mScan() {
    const source = of('刘一', '陈二', '张三', '李四', '王五', '赵六', '孙七', '周八', '吴九', '郑十');
    const result = source.pipe( scan((acc, cur) => `${acc} --> ${cur}`, 'start') );
    source.subscribe((x) => console.log('scan', x));
  }
```

#### 过滤操作符

```js
  // 延时，并且 发出 最后一次发出的值; (类似于 防抖)
  mDebounceTime() {
    const source = interval(1000).pipe( take(8) );
    const result = source.pipe( debounceTime(2000) );
    source.subscribe((x) => console.log('debounceTime', x));
  }

  // 接受到值之后，一定时间内 不再接受其他值; (类似于 节流)
  mThrottleTime() {
    const source = interval(1000).pipe( take(6) );
    const result = source.pipe( throttleTime(2000) );
    source.subscribe((x) => console.log('throttleTime', x));
  }

  // 过滤掉重复的数据
  mDistinct() {
    const source = from([1, 2, 3, 2, 4, 3]);
    const result = source.pipe( distinct() );
    source.subscribe((x) => console.log('distinct', x));
  }

  // 与数组的 filter 相同
  mFilter() {
    const source = from([1, 2, 3, 2, 4, 3]);
    const result = source.pipe( filter(item => item !== 3) );
    source.subscribe((x) => console.log('filter', x));
  }

  // 只发出源 Observable 所发出的第一个值(或第一个满足条件的值)
  mFirst() {
    const source = from([1, 2, 3, 2, 4, 3]);
    const result = source.pipe( first() );
    // const result = source.pipe( first(item => item > 2) );
    source.subscribe((x) => console.log('first', x));
  }

  // 控制 发出值的 数量
  mTake() {
    const source = interval(1000).pipe( take(4) );
    source.subscribe((x) => console.log('take', x));
  }

  // 跳过前 N 个值
  mSkip() {
    const source = from([1, 2, 3, 4, 5, 6]).pipe( skip(2) );
    source.subscribe((x) => console.log('skip', x));
  }
```

### 组合操作符

```js
  // 将多个 Observable 合并为一个，串行；订阅者在获取值的时候 先获取完第一个，之后才开始收到后一个 Observable 的值
  mConcatAll() {
    const source = of(1, 2);
    const source2 = interval(1000).pipe( take(3) );
    const result = source.pipe(
      map(data => source2 ),
      concatAll(),
    );
    source.subscribe((x) => console.log('concatAll', x));
  }

  // 将多个 Observable 合并，并行，发送数据不分先后
  mMergeAll() {
    const source = interval(1000).pipe( take(3) );
    const source2 = interval(1000).pipe( map(item => `B${item}`), take(3) );
    const result = source.pipe(
      map(data => source2),
      mergeAll(),
    );
    source.subscribe((x) => console.log('mergeAll', x));
  }

  // 当任意 observable 发出值时，发出每个 observable 的最新值。
  mCombineLatest() {
    const s1 = interval(2000).pipe( take(3) );
    const s2 = interval(1000).pipe( take(5) );
    const result = combineLatest([s1, s2]).pipe( map( ([a, b]) => `${a} + ${b}`) );
    source.subscribe((x) => console.log('combineLatest', x));
  }

  // 将多个 Observable 组合以创建一个 Observable，该 Observable 的值是由所有输入 Observables 的值按顺序计算而来的
  mZip() {
    const s1 = interval(2000).pipe( take(3) );
    const s2 = interval(1000).pipe( take(5) );
    const result = zip(s1, s2).pipe( map( ([a, b]) => `${a} + ${b}` ));
    source.subscribe((x) => console.log('zip', x));
  }

  // 返回的 Observable 会先发出作为参数指定的项，然后再发出由源 Observable 所发出的项
  mStartWith() {
    const source = interval(1000).pipe( take(3) );
    const result = source.pipe( startWith(666) );
    source.subscribe((x) => console.log('startWith', x));
  }

  // 通过只订阅最新发出的内部 Observable ，将高阶 Observable 转换成一阶 Observable
  mSwitch() {
    const btn = document.getElementById('switch');
    const source = fromEvent(btn, 'click');
    const result = source.pipe( switchMap(x => interval(1000).pipe( take(3) ) ) );
    source.subscribe((x) => console.log('switchMap', x));
  }
```



