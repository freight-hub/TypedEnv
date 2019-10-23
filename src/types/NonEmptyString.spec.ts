import { isRight } from 'fp-ts/lib/Either'
import { ThrowReporter } from 'io-ts/lib/ThrowReporter'
import * as types from './index'

describe('NonEmptyString', () => {
    it('should decode strings', () => {
        const result = types.NonEmptyString.decode('value')

        if (isRight(result)) {
            expect(result.right).toEqual('value')
        } else {
            fail('failed to decode value')
        }
    })

    it('should fail to decode empty strings', () => {
        const result = types.NonEmptyString.decode('')
        expect(() => {
            ThrowReporter.report(result)
        }).toThrow()
    })
})
