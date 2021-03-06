import { babel } from '@rollup/plugin-babel';
import resolve from '@rollup/plugin-node-resolve';
import commonjs from '@rollup/plugin-commonjs';
import html from '@rollup/plugin-html';
import { terser } from 'rollup-plugin-terser';
import filesize from 'rollup-plugin-filesize';
import progress from 'rollup-plugin-progress';
import postcss from 'rollup-plugin-postcss';
import zip from 'rollup-plugin-zip';
import copy from 'rollup-plugin-copy2';
import kontra from 'rollup-plugin-kontra';
import template from './src/template';

// PostCSS plugins
import cssnano from 'cssnano';

export default {
    input: 'src/main.js',
    output: {
        name: 'gameBundle',
        dir: 'docs',
        format: 'iife'
    },
    plugins: [
        resolve({
            jsnext: true,
            browser: true,
            dedupe: ['kontra']
        }),
        commonjs(),
        progress(),
        babel({
            babelHelpers: 'bundled',
            exclude: 'node_modules/**'
        }),
        terser({
            mangle: true
        }),
        filesize({
            showBeforeSizes: false
        }),
        html({
            title: 'RS - Space Mission',
            template
        }),
        postcss({
            extensions: ['.css'],
            plugins: [cssnano()]
        }),
        kontra({
            gameObject: {
                acceleration: true,
                anchor: true,
                group: true,
                opacity: true,
                rotation: true,
                ttl: true,
                velocity: true,
            },
            vector: {
                length: true
            },
            debug: true
        }),
        copy({
            assets: []
        }),
        zip()
    ]
}