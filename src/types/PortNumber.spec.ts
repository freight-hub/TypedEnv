import { isRight } from 'fp-ts/lib/Either'
import { ThrowReporter } from 'io-ts/lib/ThrowReporter'
import * as types from './index'

describe('PortNumber', () => {
    it('should decode valid port numbers', () => {
        const dataProvider = ['1', '80', '8080', '65535']

        dataProvider.forEach(port => {
            const result = types.PortNumber.decode(port)

            if (isRight(result)) {
                expect(result.right).toEqual(port)
            } else {
                fail('failed to decode value')
            }
        })
    })

    it('should fail to decode invalid port numbers', () => {
        expect(() => {
            const result = types.PortNumber.decode('0')
            ThrowReporter.report(result)
        }).toThrow()

        expect(() => {
            const result = types.PortNumber.decode('080')
            ThrowReporter.report(result)
        }).toThrow()

        expect(() => {
            const result = types.PortNumber.decode('65536')
            ThrowReporter.report(result)
        }).toThrow()

        expect(() => {
            const result = types.PortNumber.decode('x')
            ThrowReporter.report(result)
        }).toThrow()
    })
})

