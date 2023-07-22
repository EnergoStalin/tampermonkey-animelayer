import resolve from '@rollup/plugin-node-resolve';
import commonjs from '@rollup/plugin-commonjs';
import css from 'rollup-plugin-styles';
import urlResolve from 'rollup-plugin-url-resolve';
import {defineConfig} from 'rollup';
import {uglify} from 'rollup-plugin-uglify';
import fs from 'fs';

export default defineConfig({
  input: './src/index.js',
  treeshake: 'recommended',
  plugins: [
    urlResolve({
      cacheManager: '.cache',
    }),
    resolve({
      browser: true,
      preferBuiltins: false,
    }),
    commonjs({
      sourceMap: false,
    }),
    css(),
    ...(['ci', 'production'].includes(process.env.ENVIRONMENT) ? [uglify()] : []),
    {
      name: 'UserHeader',
      renderChunk: (code) => {
        return {code: fs.readFileSync('./meta.js') + code};
      },
    },
  ],
  output: {
    file: 'dist/main.user.js',
    format: 'esm',
  },
});
