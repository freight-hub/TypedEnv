import * as t from 'io-ts'

type UnionOfArgumentsTypes = string | number | boolean

export interface Union<T extends UnionOfArgumentsTypes> extends t.UnionType<t.LiteralType<T>[], T, T, t.mixed> {}

export const UnionOf: UnionOfType = <T extends UnionOfArgumentsTypes>(values: T[], name?: string): Union<T> => {
    return t.union(
        values.map(val => t.literal(val)),
        name ? `Union:${name}` : 'Union'
    )
}

export type UnionOfType = <T extends UnionOfArgumentsTypes>(values: T[], name?: string) => Union<T>
