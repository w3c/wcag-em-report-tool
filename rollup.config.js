import babel from '@rollup/plugin-babel';
import commonjs from '@rollup/plugin-commonjs';
import json from '@rollup/plugin-json';
import livereload from 'rollup-plugin-livereload';
import resolve from '@rollup/plugin-node-resolve';
import serve from 'rollup-plugin-serve';
import svelte from 'rollup-plugin-svelte';
import { terser } from 'rollup-plugin-terser';

import pkg from './package.json';

const production = !process.env.ROLLUP_WATCH;

// You can add this env by using rollup's --environment cli flag;
// Like: npm run dev -- --environment BASEPATH:"/some-server-subdir/"
const BASEPATH = process.env.BASEPATH || '/';

export default {
  input: pkg.main,
  output: {
    sourcemap: true,
    format: 'esm',
    name: pkg.name,
    dir: production ? `public/${pkg.version}` : 'public/dev'
  },
  plugins: [
    svelte({
      // enable run-time checks when not in production
      dev: !production,
      // we'll extract any component CSS out into
      // a separate file - better for performance
      css: (css) => {
        css.write('bundle.css');
      }
    }),

    // If you have external dependencies installed from
    // npm, you'll most likely need these plugins. In
    // some cases you'll need additional configuration -
    // consult the documentation for details:
    // https://github.com/rollup/plugins/tree/master/packages/commonjs
    resolve({
      browser: true,
      dedupe: ['svelte']
    }),
    commonjs(),
    json(),

    // In dev mode, call `npm run start` once
    // the bundle has been generated
    !production &&
      serve({
        contentBase: 'public',

        // Automaticly start your default browser
        // with serve url; http://localhost:10001<BASEPATH>
        open: true,
        openPage: BASEPATH,
        historyApiFallback: true
      }),

    // Watch the `public` directory and refresh the
    // browser on changes when not in production
    !production && livereload('public'),

    // If we're building for production (npm run build
    // instead of npm run dev), minify
    production && terser(),

    // Babel used to provide legacy (IE 11) support
    babel({
      extensions: ['.js', '.mjs', '.html', '.svelte'],
      babelHelpers: 'runtime',
      exclude: ['node_modules/@babel/**'],
      presets: [
        [
          '@babel/preset-env',
          {
            targets: '> 0.25%, not dead, ie 11'
          }
        ]
      ],
      plugins: [
        '@babel/plugin-syntax-dynamic-import',
        [
          '@babel/plugin-transform-runtime',
          {
            useESModules: true
          }
        ]
      ]
    })
  ],
  watch: {
    clearScreen: false
  }
};
