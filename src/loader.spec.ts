import * as loader from './loader'
import * as types from './types'

describe('loader', () => {
    const schema = loader.envSchema({
        foo: loader.envGroup({
            BAR: types.NonEmptyString,
        }, 'FOO'),
        baz: loader.envGroup({
            BAZ: types.NonEmptyString,
        }, ''),
    })

    describe('#loadFrom', () => {
        it('should fill values from env object', () => {
            const env = loader.loadFrom({
                FOO_BAR: 'test',
                BAZ: 'test2',
            }, schema)
            expect(env.foo.BAR).toEqual('test')
            expect(env.baz.BAZ).toEqual('test2')
        })

        it('reports errors when envvars are not set', () => {
            expect(() => loader.loadFrom({ FOO_BAR: 2 }, schema))
                .toThrowError(`Invalid value 2 supplied to : ENV/foo: FOO/BAR: NonEmptyString\nInvalid value undefined supplied to : ENV/baz: /BAZ: NonEmptyString`)
        })
    })

    describe('#loadFromEnv', () => {
        it('loads ennvars using process.env', () => {
            const schema = loader.envSchema({
                node: loader.envGroup({
                    ENV: types.UnionOf(['test', 'production']),
                }, 'NODE'),
            })

            const env = loader.loadFromEnv(schema)

            expect(env).toEqual({ node: { ENV: 'test' } })
        })
    })
})
