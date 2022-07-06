# git 规范 & 辅助插件

# 使用的插件及说明

## husky 和 commitlint

1. 安装 `husky`
   ```shell
   npm install -D husky
   ```

   修改 `package.json` 中的 script
   ```json
   {
     "scripts": {
       "prepare": "husky install"
     }
   }
   ```
   修改后，执行 `npm run prepare`，会在根目录生成文件夹 `.husky`;

   执行 `npx husky add .husky/commit-msg ''`;

   此命令 会在 `.husky` 文件 创建文件 `commit-msg`，修改最后一行：
   ```
   #!/usr/bin/env sh
   . "$(dirname -- "$0")/_/husky.sh"

   #--no-install 参数表示强制npx使用项目中node_modules目录中的commitlint包
   npx --no-install commitlint --edit $1
   ```

2. 安装 `commitlint`
   ```
   npm install -D @commitlint/cli @commitlint/config-conventional
   ```
   在根目录创建文件 `commitlint.config.js` 并添加配置，参考 [commitlint 配置](https://github.com/conventional-changelog/commitlint/blob/master/docs/reference-rules.md);
   ```javascript
   // commitlint.config.js
   module.exports = {
     extents: ['@commitlint/config-conventional'],
     rules: {
       // Header
       'header-max-length': [2, 'always', 72],
       // <type>枚举
       'type-enum': [
         2,
         'always',
         [
           'feat',
           'bug',
           'fix',
           'ui',
           'docs',
           'style',
           'perf',
           'refactor',
           'release',
           'deploy',
           'test',
           'chore',
           'revert',
           'build',
         ],
       ],
       // <type> 不能为空
       'type-empty': [2, 'never'],
       // <type> 格式 小写
       'type-case': [2, 'always', 'lower-case'],
       // <scope> 不能为空
       // 'scope-empty': [2, 'never'],
       // <scope> 格式 小写
       'scope-case': [2, 'always', 'lower-case'],
       // <subject> 不能为空
       'subject-empty': [2, 'never'],
       // <subject> 以.为结束标志
       'subject-full-stop': [2, 'never', '.'],
       // <subject> 格式
       // 可选值
       // 'lower-case' 小写 lowercase
       // 'upper-case' 大写 UPPERCASE
       // 'camel-case' 小驼峰 camelCase
       // 'kebab-case' 短横线 kebab-case
       // 'pascal-case' 大驼峰 PascalCase
       // 'sentence-case' 首字母大写 Sentence case
       // 'snake-case' 下划线 snake_case
       // 'start-case' 所有首字母大写 start-case
       'subject-case': [2, 'never', []],
       // <body> 以空行开头
       'body-leading-blank': [1, 'always'],
       // <footer> 以空行开头
       'footer-leading-blank': [1, 'always'],
     },
   };
   ```

3. 正常提交代码 即可使用
   ```shell
   git add .
   git commit -m 'commit test'

   # 终端会提示如下错误信息 -----------------
   ⧗   input: commit test
   ✖   type may not be empty [type-empty]
   ✖   subject may not be empty [subject-empty]
   ```

## customizable 交互式操作

1. 安装 customizable
   ```
   npm install -D commitizen cz-conventional-changelog commitlint-config-cz cz-customizable
   ```
   修改 `package.json` 中的 scripts
   ```json
   {
     "scripts":{
       commit:"git-cz"
     }
   }
   ```
   修改 `package.json` 中的 config
   ```json
   // 使用自定义规范则使用
   {
     "config": {
       "commitizen": {
         "path": "node_modules/cz-customizable"
       }
     }
     // 或者
     "config": {
       "cz-customizable": { // 可以对.cz-config.js 进行重命名
         "config": "config/config.js"
       }
     }
   }
   ```

2. 在根目录创建文件 `.cz-config.js`
   添加配置项，参考 [customizable 配置](https://github.com/leoforfree/cz-customizable/blob/master/cz-config-EXAMPLE.js)；
   ```javascript
   // .cz-config.js
   module.exports = {
     types: [
       { value: 'feat',  name: 'feature: 增加新功能' },
       { value: 'bug', name: 'bug: 测试反馈bug列表中的bug号' },
       { value: 'fix', name: 'fix: 修复bug' },
       { value: 'ui', name: 'ui: 更新UI'},
       { value: 'docs', name: 'docs: 文档变更'},
       { value: 'style', name: 'style: 代码格式(不影响代码运行的变动)'},
       { value: 'perf', name: 'perf: 性能优化'},
       { value: 'refactor', name: 'refactor: 重构(既不是增加feature，也不是修复bug)'},
       { value: 'release', name: 'release: 发布' },
       { value: 'deploy', name: 'deploy: 部署' },
       { value: 'test', name: 'test: 增加测试' },
       { value: 'chore',  name: 'chore: 构建过程或辅助工具的变动(更改配置文件)' },
       { value: 'revert', name: 'revert: 回退' },
       { value: 'build', name: 'build: 打包' },
     ],
     // override the messages, defaults are as follows
     messages: {
       type: 'type 请选择提交类型:',
       customScope: 'scope 请输入您修改的范围(可选):',
       subject: 'subject 请简要描述提交 message (必填):',
       body: 'body 请输入详细描述(可选，enter 可跳过):',
       footer: 'footer 重大/不兼容 的变更理由(可选，enter 可跳过):',
       confirmCommit: '确认使用以上信息提交？(y/n/e/h)',
     },
     allowCustomScopes: true,
     // skipQuestions: ['body', 'footer'],
     subjectLimit: 72,
     footerPrefix : 'footer:'
   };
   ```
   修改 `commitlint.config.js` 的 extents，增加 'cz'；
   ```javascript
   // commitlint.config.js
   module.exports = {
     extents: ['@commitlint/config-conventional', 'cz'],
     rules: {...}
   };
   ```

3. 提交代码
   ```
   git add .
   npm run commit
   ```
   根据交互式提示 填写内容，`enter` 可跳过












<br><br><br><br><br></br>

# commit message

## 说明

   一个完整的 commit message 应该包含三个部分:

   - header
   - body
   - footer

   ```
   # header
   feat(dao): add db utils
   # body
   - describe for util1
   - describe for util2
   see trello 看板卡片
   # footer
   BREAKING CHANGE:...



   <type>(<scope>):<subject>
   <body>
   <footer>
   ```


### header

   header 只有一行,由三部分组成:
   `<type>(<scope>):<subject>`


#### type

   说明提交的类别,只允许使用下面的类型.

#### **type可选值**

   - feat *新功能(feature)*
   - fix *用于修复问题*
   - docs *文档*
   - style *修改格式(不影响代码运行的变动)*
   - refactor *重构*
   - perf *优化相关*
   - test *增加测试用例*
   - revert *回滚*
   - merge *合并代码*
   - chore *构建过程或辅助工具的变动 如 CI CD*

#### scope(可选)

   是可选的,用于说明此次提交影响范围

#### subject

   对提交的简短描述,不超过50字符
   **规范**
   动词使用第一人称现在时.如 fix 而不是 fixed,add 而不是 added.
   首字母小写.
   结尾不需要句号.



### body(可选)

   body 是可选的,更详细的描述,对于简单的提交也可缺省
   *规范*
   动词使用第一人称现在时.如 fix 而不是 fixed,add 而不是 added.
   用换行分割信息
   说明动机和修改前后对比



### footer(可选)

   对于不兼容的变更,footer以 `BREAKING CHANGE` 开头.
   后面是变动描述,理由等.



### 示例

*vue 项目(同样使用AngularJS规范)里的 git commit message*


    feat(reactivity): `proxyRefs` method and `ShallowUnwrapRefs` type (#1682)
    BREAKING CHANGE: template auto ref unwrapping are now applied shallowly,
    i.e. only at the root level. See https://github.com/vuejs/vue-next/pull/1682 for more details.


    fix(hmr): should update el for `HYDRATE_EVENTS` patchFlags node (#1707)
    fix https://github.com/vitejs/vite/issues/613


    refactor(runtime-core): adjust error handling behavior
    - Crash in dev to make the errors more noticeable
    - Recover in prod to reduce impact on end users


# 参考

  - [https://www.conventionalcommits.org/en/v1.0.0/](https://www.conventionalcommits.org/en/v1.0.0/)
  - [https://developers.google.com/blockly/guides/modify/contribute/commits](https://developers.google.com/blockly/guides/modify/contribute/commits)
  - [https://github.com/angular/angular.js/blob/master/DEVELOPERS.md#-git-commit-guidelines](https://github.com/angular/angular.js/blob/master/DEVELOPERS.md#-git-commit-guidelines)
