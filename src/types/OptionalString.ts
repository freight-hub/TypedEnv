import * as t from 'io-ts'

const NullType = t.null
const UndefinedType = t.undefined
const StringType = t.string

export const OptionalString = t.union([NullType, UndefinedType, StringType])

export type OptionalStringType = t.TypeOf<typeof OptionalString>
