import resolve from '@rollup/plugin-node-resolve';
import commonjs from '@rollup/plugin-commonjs';
import { babel } from '@rollup/plugin-babel';
import typescript from '@rollup/plugin-typescript';
import postcss from 'rollup-plugin-postcss';
import image from '@rollup/plugin-image';
import replace from '@rollup/plugin-replace';
import serve from 'rollup-plugin-serve';
import livereload from 'rollup-plugin-livereload';

const config = {
  input: 'demo/index.tsx',
  output: {
    file: 'build/index.js',
    format: 'umd',
    sourcemap: true,
  },
  plugins: [
    replace({
      preventAssignment: true,
      'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV),
      __dirname: '',
    }),
    resolve(),
    commonjs(),
    babel({
      include: ['demo/**/*', 'packages/**/*'],
      exclude: '**/node_modules/**',
      extensions: ['.js', '.jsx', '.ts', '.tsx'],
      babelHelpers: 'bundled',
    }),
    typescript({ tsconfig: './tsconfig.json' }),
    image(),
    postcss(),
    serve({
      contentBase: ['', 'demo'],
      host: 'localhost',
      port: 3000,
    }),
    livereload({ watch: 'build' }),
  ],
};

export default config;
