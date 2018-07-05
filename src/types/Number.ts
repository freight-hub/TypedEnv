import * as t from 'io-ts'

export const Number = new t.Type<string, string, string>(
    'Number',
    t.string.is,
    (s, c) => {
        const n = parseFloat(s)
        return isNaN(n) ? t.failure(s, c) : t.success(s)
    },
    String,
)

export type NumberType = t.TypeOf<typeof Number>
