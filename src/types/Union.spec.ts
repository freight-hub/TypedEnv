import { isRight } from 'fp-ts/lib/Either'
import { ThrowReporter } from 'io-ts/lib/ThrowReporter'
import * as types from './index'

describe('Union', () => {
    it('should decode valid union values', () => {
        const appEnvironments = types.UnionOf(['test', 'development', 'sandbox', 'production'])

        const test = appEnvironments.decode('test')

        if (isRight(test)) {
            expect(test.right).toEqual('test')
        } else {
            fail('failed to decode value')
        }

        const development = appEnvironments.decode('development')

        if (isRight(development)) {
            expect(development.right).toEqual('development')
        } else {
            fail('failed to decode value')
        }

        const sandbox = appEnvironments.decode('sandbox')

        if (isRight(sandbox)) {
            expect(sandbox.right).toEqual('sandbox')
        } else {
            fail('failed to decode value')
        }

        const production = appEnvironments.decode('production')

        if (isRight(production)) {
            expect(production.right).toEqual('production')
        } else {
            fail('failed to decode value')
        }
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
