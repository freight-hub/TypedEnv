import { ThrowReporter } from 'io-ts/lib/ThrowReporter'
import * as types from './index'

describe('types', () => {
    describe('NonEmptyString', () => {
        it('should decode strings', () => {
            const result = types.NonEmptyString.decode('value').value
            expect(result).toEqual('value')
        })

        it('should fail to decode empty strings', () => {
            const result = types.NonEmptyString.decode('')
            expect(() => {
                ThrowReporter.report(result)
            }).toThrow()
        })
    })

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

    describe('PortNumber', () => {
        it('should decode valid port numbers', () => {
            const result = types.PortNumber.decode('80').value
            expect(result).toEqual('80')
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
})
