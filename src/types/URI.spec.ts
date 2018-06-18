import { ThrowReporter } from 'io-ts/lib/ThrowReporter'
import * as types from './types'

describe('URI', () => {
    it('should decode URLs', () => {
        const result = types.URI.decode('http://example.com:80').value
        expect(result).toEqual('http://example.com:80')
    })

    it('should fail to decode invalid URLs', () => {
        const result = types.URI.decode('value')
        expect(() => {
            ThrowReporter.report(result)
        }).toThrow()
    })
})
