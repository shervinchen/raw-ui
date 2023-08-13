<div align="center">
  <p>
    <a href="https://raw-ui.vercel.app">
      <img width="128" src="https://github.com/shervinchen/raw-ui/blob/main/public/logo-dark.svg" alt="Raw UI" />
    </a>
  </p>
  <h1>Raw UI</h1>
  <p>一个极简风格、可定制的 React 组件库，用于构建 Web 应用程序</p>
  <p>
    <a href="https://www.npmjs.com/package/raw-ui"><img src="https://img.shields.io/npm/dm/raw-ui.svg?style=flat"></a>
    <a href="https://codecov.io/gh/shervinchen/raw-ui"><img src="https://img.shields.io/codecov/c/github/shervinchen/raw-ui/master.svg"/></a>
    <a href="https://gitHub.com/shervinchen/raw-ui/issues"><img src="https://img.shields.io/github/issues/shervinchen/raw-ui"></a>
    <a href="https://github.com/shervinchen/raw-ui/blob/main/LICENSE"><img src="https://img.shields.io/github/license/shervinchen/raw-ui"></a>
  </p>
  <p><a href="./README.md">English</a> | 中文</p>
</div>

## 特性

- 极简风格的 UI 设计
- 简单、可扩展性强的组件 API
- 用 TypeScript 编写，具有可预测的静态类型
- 提供暗黑模式的主题
- 基于 CSS-in-JS 的主题定制能力
- 兼容 SSR（服务端渲染）

## 安装

### pnpm

```bash
pnpm add raw-ui
```

### npm

```bash
npm install raw-ui --save
```

## 使用

用`RawUIProvider`包裹在你的应用程序的根部，然后你就可以使用任何组件了

```jsx
import { RawUIProvider, Button } from 'raw-ui';

const App = () => (
  <RawUIProvider>
    <Button>Default</Button>
  </RawUIProvider>
);
```

## 文档

[https://raw-ui.vercel.app](https://raw-ui.vercel.app)

## 参考

这是一个社区项目，与 Vercel 没有关系，但确实从 [Vercel Design](https://vercel.com/design) 得到了一些灵感

## 许可

[MIT](https://github.com/shervinchen/raw-ui/blob/main/LICENSE)
