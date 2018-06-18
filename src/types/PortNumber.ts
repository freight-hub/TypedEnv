import * as t from 'io-ts'

import { Number } from './Number'

export const PortNumber = t.refinement(Number, (p: Number) => {
    return t.Integer.is(p) && p > 0 && p < 65536
}, 'PortNumber')

export type PortNumberType = TypeOf<typeof PortNumber>
