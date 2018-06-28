import { ThrowReporter } from 'io-ts/lib/ThrowReporter'
import * as types from './index'

describe('NonEmptyString', () => {
    it('should decode strings', () => {
        const result = types.NonEmptyString.decode('value').value
        expect(result).toEqual('value')
    })

    it('should fail to decode empty strings', () => {
        const result = types.NonEmptyString.decode('')
        expect(() => {
            ThrowReporter.report(result)
        }).toThrow()
    })
})
