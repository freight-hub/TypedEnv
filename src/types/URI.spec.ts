import { isRight } from 'fp-ts/lib/Either'
import { ThrowReporter } from 'io-ts/lib/ThrowReporter'
import * as types from './index'

describe('URI', () => {
    it('should decode URLs', () => {
        const result = types.URI.decode('http://example.com:80')

        if (isRight(result)) {
            expect(result.right).toEqual('http://example.com:80')
        } else {
            fail('failed to decode value')
        }
    })

    it('should fail to decode invalid URLs', () => {
        const result = types.URI.decode('value')
        expect(() => {
            ThrowReporter.report(result)
        }).toThrow()
    })
})
