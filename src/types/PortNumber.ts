import * as t from 'io-ts'

export interface PortNumber extends t.RefinementType<t.StringType, string, string, t.mixed> {}

export const PortNumber: PortNumber = t.refinement(t.string, (port: string) => {
    const portStructure = new RegExp(/^([1-9])([0-9]){0,4}$/)

    if (!portStructure.test(port)) {
        return false
    }

    if (!(+port >= 1 && +port <= 65535)) {
        return false
    }

    return true
}, 'PortNumber')

export type PortNumberType = t.TypeOf<typeof PortNumber>
