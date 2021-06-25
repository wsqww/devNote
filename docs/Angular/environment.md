## environment 环境变量

根据不同运行环境 获取对应的 环境变量

#### 文件目录
```javascript
/*  /src/environments/
*        └──environment.ts
*        └──environment.prod.ts
*        └──environment.stage.ts
*/

export const environment = {
  production: false,
  apiUrl: 'http://my-api-url'
};
```

#### 使用环境变量

  1. 配置文件 angular.json 修改替换文件
  CLI 的主配置文件 angular.json 中的每个构建目标下都包含了一个 fileReplacements 区段。这能让你把任何文件替换为针对特定目标的版本
  ```json
  {
    "configurations": {
      "production": {
        "fileReplacements": [
          {
            "replace": "src/environments/environment.ts",
            "with": "src/environments/environment.prod.ts"
          }
        ]
      }
    }
  }
  ```
  2. 应用中 引入 environment
  ```javascript
  import { environment } from '/src/environments/environment';
  ```

