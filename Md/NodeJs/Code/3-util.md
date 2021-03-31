
### util包
```node
const util = require('util');
// 终端 完整打印出对象
// showHidden 在格式化结果中包含对象的非枚举符号和属性。 还包括 WeakMap 和 WeakSet 条目以及用户定义的原型属性(不包括方法属性)。 默认值: false
// depth: 格式化对象时递归的次数。 这对检查深层obj很有用。 递归到最大调用堆栈大小，传递 Infinity 或 null。 默认值: 2
console.log(util.inspect(util, { showHidden: true, depth: null }));
```