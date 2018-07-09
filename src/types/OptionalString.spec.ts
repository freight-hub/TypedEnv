import { ThrowReporter } from 'io-ts/lib/ThrowReporter'
import * as types from './index'

describe('OptionalString', () => {
    it('should decode strings', () => {
        const result = types.OptionalString.decode('value').value
        expect(result).toEqual('value')
    })

    it('should decode empty strings', () => {
        const result = types.OptionalString.decode('').value
        expect(result).toEqual('')
    })

    it('should pass null', () => {
        const result = types.OptionalString.decode(null).value
        expect(result).toEqual(null)
    })

    it('should pass undefined', () => {
        const result = types.OptionalString.decode(undefined).value
        expect(result).toEqual(undefined)
    })

    it('should fail to decode number', () => {
        const result = types.OptionalString.decode(4)
        expect(() => {
            ThrowReporter.report(result)
        }).toThrow()
    })
})
