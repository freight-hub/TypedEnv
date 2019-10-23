import { isRight } from 'fp-ts/lib/Either'
import { ThrowReporter } from 'io-ts/lib/ThrowReporter'
import * as types from './index'

describe('OptionalString', () => {
    it('should decode strings', () => {
        const result = types.OptionalString.decode('value')

        if (isRight(result)) {
            expect(result.right).toEqual('value')
        } else {
            fail('failed to decode value')
        }
    })

    it('should decode empty strings', () => {
        const result = types.OptionalString.decode('')

        if (isRight(result)) {
            expect(result.right).toEqual('')
        } else {
            fail('failed to decode value')
        }
    })

    it('should pass null', () => {
        const result = types.OptionalString.decode(null)

        if (isRight(result)) {
            expect(result.right).toEqual(null)
        } else {
            fail('failed to decode value')
        }
    })

    it('should pass undefined', () => {
        const result = types.OptionalString.decode(undefined)

        if (isRight(result)) {
            expect(result.right).toEqual(undefined)
        } else {
            fail('failed to decode value')
        }
    })

    it('should fail to decode number', () => {
        const result = types.OptionalString.decode(4)
        expect(() => {
            ThrowReporter.report(result)
        }).toThrow()
    })
})
