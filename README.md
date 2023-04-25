<div align="center">
  <p>
    <a href="https://raw-ui.vercel.app">
      <img width="128" src="https://github.com/shervinchen/raw-ui/blob/main/public/logo.svg" alt="Raw UI" />
    </a>
  </p>
  <h1>Raw UI</h1>
  <p>Minimalist and customizable React UI library for Web Applications</p>
  <a href="https://www.npmjs.com/package/raw-ui"><img src="https://img.shields.io/npm/dm/raw-ui.svg?style=flat"></a>
  <a href="https://gitHub.com/shervinchen/raw-ui/issues"><img src="https://img.shields.io/github/issues/shervinchen/raw-ui"></a>
  <a href="https://github.com/shervinchen/raw-ui/blob/main/LICENSE"><img src="https://img.shields.io/github/license/shervinchen/raw-ui"></a>
</div>

## Features

- Minimalist UI design style
- Simple and extensible component API
- Written in TypeScript with predictable static types
- Provide dark mode theme
- Customizable theme based on CSS-in-JS
- Compatible with SSR(Server Side Rendering)

## Install

### pnpm

```bash
pnpm add raw-ui
```

### npm

```bash
npm install raw-ui --save
```

## Usage

Wrap the root of your application with `RawUIProvider`, and then you can use any component

```tsx
import { RawUIProvider, Button } from 'raw-ui';

const App = () => (
  <RawUIProvider>
    <Button>Default</Button>
  </RawUIProvider>
);
```

## Documentation

[https://raw-ui.vercel.app](https://raw-ui.vercel.app)

## Reference

This is a community project, not associated with Vercel, but does get some inspiration from [Vercel Design](https://vercel.com/design).

## License

[MIT](https://github.com/shervinchen/raw-ui/blob/main/LICENSE)
