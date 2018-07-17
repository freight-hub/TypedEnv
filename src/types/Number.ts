import * as t from 'io-ts'

export interface Number extends t.Type<string, string, t.mixed> {}

export const Number: Number = new t.Type<string, string, string>(
    'Number',
    t.string.is,
    (s, c) => {
        const n = parseFloat(s)
        return isNaN(n) ? t.failure(s, c) : t.success(s)
    },
    String,
)

export type NumberType = t.TypeOf<typeof Number>
