import resolve from '@rollup/plugin-node-resolve';
import commonjs from '@rollup/plugin-commonjs';
import terser from '@rollup/plugin-terser';
import typescript from '@rollup/plugin-typescript';
import svelte from 'rollup-plugin-svelte';
import css from 'rollup-plugin-styles';
import sveltePreprocess from 'svelte-preprocess';
import {defineConfig} from 'rollup';
import fs from 'fs';
import meta from './meta.js';

const production = !process.env.ROLLUP_WATCH;

export default defineConfig({
  input: './src/index.ts',
  treeshake: 'recommended',
  plugins: [
    svelte({
			preprocess: sveltePreprocess(),
      compilerOptions: {
        sourcemap: false,
      }
		}),
    css(),
    resolve({
      browser: true,
      preferBuiltins: false,
    }),
    commonjs(),
    typescript({
      sourceMap: false,
      inlineSources: false
    }),
    production && terser(),
    {
      name: 'Insert meta',
      renderChunk: (code) => {
        return {code: meta + '\n\n\n' + code}
      }
    }
  ],
  output: [
    {
      file: 'dist/bundle.user.js',
      format: 'iife',
      name: 'app',
      sourcemap: false,
    },
    !production && {
      file: 'dist/bundle.proxy.user.js',
      plugins: [
        {
          name: 'GenProxy',
          renderChunk: async () => {
            return {code: meta + '\n\n\n' + fs.readFileSync('./proxy.js').toString('utf-8')};
          },
        },
      ],
    }
  ],
  watch: {
		clearScreen: false
	}
});
