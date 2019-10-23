import { isRight } from 'fp-ts/lib/Either'
import { ThrowReporter } from 'io-ts/lib/ThrowReporter'
import * as types from './index'

describe('Integer', () => {
    it('should decode valid integers', () => {
        const dataProvider = ['100', '-100', '0']

        dataProvider.forEach(number => {
            const result = types.Integer.decode(number)

            if (isRight(result)) {
                expect(result.right).toEqual(number)
            } else {
                fail('failed to decode value')
            }
        })
    })

    it('should fail to decode invalid integers', () => {
        expect(() => {
            const result = types.Integer.decode('not-a-number')
            ThrowReporter.report(result)
        }).toThrow()

        expect(() => {
            const result = types.Integer.decode('')
            ThrowReporter.report(result)
        }).toThrow()

        expect(() => {
            const result = types.Integer.decode('123.45')
            ThrowReporter.report(result)
        }).toThrow()
    })
})

