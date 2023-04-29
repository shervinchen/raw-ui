import resolve from '@rollup/plugin-node-resolve';
import commonjs from '@rollup/plugin-commonjs';
import typescript from '@rollup/plugin-typescript';
import { babel } from '@rollup/plugin-babel';
import { terser } from 'rollup-plugin-terser';
import external from 'rollup-plugin-peer-deps-external';
import postcss from 'rollup-plugin-postcss';
import image from '@rollup/plugin-image';
import dts from 'rollup-plugin-dts';

const packageJson = require('./package.json');

const config = [
  {
    input: 'components/index.ts',
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
    external: (id) => /^react|react-dom/.test(id),
    plugins: [
      external(),
      resolve(),
      commonjs(),
      babel({
        presets: ['@babel/preset-env'],
        extensions: ['.js', '.jsx', '.ts', '.tsx'],
        exclude: '**/node_modules/**',
        babelHelpers: 'bundled',
      }),
      typescript({ tsconfig: './tsconfig.build.json' }),
      image(),
      postcss(),
      terser(),
    ],
  },
  {
    input: 'components/index.ts',
    output: [{ file: 'dist/index.d.ts', format: 'esm' }],
    external: [/\.css$/],
    plugins: [dts()],
  },
];

export default config;
