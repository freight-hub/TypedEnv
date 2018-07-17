import * as t from 'io-ts'

export interface NonEmptyString extends t.RefinementType<t.StringType, string, string, t.mixed> {}

export const NonEmptyString: NonEmptyString = t.refinement(t.string, (s: string) => {
    return s.length > 0
}, 'NonEmptyString')

export type NonEmptyStringType = t.TypeOf<typeof NonEmptyString>
