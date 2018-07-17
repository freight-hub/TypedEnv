import * as t from 'io-ts'
import * as deepFreeze from 'deep-freeze'

export * from 'io-ts'

export interface ExactInterface<P extends t.Props>
    extends t.ExactType<
        t.InterfaceType<P, t.TypeOfProps<P>, t.OutputOfProps<P>, t.mixed>,
        t.TypeOfProps<P>,
        t.OutputOfProps<P>,
        t.mixed
        > {}

export interface EnvGroup<P extends t.Props> extends ExactInterface<P> {}

export type EnvGroups = { [key: string]: EnvGroup<any> }

export interface EnvSchema<P extends EnvGroups>
    extends t.ReadonlyType<ExactInterface<P>, Readonly<t.TypeOfProps<P>>, Readonly<t.OutputOfProps<P>>, t.mixed> {}

export const envGroup = <P extends t.Props> (props: P, prefix?: string): EnvGroup<P> => t.exact(t.type(props), prefix || '')
export const envSchema = <P extends EnvGroups> (props: P): EnvSchema<P> => t.readonly(t.exact(t.type(props), 'ENV'), 'ENV')

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

export function loadFrom<P extends EnvGroups>(envObject: EnvObject, schema: EnvSchema<P>): Readonly<t.TypeOfProps<P>> {
    const schemaProperties = schema.type.type.props
    const envValues = Object.keys(schemaProperties).reduce((envValues: EnvValues, schemaKey: string) => {
        const group = schemaProperties[schemaKey]

        envValues[schemaKey] = extractFromEnvObject(group.name, Object.keys(group.type.props), envObject)

        return envValues
    }, {})

    return schema.decode(envValues).fold(errors => {
        throw new Error(errors.join('\n'))
    }, value => deepFreeze(value))
}

export const loadFromEnv = <P extends EnvGroups> (schema: EnvSchema<P>): t.TypeOfProps<P> => loadFrom(process.env, schema)
