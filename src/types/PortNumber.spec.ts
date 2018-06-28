import { ThrowReporter } from 'io-ts/lib/ThrowReporter'
import * as types from './index'

describe('PortNumber', () => {
    it('should decode valid port numbers', () => {
        const result = types.PortNumber.decode('80').value
        expect(result).toEqual(80)
    })

    it('should fail to decode invalid port numbers', () => {
        expect(() => {
            const result = types.PortNumber.decode('0')
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

