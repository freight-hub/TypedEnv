import * as t from 'io-ts'
import { ThrowReporter } from 'io-ts/lib/ThrowReporter'
import * as validUrl from 'valid-url'
import * as deepFreeze from 'deep-freeze'

export * from 'io-ts'

export const Number = new t.Type<number, string, string>(
    'Number',
    t.number.is,
    (s, c) => {
        const n = parseFloat(s)
        return isNaN(n) ? t.failure(s, c) : t.success(n)
    },
    String
)

export const envGroup = (prefix: string, props: t.Props): any => t.strict(props, prefix)
export const envSchema = (props: t.Props): any => t.readonly(t.strict(props, 'ENV'), 'ENV')

export const Integer = t.refinement(Number, t.Integer.is, 'Integer')

export const PortNumber = t.refinement(Number, (p: Number) => {
    return t.Integer.is(p) && p > 0 && p < 65536
}, 'PortNumber')

export const NonEmptyString = t.refinement(t.string, (s: string) => {
    return s.length > 0
}, 'NonEmptyString')

export const URI = t.refinement(t.string, (s: string) => {
    return validUrl.isUri(s) !== undefined
}, 'URI')

export type EnvObject = {
    [key: string]: any
}

function extractFromEnvObject (prefix: string, props: Array<string>, envObject: EnvObject) {
    return props.reduce((mappedProperties: any, property: string) => {
        mappedProperties[property] = envObject[`${prefix}_${property}`]

        return mappedProperties
    }, {})
}

export function hydrateFrom(envObject: EnvObject, schema: t.ReadonlyType<any, any, any>) {
    const schemaProperties = schema.type.props
    const envValues = Object.keys(schemaProperties).reduce((envValues: any, schemaKey: string) => {
        const group: t.StrictType<any, any, any> = schemaProperties[schemaKey]

        envValues[schemaKey] = extractFromEnvObject(group.name, Object.keys(group.props), envObject)

        return envValues
    }, {})

    const result = schema.decode(envValues)
    ThrowReporter.report(result)

    return deepFreeze(result.value)
}

export const hydrateFromEnv = (schema: t.ReadonlyType<any, any, any>) => hydrateFrom(process.env, schema)
