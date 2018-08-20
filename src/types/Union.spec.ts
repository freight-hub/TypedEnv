import { ThrowReporter } from 'io-ts/lib/ThrowReporter'
import * as types from './index'

describe('Union', () => {
    describe('should decode valid possible values', () => {
        it('decodes strings', () => {
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

        it('decodes enumerables', () => {
            const logLevels = types.UnionOf([1, 2, 3])

            const debug = logLevels.decode(1).value
            expect(debug).toEqual(1)

            const info = logLevels.decode(2).value
            expect(info).toEqual(2)

            const error = logLevels.decode(3).value
            expect(error).toEqual(3)
        })

        it('decodes booleans', () => {
            const featureToggle = types.UnionOf([false, true])

            const on = featureToggle.decode(true).value
            expect(on).toEqual(true)

            const off = featureToggle.decode(false).value
            expect(off).toEqual(false)
        })

        it('decodes mixed groups', () => {
            const priorities = types.UnionOf([1, 'low', 2, 'medium', 3, 'high', false])

            const lowNumeric = priorities.decode(1).value
            expect(lowNumeric).toEqual(1)
            const low = priorities.decode('low').value
            expect(low).toEqual('low')
            
            const mediumNumeric = priorities.decode(2).value
            expect(mediumNumeric).toEqual(2)
            const medium = priorities.decode('medium').value
            expect(medium).toEqual('medium')
            
            const highNumeric = priorities.decode(3).value
            expect(highNumeric).toEqual(3)
            const high = priorities.decode('high').value
            expect(high).toEqual('high')

            const featureToggle = priorities.decode(false).value
            expect(featureToggle).toEqual(false)
        })
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
            const logLevels = types.UnionOf([ 1, 2, 3, false ])

            expect(() => {
                const result = logLevels.decode(-1)
                ThrowReporter.report(result)
            }).toThrow()

            expect(() => {
                const result = logLevels.decode('test')
                ThrowReporter.report(result)
            }).toThrow()

            expect(() => {
                const result = logLevels.decode(true)
                ThrowReporter.report(result)
            }).toThrow()

            expect(() => {
                const result = logLevels.decode('1')
                ThrowReporter.report(result)
            }).toThrow()

            expect(() => {
                const result = logLevels.decode('false')
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
