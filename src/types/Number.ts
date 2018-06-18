import * as t from 'io-ts'

export const Number = new t.Type<number, string, string>(
    'Number',
    t.number.is,
    (s, c) => {
        const n = parseFloat(s)
        return isNaN(n) ? t.failure(s, c) : t.success(n)
    },
    String
)

export type NumberType = TypeOf<typeof Number>
