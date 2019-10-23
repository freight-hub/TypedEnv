import * as t from 'io-ts'

export interface Union<T extends string> extends t.UnionType<t.LiteralType<T>[], T, T, t.mixed> {}



export const UnionOf: UnionOfType = <T extends string>(values: [T, T, ...T[]], name?: string): Union<T> => {
    const [ value1, value2, ...valuesRest ] = values

    return t.union([
        t.literal(value1),
        t.literal(value2),
        ...valuesRest.map( val => t.literal(val)),
    ], name ? `Union:${name}` : 'Union')
}

export type UnionOfType = <T extends string>(values: [T, T, ...T[]], name?: string) => Union<T>
