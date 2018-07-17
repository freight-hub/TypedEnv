import * as t from 'io-ts'

const NullType = t.null
const UndefinedType = t.undefined
const StringType = t.string

export interface OptionalString extends t.UnionType<(t.NullType | t.UndefinedType | t.StringType)[], string | null | undefined, string | null | undefined, t.mixed> {}

export const OptionalString: OptionalString = t.union([NullType, UndefinedType, StringType])

export type OptionalStringType = t.TypeOf<typeof OptionalString>
