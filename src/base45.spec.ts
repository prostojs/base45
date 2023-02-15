import { encode, decode } from './index'

describe('base45', () => {
    it('must encode AB to BB8', () => {
        expect(encode('AB')).toBe('BB8')
    })
    it('must encode Hello!!to %69 VD92EX0', () => {
        expect(encode('Hello!!')).toBe('%69 VD92EX0')
    })
    it('must encode base-45 to UJCLQE7W581', () => {
        expect(encode('base-45')).toBe('UJCLQE7W581')
    })
    it('must encode ietf! to QED8WEX0', () => {
        expect(encode('ietf!')).toBe('QED8WEX0')
    })
    it('must decode BB8 to AB', () => {
        expect(decode('BB8').toString()).toBe(('AB'))
    })
    it('must decode %69 VD92EX0 to Hello!!', () => {
        expect(decode('%69 VD92EX0').toString()).toBe(('Hello!!'))
    })
    it('must decode UJCLQE7W581 to base-45', () => {
        expect(decode('UJCLQE7W581').toString()).toBe(('base-45'))
    })
    it('must decode QED8WEX0 to ietf!', () => {
        expect(decode('QED8WEX0').toString()).toBe(('ietf!'))
    })
})
