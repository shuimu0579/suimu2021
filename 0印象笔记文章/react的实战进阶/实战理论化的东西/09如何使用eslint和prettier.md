## 如何使用 eslint 和 prettier

### eslint

> https://github.com/eslint/eslint

\$ npm install eslint --save-dev

\$ ./node_modules/.bin/eslint --init

> 在 vscode 中配置 http://www.imooc.com/article/252010

settings.json

```json
{
  "workbench.colorTheme": "Monokai",
  "workbench.iconTheme": "vscode-icons",
  "files.eol": "\n",
  "[markdown]": {
    "editor.quickSuggestions": true
  },
  "diffEditor.ignoreTrimWhitespace": true,
  "[cpp]": {},
  "editor.tabSize": 2,
  "javascript.updateImportsOnFileMove.enabled": "always",
  "editor.suggestSelection": "first",
  "vsintellicode.modify.editor.suggestSelection": "automaticallyOverrodeDefaultValue",
  "java.configuration.checkProjectSettingsExclusions": false,
  "eslint.options": {
    //下面这一句在vscode setting里面不用加，要加的话，路径一定要加对
    // "configFile": "/Users/apple/Desktop/oneident-recovery-ui-with-redux/.eslintrc.js"
  }
}
```

.babelrc

```json
{
  "presets": ["@babel/preset-env", "@babel/preset-react"],
  "plugins": ["@babel/plugin-syntax-dynamic-import"] //动态引入 js 模块
}
```

.eslintrc

```javascript
module.exports = {
  parser: 'babel-eslint', //指定一个解析器
  extends: 'airbnb', //继承自 airbnb 规范
  env: {
    //指定浏览器和 node 环境
    browser: true,
    node: true,
  },
  parserOptions: {
    ecmaFeatures: {
      jsx: true,
    },
    ecmaVersion: 2018,
    sourceType: 'module',
  },
  plugins: ['react'],
  rules: {
    //自定义的规则
    'no-undef': 0,
    'no-with': 2,
    'react/jsx-no-bind': 0,
    indent: [2, 2],
    'no-multiple-empty-lines': [
      1,
      {
        max: 1,
      },
    ],
    'no-use-before-define': 2,
    'react/prefer-stateless-function': 0,
    'react/jsx-filename-extension': 0,
    'import/prefer-default-export': 0,
    'import/no-unresolved': 0,
    'no-shadow': 0,
    'react/sort-comp': 0,
    'no-else-return': 0,
    'react/prop-types': 0,
    'no-unused-vars': [
      2,
      {
        vars: 'all',
        args: 'after-used',
      },
    ],
    camelcase: 0,
    'no-console': 0,
    'react/require-default-props': 0,
    'no-return-assign': 0,
    'react/no-array-index-key': 0,
    'max-len': 0,
    'react/no-multi-comp': 0,
    'react/forbid-prop-types': 0,
    'import/extensions': 0,
    'guard-for-in': 0,
    'no-restricted-syntax': 0,
    'dot-notation': 0,
    'class-methods-use-this': 0,
    'padded-blocks': 0,
    'one-var': 0,
    'no-trailing-spaces': 0,
    'arrow-body-style': 0,
    'no-mixed-operators': 0,
    'brace-style': 0,
    'no-mixed-spaces-and-tabs': [2, false],
    'no-multiple-empty-lines': [
      1,
      {
        max: 2,
      },
    ],
    'no-nested-ternary': 1,
    'no-redeclare': 2,
    'no-multi-spaces': 1,
    'no-plusplus': 0,
    'no-dupe-keys': 0,
    radix: 0,
    'comma-dangle': 0,
    'func-names': 0,
    semi: 0,
    'jsx-a11y/click-events-have-key-events': 0,
    'jsx-a11y/no-noninteractive-element-interactions': 0,
  },
}
```

eslint webpack.config.dev 文件的配置 (参考印象笔记 eslint 操作 20190531 这篇文章)

```js
module.exports = {
  // ...
  module: {
    rules: [
      {
        enforce: 'pre',
        test: /\.js$/,
        exclude: /node_modules/,
        loader: 'eslint-loader',
      },
      {
        test: /\.js$/,
        exclude: /node_modules/,
        loader: 'babel-loader',
      },
    ],
  },
  // ...
}
```

eslint 基于 react- create-app 脚手架的复写 <br> config-overrides.js

### prettier

> prettier 参考文档：
> https://segmentfault.com/a/1190000016579279

> 配置规则 和配置可选项
> https://prettier.io/docs/en/configuration.html https://prettier.io/docs/en/options.html

> .prettierrc 文件

```json
{
  "trailingComma": "es5",
  "tabWidth": 2,
  "semi": false,
  "singleQuote": true
}
```

> vscode 插件加载<br>
> Prettier - Code formatter
