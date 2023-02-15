const { build } = require('esbuild')

build({
    entryPoints: ['./src/index.ts'],
    outfile: './dist/index.cjs',
    minify: false,
    bundle: true,
    platform: 'node',
    target: 'node16',
    format: 'cjs'
}).catch(() => process.exit(1))

build({
    entryPoints: ['./src/index.ts'],
    outfile: './dist/index.mjs',
    minify: false,
    bundle: true,
    platform: 'node',
    target: 'node16',
    format: 'esm'
}).catch(() => process.exit(1))
