import * as t from 'io-ts'

export const PortNumber = t.refinement(t.string, (p: string) => {
    const PORT_REGEX = new RegExp(/^([1-9][0-9]{0,3}|[1-5][0-9]{4}|6[0-4][0-9]{3}|65[0-4][0-9]{2}|655[0-2][0-9]|6553[0-5])$/)

    return PORT_REGEX.test(p)
}, 'PortNumber')

export type PortNumberType = t.TypeOf<typeof PortNumber>
