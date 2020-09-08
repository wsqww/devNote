## Javascript

### 数据类型

- 基本类型 String Number Boolean Null Undefined Symbol BigInt(任意精度格式的整数) 
- 引用类型 Object (特殊对象 Array：Function Date Math)
- 如何判断数据类型 typeOf instanceOf(检测构造函数的 prototype 属性是否出现在某个实例对象的原型链上)

### 深浅拷贝

- JSON.parse(JSON.stringify(obj)) 无法拷贝undefined与symbol属性，无法拷贝循环引用对象
- 递归循环 判断是否为引用类型

### es6 新特性

[ES6中常用的10个新特性讲解](https://juejin.im/post/6844903618810757128#heading-1)
- const let；
- 模板字符串 `${}`；
- 箭头函数 () => {} 继承当前上下文的 this 关键字；
- 函数参数默认值 function(a=true){}
- 对象和数组解构 const student = ['Sam', 22, '男']; const student = { name: 'Sam', age: 22, sex: '男' }; const { name, age, sex } = student;
 - for...of 用于遍历一个迭代器，如数组;
 - for...in 用来遍历对象中的属性;
 - class 语法，不过，ES6的class不是新的对象继承模型，它只是原型链的语法糖表现形式;
 - 展开语法 const numbers = [1, 2, 3]; const test = [...numbers]; Obj 同理

### var let const

- var  可重复声明，存在变量提升；
- var let 不需要初始值，值可改变；
- let const 不可重复声明， 作用域为 代码块内，不存在变量提升；
- const 声明的 基本类型 不可改变，Object 可改变属性；

### 变量提升

[从本质上理解JavaScript中的变量提升](https://juejin.im/post/6844903895341219854)
- var提升 分两部分执行 var name = 'undefined'; name = 'Jon';
- 函数提升 函数声明在编译阶段会被添加到词法环境中，当JavaScript引擎遇到函数时，它会从词法环境中找到这个函数并执行它

### cookie sessionStorage localStorage

<table>
  <thead>
    <tr>
        <th>特性</th>
        <th>Cookie</th>
        <th>localStorage</th>
        <th>sessionStorage</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>数据的生命期</td>
      <td> 一般由服务器生成，可设置失效时间。如果在浏览器端生成Cookie，默认是关闭浏览器后失效</td>
      <td>除非被清除，否则永久保存</td>
      <td>仅在当前会话下有效，关闭页面或浏览器后被清除</td>
    </tr>
    <tr>
      <td>存放数据大小</td>
      <td>4k左右</td>
      <td colspan="2">一般为5M</td>
    </tr>
    <tr>
      <td>与服务器端通信</td>
      <td>每次都会携带在HTTP头中，如果使用cookie保存过多数据会带来性能问题</td>
      <td colspan="2">仅在客户端（即浏览器）中保存，不参与和服务器的通信</td>
    </tr>
    <tr>
      <td>易用性</td>
      <td>需要自己封装函数使用，源生的Cookie接口不友好</td>
      <td colspan="2">源生接口可以接受，亦可再次封装来对Object和Array有更好的支持</td>
    </tr>
  </tbody>
</table>

### | call apply bind

- call 方法使用一个指定的 this 值和单独给出的一个或多个参数来调用一个函数。
- apply 方法调用一个具有给定this值的函数，以及以一个数组（或类数组对象）的形式提供的参数。
- bind 创建一个新的函数，被调用时，新函数的 this 被指定为 bind() 的第一个参数，而其余参数将作为新函数的参数，供调用时使用。

### 原型原型链

  使用 new 关键字创建一个新的实例，实例的 __proto__ 指向 原型函数的 prototype，以此类推，Object 的 __proto__  是 null

### http 状态码

### js的异步

- 定时器 setTimeout setInterval
- 回调函数
- Dom事件监听
- 请求[ajax与fetch](https://juejin.im/post/6844904136161361933#heading-68)
- 发布/订阅
- Promise 对象
- async/await

Generator
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

### 闭包

```javascript
var name = 'window';
(function(){
    console.log(name); // window
})();
```

### thi指向

```javascript
var name = 'window';
var  person1 =  {
    name: 'person',
    fun: function(name) {
        this.name = name;
    },
    fun1: function() {
        console.log(this.name);
    },
    fun2: () => console.log(this.name),
    fun3: function() {
        return function () {
            console.log(this.name);
        }
    },
    fun4: () => {
        return () => console.log(this.name);
    }
}

// var person1 = new person('person1');
var person2 = new person1.fun('person2');
console.log(person1, person2);

console.log('---------');
console.log(name); // window
person1.fun1(); // person1
person1.fun1.call(person2); // person2
console.log('---------');
person1.fun2(); // window
person1.fun2.call(person2); // window
console.log('---------');
person1.fun3()(); // window
person1.fun3.call(person2)(); // window
console.log('---------');
person1.fun4()(); // window
person1.fun4.call(person2)(); // window

```


### 事件循环

- 执行栈 -> 微任务 -> 宏任务
- 微任务：setTimeout/setInterval、
- 宏任务：promise

打印顺序
```javascript
async function async1() {
    console.log('async1 start'); // 2
    const a = await async2();
    console.log('async1'); // 6
    return a; // 若有 return 则下一轮 执行
}
async function async2() {
    console.log('async2'); // 3
    return 'return async2'
}

console.log('script start'); // 1

setTimeout(function(){
    console.log('setTimeout'); // 9
},0);

async1().then((res) => {
    console.log(res); // 8
});

new Promise((resolve, reject)=> {
    console.log('promise'); // 4
    resolve();
}).then(() => {
    console.log('promise then'); // 7
});

console.log('script end'); // 5

```

### 矩阵置0

```javascript
let arr1 = [
  [1, 1, 1, 1, 1],
  [1, 1, 0, 1, 1],
  [1, 1, 1, 1, 1],
  [1, 1, 1, 1, 1],
  [1, 1, 1, 1, 1],
];
let arr2 = [
  [1, 1, 1, 1, 1],
  [1, 1, 0, 1, 1],
  [1, 1, 1, 1, 1],
  [1, 0, 1, 1, 1],
  [1, 1, 1, 1, 1],
];

function setZero(arr) {
  let point = [];
  for (let x = 0; x < arr.length; x++) {
    for (let y = 0; y < arr.length; y++) {
      if (arr[x][y] === 0) {
        point.push({x, y});
      }
    }
  }
  point.forEach(item => {
    arr[item.x].fill(0);
    arr.forEach( (_, index) => {
      arr[index][item.y] = 0;
    });
  });
  return arr;
}
console.log(setZero(arr1));
console.log(setZero(arr2));
```
