### js的异步

- 回调函数
- 事件监听
- 发布/订阅
- Promise 对象
- async/await


#### Generator
- [es6 Generators详解](https://juejin.im/entry/5a45f4816fb9a044fa1a3023)
- [Generator 函数的含义与用法](http://www.ruanyifeng.com/blog/2015/04/generator.html)

yield * 的操作数不一定非得是一个generator函数生成的对象，可以是任何可迭代的

```javascript
function* bla() {
    yield 'sequence';
    yield* ['of', 'yielded'];
    yield 'values';
}
const arr = [...bla()];
// ['sequence', 'of', 'yielded', 'values']
```
