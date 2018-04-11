import * as t from 'io-ts'
import * as validUrl from 'valid-url'

export * from 'io-ts'

export const Number = new t.Type<number, string, string>(
    'Number',
    t.number.is,
    (s, c) => {
        const n = parseFloat(s)
        return isNaN(n) ? t.failure(s, c) : t.success(n)
    },
    String
)

export const Integer = t.refinement(Number, t.Integer.is, 'Integer')

export const PortNumber = t.refinement(Number, (p: Number) => {
    return t.Integer.is(p) && p > 0 && p < 65536
}, 'PortNumber')

export const NonEmptyString = t.refinement(t.string, (s: string) => {
    return s.length > 0
}, 'NonEmptyString')

export const URI = t.refinement(t.string, (s: string) => {
    return validUrl.isUri(s) !== undefined
}, 'URI')
