## 如何在 angular 中使用 mathquill

- `Browser`: 使用 [mathquill](https://www.npmjs.com/package/mathquill);
- `Cli`: 使用 [ngx-mathquill](https://www.npmjs.com/package/ngx-mathquill);
- 两者内部方法相同，引入方式不同；

### `angular8` 使用 `ngx-mathquill`

#### 引入 `Jquery` ，并需要全局配置

`mathquill` 基于 `Jquery` 实现，所以需要引入 Jquery

1. 安装 npm 包

```bash
npm install jquery --save
npm install @types/jquery
```

2. tsconfig.json

```json
{
  "types": ["jquery"]
}
// types用于指定需要包含的模块，只有在这里列出的模块的声明文件才会被加载
```

3. angular.json

```json
{
  "scripts": ["node_modules/jquery/dist/jquery.slim.min.js"]
}
// jquery.slim.min.js是移除了ajax和特效的版本
```

之后 在项目中 可以全局使用 Jquery `$`;

#### 引入 ngx-mathquill

1. 安装 npm 包

```dash
npm install ngx-mathquill
```

2. 引入 mathquill 样式文件
   angular.json

```json
{
  ...
  "options": {
    "assets": [
      "src/favicon.ico", "src/assets",
      { "glob": "**/*", "input": "./node_modules/ngx-mathquill/mathquill/", "output": "./mathquill/" }
    ],
  }
}
```

3. 页面中使用
   component.ts

```js
import { MathQuillLoader } from "ngx-mathquill";
MathQuillLoader.loadMathQuill((mathquill) => {
  // do what you want here
  // for example:
  console.log(mathquill.getInterface(2));
});
```

