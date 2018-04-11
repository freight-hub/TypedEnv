import * as loader from './loader'
import * as types from './types'

describe('loader', () => {
    const schema = loader.envSchema({
        foo: loader.envGroup({
            BAR: types.NonEmptyString,
        }, 'FOO')
    })

    describe('hydrateFromEnv', () => {
        it('should fill values from env object', () => {
            const env = loader.hydrateFrom({
                FOO_BAR: 'test',
            }, schema)
            expect(env.foo.BAR).toEqual('test')
        })
    })
})
