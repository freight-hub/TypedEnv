import * as t from 'io-ts'
import * as validUrl from 'valid-url'

export const URI = t.refinement(t.string, (s: string) => {
    return validUrl.isUri(s) !== undefined
}, 'URI')

export type URIType = TypeOf<typeof URI>
