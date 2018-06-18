import * as t from 'io-ts'

export const NonEmptyString = t.refinement(t.string, (s: string) => {
    return s.length > 0
}, 'NonEmptyString')

export type NonEmptyStringType = TypeOf<typeof NonEmptyString>
