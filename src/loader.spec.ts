import * as loader from './loader'
import * as types from './types'

describe('loader', () => {
    const schema = loader.envSchema({
        foo: loader.envGroup({
            BAR: types.NonEmptyString,
        }, 'FOO'),
        baz: loader.envGroup({
            BAZ: types.NonEmptyString,
        }, '')
    })

    describe('LoadFromEnv', () => {
        it('should fill values from env object', () => {
            const env = loader.loadFrom({
                FOO_BAR: 'test',
                BAZ: 'test2',
            }, schema)
            expect(env.foo.BAR).toEqual('test')
            expect(env.baz.BAZ).toEqual('test2')
        })
    })
})
