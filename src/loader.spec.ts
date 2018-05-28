import * as loader from './loader'
import * as types from './types'

describe('loader', () => {
    const schema = loader.envSchema({
        foo: loader.envGroup({
            BAR: types.NonEmptyString,
        }, 'FOO')
        baz: loader.envGroup({
            BAZ: types.NonEmptyString,
        }, '')
    })

    describe('hydrateFromEnv', () => {
        it('should fill values from env object', () => {
            const env = loader.hydrateFrom({
                FOO_BAR: 'test',
                BAZ: 'test2',
            }, schema)
            expect(env.foo.BAR).toEqual('test')
            expect(env.baz.BAZ).toEqual('test2')
        })
    })
})
