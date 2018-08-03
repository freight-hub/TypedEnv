import * as t from 'io-ts'

export interface Boolean extends t.Type<string, string, t.mixed> {}

export const Boolean: Boolean = new t.Type<string, string, string>(
    'Boolean',
    t.string.is,
    (s, c) => {
        return (s === 'true' || s === 'false')  ? t.success(s) : t.failure(s, c)
    },
    String,
)

export type BooleanType = t.TypeOf<typeof Boolean>
