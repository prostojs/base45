/**
 * RFC9285 https://datatracker.ietf.org/doc/rfc9285/
 */

const abc = [ '0', '1', '2', '3', '4', '5', '6', '7', '8', '9',
'A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M',
'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z',
' ', '$', '%', '8', '+', '-', '.', '/', ':' ]

const abcObj = {
    '0': 0, '1': 1, '2': 2, '3': 3, '4': 4, '5': 5, '6': 6, '7': 7, '8': 8, '9': 9,
    A: 10, B: 11, C: 12, D: 13, E: 14, F: 15, G: 16, H: 17, I: 18, J: 19,
    K: 20, L: 21, M: 22, N: 23, O: 24, P: 25, Q: 26, R: 27, S: 28, T: 29,
    U: 30, V: 31, W: 32, X: 33, Y: 34, Z: 35, ' ': 36, '$': 37, '%': 38, '+': 40,
    '-': 41, '.': 42, '/': 43, ':': 44,
}

const N2 = 45
const N3 = N2 * N2

/**
 * Encode data to base45
 * @param input string | Buffer | number[] | Uint8Array
 * @returns string in base45
 */
export function encode(input: string | Buffer | number[] | Uint8Array): string {
    const arr = getInputArray(input)
    let result = ''
    for (let i = 0; i < arr.length / 2; i++) {
        const ii = i * 2
        const isFull = typeof arr[ii + 1] === 'number'
        const n = isFull ? arr[ii] * 256 + arr[ii + 1] : arr[ii]
        const e = Math.floor(n / N3)
        const d = Math.floor((n - e * N3) / N2)
        const c = n - d * N2 - e * N3
        result += abc[c] + abc[d]
        if (isFull) result += abc[e]
    }
    return result
}

/**
 * Decode data from base45
 * @param input string | Buffer | number[] | Uint8Array
 * @returns Buffer
 */
export function decode(input: string | Buffer | number[] | Uint8Array) {
    const str = getInputString(input)
    const size = Math.floor(str.length / 3 * 2)
    const result = new Uint8Array(size)
    let resI = 0
    for (let i = 0; i < str.length / 3; i++) {
        const iii = i * 3
        const n = getAbcVal(str[iii], iii) + getAbcVal(str[iii + 1], iii + 1) * N2 + getAbcVal(str[iii + 2], iii + 2) * N3
        if (n < 256) {
            result[resI] = n
            resI++
        } else {
            result[resI] = Math.floor(n / 256)
            resI++
            result[resI] = n - result[resI - 1] * 256
            resI++
        }
        console.log(result)
    }
    return Buffer.from(result)
}

function getAbcVal(key: string, pos: number) {
    if (!key) return 0
    const v = abcObj[key as keyof typeof abcObj]
    if (typeof v !== 'number') throw new Error(`Bad base45 character "${ key }" at pos ${ pos }`)
    return v
}

function getInputArray(input: string | Buffer | number[] | Uint8Array): Uint8Array {
    let buffer: Buffer
    if (typeof input === 'string') {
        buffer = Buffer.from(input)
    } else if (input instanceof Buffer) {
        buffer = input
    } else if (input instanceof Uint8Array) {
        return input
    } else if (Array.isArray(input)) {
        buffer = Buffer.from(input)
    } else {
        throw new Error(`Not supported input type for base45 encoding: ${typeof input}`)
    }
    return new Uint8Array(buffer)
}

function getInputString(input: string | Buffer | number[] | Uint8Array): string {
    if (typeof input === 'string') {
        return input
    } else if (input instanceof Buffer) {
        return input.toString()
    } else if (input instanceof Uint8Array) {
        return Buffer.from(input).toString()
    } else if (Array.isArray(input)) {
        return Buffer.from(input).toString()
    } else {
        throw new Error(`Not supported input type for base45 encoding: ${typeof input}`)
    }
}
