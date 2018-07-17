import * as t from 'io-ts'
import * as validUrl from 'valid-url'

export interface URI extends t.RefinementType<t.StringType, string, string, t.mixed> {}

export const URI: URI = t.refinement(t.string, (s: string) => {
    return validUrl.isUri(s) !== undefined
}, 'URI')

export type URIType = t.TypeOf<typeof URI>
