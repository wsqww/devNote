## RxJs

### 学习资料

- [30 天精通 RxJs](https://blog.jerry-hong.com/series/rxjs/)
- [RxJs 官方文档](https://rxjs.dev/guide/overview)
- [RxJs 中文文档](https://cn.rx.js.org/manual/overview.html)
- [RxJs 从入门到放弃](https://juejin.cn/column/7008727416872894495)

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


### 冷/热 Observable

#### Cold Observable

- 推送值的生产者 producer 来自 observable 内部。将会推送什么样的值在 observable 创建时被定义下来，不会改变
- producer 与 observer 是一对一的关系，即是 unicast (单播)的。
- 当有 observer 订阅时，producer 会把预先定义好的若干值依次推送给每个 observer

```js
mColdObservable() {
  const source = new Observable(subscriber => {
    console.log('stream 开始');
    subscriber.next(1);
    subscriber.next(2);
    subscriber.next(3);
    subscriber.next(4);
    console.log('steam 结束');
    subscriber.complete();
  });

  source.subscribe(data => console.log(`Observable 第一次订阅: ${data}`));
  // 1, 2, 3, 4
  source.subscribe(data => console.log(`Observable 第二次订阅: ${data}`));
  // 1, 2, 3, 4
}
```

对于每次订阅来说，都是一次新的数据流产生。我们可以把整个数据流当作是一条水管管路设计图，每次订阅时，都是依照这条管路组装出新的水管线路，然后装水打开阀门让水流出，这样的好处是每次订阅都是新数据流的，所以不会互相影响。这种每次订阅都重新开始的流程，称为 Cold Observable 。Cold 通常代表被用到时才启动的行为，在这里也是如此，说明这个 Observable 被订阅时才会启动。

::: tip
Cold Observable 每次订阅后就只会有一个观察者， 下一个观察者要进行订阅时是一次新的数据流程，因此Cold Observable与observer是一对一关系
:::

#### Hot Observable

- 推送值的producer来自observable外部，何时推送以及推送什么样的值在创建时都是未知的。producer与observer是一对多的关系，即multicast (多播)的。
- 每当有observer订阅时，会将observer注册到观察者列表中。
- 当外部的producer被触发或执行时，会将值同时推送给所有的observer

```js
mHotObservable() {
  const source$ = new Subject();
  source$.subscribe(data => console.log(`Subject 第一次订阅: ${data}`));
  // 1, 2, 3, 4
  source$.next(1);
  source$.next(2);
  source$.subscribe(data => console.log(`Subject 第二次订阅: ${data}`));
  // 3, 4
  source$.next(3);
  source$.next(4);
  source$.subscribe(data => console.log(`Subject 第三次订阅: ${data}`));
  // (沒收到任何事件就结束了)
  source$.complete();
}
```

一样当作水管线路来看的话，Subject就是一条随时可以有数据流过的线路,每次订阅都只是等待这条水管线路传送资料过来而已，而这样的好处是更有弹性，因为不用事先把所有流程准备好，可以随时依照不同的情况在程序内让新的事件发生(调用next就好)，所有的观察者都会及时收到这份数据。

随时订阅就是等待最新数据的流程，称为Hot Observable，Hot 本身就有随时准备好的意思，因此每次订阅时不用从头来过，只关注最新事件即可。
由于只会有一个Observable,在每次事件发生的时都会推送给所有的observer， 因此Hot Observable与observer的关系是一对多的关系


两个 多播 暖模式 例子：
```js
// 多播暖模式
mPubHot1() {
  const source = interval(1000).pipe(take(3), share());
  source.subscribe((x) => console.log(x));
  setTimeout(() => {
    source.subscribe((x) => console.log('setTimeout2', x));
  }, 2000);
  // Observable 推送结束后，新的订阅 会重新接收一遍
  setTimeout(() => {
    source.subscribe((x) => console.log('setTimeout3', x));
  }, 3000);
}

mPubHot2() {
  // 每次有 新的订阅 都重新接受
  const source = new ReplaySubject();
  source.subscribe((x) => console.log(x));
  source.next(1);
  source.next(2);
  // setTimeout(() => { source.next(3); }, 2000);
  // setTimeout(() => { source.next(4); }, 3000);
  setTimeout(() => { source.next(5); }, 4000);
  setTimeout(() => {
    source.next(3);
    source.subscribe((x) => console.log('setTimeout2', x));
  }, 2000);
  setTimeout(() => {
    source.next(4);
    source.subscribe((x) => console.log('setTimeout3', x));
  }, 3000);
}
```

#### Warm Observable

严格意义上来说并没有办法把 Cold Observable 转成 Hot Observable ，因为Cold Observable 一定要有个开始的动作才会产生数据流，而 Hot Observable 在被建立的时候就是启动的状态了。但是我们可以透过一些 Multicast 类的 operators 来达到类似目的，例如share() 。在Rxjs 6或更早的版本中，可能会看到publish,内部也是调用share实现的，在7中已经departed。

在第一次订阅开始前不会启动推送，直到第一次订阅发生启动，所有观察者都是订阅同一个数据流，一对多关系

```js
mWarmObservable() {
  const source$ = new Observable(observe => {
    console.log('stream 开始');
    setTimeout(() => observe.next(1), 100);
    setTimeout(() => observe.next(2), 200);
    setTimeout(() => observe.next(3), 300);
    setTimeout(() => {
      observe.next(4);
      observe.complete();
      console.log('stream 结束');
    }, 400);
  });

  const hotSource$ = source$.pipe( share() );

  setTimeout(() => {
    hotSource$.subscribe(data => console.log(`Observable 第一次订阅： ${data}`));
    setTimeout(() => {
      hotSource$.subscribe(data => console.log(`Observable 第二次订阅：${data}`));
    }, 200);
  }, 1000);
}
```
:::tip
这里的setTimeout让整个数据发射有比较明显的时间顺序，没有什么特别的作用
:::

之后我们通过 share() operator 让整个 Observable 变成 multicast 的 Observable ，这时候整个数据流还没开始，必须有第一次订阅的动作，才会开始推送数据。由于必须要先有一次订阅的动作让它启动，因此也称不 Warm Observable

在上面代码中我们先等待一秒钟才开始订阅，可以到在这段时间不会打印begin的文字，直到第一次订阅开始。第二次订阅再次放慢一点进行订阅，已确认收到数据不会重新开始。

整体执行结果如下:
```
stream 开始
Observable 第一次订阅：1
Observable 第一次订阅： 2
Observable 第一次订阅： 3
Observable 第二次订阅：3
Observable 第一次订阅： 4
Observable 第二次订阅：4
stream 结束
```

有些时间我们会设计好一个 Cold Observable，但又不希望每次订阅时都要重新来过,例如 ajax/websocket 等，很适合把 unicast 转成 multicast 类型的 Observable。

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



