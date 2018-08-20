import { ThrowReporter } from 'io-ts/lib/ThrowReporter'
import * as types from './index'

describe('Union', () => {
    it('should decode valid union values', () => {
        const appEnvironments = types.UnionOf(['test', 'development', 'sandbox', 'production'])

        const test = appEnvironments.decode('test').value
        expect(test).toEqual('test')

        const development = appEnvironments.decode('development').value
        expect(development).toEqual('development')

        const sandbox = appEnvironments.decode('sandbox').value
        expect(sandbox).toEqual('sandbox')

        const production = appEnvironments.decode('production').value
        expect(production).toEqual('production')
    })

    describe('should fail to decode invalid values', () => {
        it('fails for case sensitivity in string literals', () => {
            const appEnvironments = types.UnionOf(['test', 'development', 'production'])

            expect(() => {
                const result = appEnvironments.decode('TEST')
                ThrowReporter.report(result)
            }).toThrow()

            expect(() => {
                const result = appEnvironments.decode('Development')
                ThrowReporter.report(result)
            }).toThrow()

            expect(() => {
                const result = appEnvironments.decode('PRoduCTIoN')
                ThrowReporter.report(result)
            }).toThrow()
        })

        it('fails for values not declared in the union', () => {
            const logLevels = types.UnionOf([ 'development', 'production' ])

            expect(() => {
                const result = logLevels.decode('test')
                ThrowReporter.report(result)
            }).toThrow()

            expect(() => {
                const result = logLevels.decode('sandbox')
                ThrowReporter.report(result)
            }).toThrow()

            expect(() => {
                const result = logLevels.decode(null)
                ThrowReporter.report(result)
            }).toThrow()

            expect(() => {
                const result = logLevels.decode(undefined)
                ThrowReporter.report(result)
            }).toThrow()
        })
    })
})
