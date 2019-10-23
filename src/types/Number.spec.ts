import { isRight } from 'fp-ts/lib/Either'
import { ThrowReporter } from 'io-ts/lib/ThrowReporter'
import * as types from './index'

describe('Number', () => {
    it('should decode valid numbers', () => {
        const dataProvider = ['100', '-100', '100.25', '-100.25', '0']

        dataProvider.forEach(number => {
            const result = types.Number.decode(number)

            if (isRight(result)) {
                expect(result.right).toEqual(number)
            } else {
                fail('failed to decode value')
            }
        })
    })

    it('should fail to decode invalid numbers', () => {
        expect(() => {
            const result = types.Number.decode('not-a-number')
            ThrowReporter.report(result)
        }).toThrow()

        expect(() => {
            const result = types.Number.decode('')
            ThrowReporter.report(result)
        }).toThrow()
    })
})

