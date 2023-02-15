const { build } = require('esbuild')
const { replace } = require('esbuild-plugin-replace');
const { NodeGlobalsPolyfillPlugin } = require('@esbuild-plugins/node-globals-polyfill')

const replacePluginNoGlobal = replace({
    '__IS_FOR_GLOBAL__': 'false',
})
const replacePluginGlobal = replace({
    '__IS_FOR_GLOBAL__': 'true',
})

build({
    entryPoints: ['./src/index.ts'],
    outfile: './dist/index.cjs',
    minify: false,
    bundle: true,
    platform: 'node',
    target: 'node16',
    format: 'cjs',
    treeShaking: true,
    plugins: [replacePluginNoGlobal]
}).catch(() => process.exit(1))

build({
    entryPoints: ['./src/index.ts'],
    outfile: './dist/index.mjs',
    minify: false,
    bundle: true,
    platform: 'node',
    target: 'node16',
    format: 'esm',
    treeShaking: true,
    plugins: [replacePluginNoGlobal]
}).catch(() => process.exit(1))

build({
    entryPoints: ['./src/index.ts'],
    outfile: './dist/index.browser.mjs',
    minify: false,
    bundle: true,
    platform: 'node',
    target: 'browser',
    target: ['chrome58', 'firefox57', 'safari11', 'edge16'],
    format: 'esm',
    treeShaking: true,
    plugins: [
        NodeGlobalsPolyfillPlugin({
            buffer: true,
            process: false,
        }),
        replacePluginNoGlobal,
    ],
}).catch(() => process.exit(1))

build({
    entryPoints: ['./src/index.ts'],
    outfile: './dist/index.cdn.js',
    minify: false,
    bundle: true,
    platform: 'node',
    target: 'browser',
    target: ['chrome58', 'firefox57', 'safari11', 'edge16'],
    format: 'cjs',
    treeShaking: true,
    plugins: [
        NodeGlobalsPolyfillPlugin({
            buffer: true,
            process: false,
        }),
        replacePluginGlobal,
    ],
}).catch(() => process.exit(1))

