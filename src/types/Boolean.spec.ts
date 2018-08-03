import { ThrowReporter } from 'io-ts/lib/ThrowReporter'
import * as types from './index'

describe('Boolean', () => {
    it('should decode valid booleans', () => {
        const dataProvider = ['false', 'true']

        dataProvider.forEach(bool => {
            const result = types.Boolean.decode(bool).value
            expect(result).toEqual(bool)
        })
    })

    it('should fail to decode invalid booleans', () => {
        expect(() => {
            const result = types.Boolean.decode('0')
            ThrowReporter.report(result)
        }).toThrow()

        expect(() => {
            const result = types.Boolean.decode('FALSE')
            ThrowReporter.report(result)
        }).toThrow()

        expect(() => {
            const result = types.Boolean.decode('TRUE')
            ThrowReporter.report(result)
        }).toThrow()

        expect(() => {
            const result = types.Boolean.decode('boolean')
            ThrowReporter.report(result)
        }).toThrow()

        expect(() => {
            const result = types.Boolean.decode('')
            ThrowReporter.report(result)
        }).toThrow()

        expect(() => {
            const result = types.Boolean.decode('null')
            ThrowReporter.report(result)
        }).toThrow()
    })
})

