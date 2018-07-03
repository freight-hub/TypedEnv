import * as t from 'io-ts'

export const Number = new t.Type<number, number, string>(
    'Number',
    t.number.is,
    (s, c) => {
        const n = parseFloat(s)
        return isNaN(n) ? t.failure(s, c) : t.success(n)
    },
    t.identity
)

export type NumberType = t.TypeOf<typeof Number>
