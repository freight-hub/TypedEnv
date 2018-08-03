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
            const result = types.PortNumber.decode('0')
            ThrowReporter.report(result)
        }).toThrow()

        expect(() => {
            const result = types.PortNumber.decode('FALSE')
            ThrowReporter.report(result)
        }).toThrow()

        expect(() => {
            const result = types.PortNumber.decode('TRUE')
            ThrowReporter.report(result)
        }).toThrow()

        expect(() => {
            const result = types.PortNumber.decode('')
            ThrowReporter.report(result)
        }).toThrow()

        expect(() => {
            const result = types.PortNumber.decode('boolean')
            ThrowReporter.report(result)
        }).toThrow()

        expect(() => {
            const result = types.PortNumber.decode('')
            ThrowReporter.report(result)
        }).toThrow()

        expect(() => {
            const result = types.PortNumber.decode('null')
            ThrowReporter.report(result)
        }).toThrow()
    })
})

