import resolve from '@rollup/plugin-node-resolve';
import commonjs from '@rollup/plugin-commonjs';
import css from 'rollup-plugin-styles';
import urlResolve from 'rollup-plugin-url-resolve';
import {defineConfig} from 'rollup';
import {uglify} from 'rollup-plugin-uglify';
import fs from 'fs';

const isProd = ['ci', 'production'].includes(process.env.ENVIRONMENT);
const addIfProd = (p) => isProd ? [p] : [];
const addIfDev = (p) => !isProd ? [p] : [];

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
    ...addIfProd(uglify()),
    {
      name: 'UserHeader',
      renderChunk: (code) => {
        return {code: fs.readFileSync('./meta.js') + code};
      },
    },
  ],
  output: [
    {
      file: 'dist/main.user.js',
      format: 'esm',
    },
    ...addIfDev({
      file: 'dist/main.proxy.user.js',
      plugins: [
        {
          name: 'GenProxy',
          renderChunk: () => {
            const meta = fs.readFileSync('./meta.js').toString('utf-8');
            const proxy = fs.readFileSync('./proxy.js').toString('utf-8');
            const lines = meta.split('\n').filter((e) => e.length);
            lines.splice(lines.length - 1, 0, '// @grant GM_xmlhttpRequest');

            return {code: lines.join('\n') + '\n\n\n' + proxy};
          },
        },
      ],
    }),
  ],
});
