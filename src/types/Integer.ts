import * as t from 'io-ts'

import { Number } from './Number'

export const Integer = t.refinement(Number, t.Integer.is, 'Integer')

export type IntegerType = TypeOf<typeof Integer>
