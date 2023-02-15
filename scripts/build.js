const { build } = require('esbuild')
const { NodeGlobalsPolyfillPlugin } = require('@esbuild-plugins/node-globals-polyfill')

build({
    entryPoints: ['./src/index.ts'],
    outfile: './dist/index.cjs',
    minify: false,
    bundle: true,
    platform: 'node',
    target: 'node16',
    format: 'cjs',
    treeShaking: true,
    minifySyntax: true,
    define: { __IS_FOR_GLOBAL__: 'false' },
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
    minifySyntax: true,
    define: { __IS_FOR_GLOBAL__: 'false' },
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
    minifySyntax: true,
    minify: true,
    define: {
        global: 'window',
        __IS_FOR_GLOBAL__: 'false',
    },
    plugins: [
        NodeGlobalsPolyfillPlugin({
            buffer: true,
            process: false,
        }),
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
    format: 'iife',
    treeShaking: true,
    minifySyntax: true,
    minify: true,
    define: {
        global: 'window',
        __IS_FOR_GLOBAL__: 'true',
    },
    plugins: [
        NodeGlobalsPolyfillPlugin({
            buffer: true,
            process: false,
        }),
        // replacePluginGlobal,
    ],
}).catch(() => process.exit(1))

