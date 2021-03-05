import { isLeft } from 'fp-ts/lib/Either'
import * as t from 'io-ts'
import { ThrowReporter } from 'io-ts/lib/ThrowReporter'
import * as deepFreeze from 'deep-freeze'
import { EnvObject } from './EnvObject'
import { envFromYAMLFiles } from './yaml'

export * from 'io-ts'

export interface ExactInterface<P extends t.Props>
    extends t.ExactType<t.InterfaceType<P, t.TypeOfProps<P>, t.OutputOfProps<P>, t.mixed>,
        t.TypeOfProps<P>,
        t.OutputOfProps<P>,
        t.mixed>
{
}

export interface EnvGroup<P extends t.Props> extends ExactInterface<P> {
}

export type EnvGroups = { [key: string]: EnvGroup<any> }

export interface EnvSchema<P extends EnvGroups>
    extends t.ReadonlyType<ExactInterface<P>, Readonly<t.TypeOfProps<P>>, Readonly<t.OutputOfProps<P>>, t.mixed> {
}

export const envGroup = <P extends t.Props> (
    props: P,
    prefix?: string,
): EnvGroup<P> => t.exact(t.type(props), prefix || '')
export const envSchema = <P extends EnvGroups> (props: P): EnvSchema<P> => t.readonly(t.exact(t.type(props), 'ENV'), 'ENV')

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

export function loadFrom<P extends EnvGroups> (envObject: EnvObject, schema: EnvSchema<P>): Readonly<t.TypeOfProps<P>> {
    const schemaProperties = schema.type.type.props
    const envValues = Object.keys(schemaProperties).reduce<EnvValues>((envValues, schemaKey) => {
        const group = schemaProperties[schemaKey]

        envValues[schemaKey] = extractFromEnvObject(group.name, Object.keys(group.type.props), envObject)

        return envValues
    }, {})

    const result = schema.decode(envValues)

    if (isLeft(result)) {
        throw ThrowReporter.report(result)
    }

    return deepFreeze(result.right)
}

export const loadFromEnv = <P extends EnvGroups> (schema: EnvSchema<P>): t.TypeOfProps<P> => loadFrom(process.env, schema)
export const loadFromYAMLFiles = <P extends EnvGroups>(yamlFilePaths: string[], schema: EnvSchema<P>) => loadFrom(envFromYAMLFiles(yamlFilePaths), schema)