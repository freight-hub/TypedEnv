import * as t from 'io-ts'

export interface Integer extends t.Type<string, string, t.mixed> {}

export const Integer: Integer = new t.Type<string, string, string>(
    'Integer',
    t.string.is,
    (s, c) => {
        return s !== String(parseInt(s)) && parseFloat(s) !== parseInt(s, 10) ? t.failure(s, c) : t.success(s)
    },
    String,
)

export type IntegerType = t.TypeOf<typeof Integer>
