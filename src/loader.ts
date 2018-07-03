import * as t from 'io-ts'
import { ThrowReporter } from 'io-ts/lib/ThrowReporter'
import * as deepFreeze from 'deep-freeze'

export * from 'io-ts'

export const envGroup = <P extends t.Props> (props: P, prefix?: string) => t.exact(t.type(props), prefix || '')
export const envSchema = <P extends t.Props> (props: P) => t.readonly(t.exact(t.type(props), 'ENV'), 'ENV')

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

export function loadFrom (envObject: EnvObject, schema: t.ReadonlyType<t.ExactType<t.InterfaceType<any>>, any, any>) {
    const schemaProperties = schema.type.type.props
    const envValues = Object.keys(schemaProperties).reduce((envValues: EnvValues, schemaKey: string) => {
        const group: t.ExactType<t.InterfaceType<any>, any, any> = schemaProperties[schemaKey]

        envValues[schemaKey] = extractFromEnvObject(group.name, Object.keys(group.type.props), envObject)

        return envValues
    }, {})

    const result = schema.decode(envValues)
    ThrowReporter.report(result)

    return deepFreeze(result.value)
}

export const loadFromEnv = <P> (schema: t.ReadonlyType<any, P>) => <P> loadFrom(process.env, schema)
