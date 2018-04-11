import * as t from 'io-ts'
import { ThrowReporter } from 'io-ts/lib/ThrowReporter'
import * as deepFreeze from 'deep-freeze'

export * from 'io-ts'

export const envGroup = (props: t.Props, prefix?: string): any => t.strict(props, prefix || '')
export const envSchema = (props: t.Props): any => t.readonly(t.strict(props, 'ENV'), 'ENV')

export type EnvObject = {
    [key: string]: any
}

export type EnvValues = {
    [key: string]: EnvObject
}

function extractFromEnvObject (prefix: string, props: Array<string>, envObject: EnvObject) {
    return props.reduce((mappedProperties: EnvObject, property: string) => {
        if (prefix.length > 0) {
            mappedProperties[property] = envObject[`${prefix}_${property}`]
        } else {
            mappedProperties[property] = envObject[property]
        }

        return mappedProperties
    }, {})
}

export function hydrateFrom(envObject: EnvObject, schema: t.ReadonlyType<any, any, any>) {
    const schemaProperties = schema.type.props
    const envValues = Object.keys(schemaProperties).reduce((envValues: EnvValues, schemaKey: string) => {
        const group: t.StrictType<any, any, any> = schemaProperties[schemaKey]

        envValues[schemaKey] = extractFromEnvObject(group.name, Object.keys(group.props), envObject)

        return envValues
    }, {})

    const result = schema.decode(envValues)
    ThrowReporter.report(result)

    return deepFreeze(result.value)
}

export const hydrateFromEnv = (schema: t.ReadonlyType<any, object>) => hydrateFrom(process.env, schema)
