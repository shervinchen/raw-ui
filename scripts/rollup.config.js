import path from 'path';
import resolve from '@rollup/plugin-node-resolve';
import commonjs from '@rollup/plugin-commonjs';
import typescript from '@rollup/plugin-typescript';
import { babel } from '@rollup/plugin-babel';
import { terser } from 'rollup-plugin-terser';
import external from 'rollup-plugin-peer-deps-external';
import postcss from 'rollup-plugin-postcss';
import image from '@rollup/plugin-image';
import dts from 'rollup-plugin-dts';

const root = path.join(__dirname, '../');
const packageJson = require(path.join(root, 'package.json'));
const componentsPath = path.join(root, 'components');
const distPath = path.join(root, 'dist');
const scriptsPath = path.join(root, 'scripts');

const config = [
  {
    input: path.join(componentsPath, 'index.ts'),
    output: [
      {
        file: packageJson.main,
        format: 'cjs',
        sourcemap: true,
        name: 'raw-ui',
      },
      {
        file: packageJson.module,
        format: 'esm',
        sourcemap: true,
      },
    ],
    plugins: [
      external(),
      resolve(),
      commonjs(),
      typescript({ tsconfig: path.join(scriptsPath, 'tsconfig.json') }),
      babel({
        presets: ['@babel/preset-env'],
        extensions: ['.js', '.jsx', '.ts', '.tsx'],
        exclude: '**/node_modules/**',
        babelHelpers: 'bundled',
      }),
      image(),
      postcss(),
      terser(),
    ],
  },
  {
    input: path.join(componentsPath, 'index.ts'),
    output: [{ file: path.join(distPath, 'index.d.ts'), format: 'esm' }],
    external: [/\.css$/],
    plugins: [dts()],
  },
];

export default config;
