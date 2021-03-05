import { get, merge } from 'lodash'
import { readFileSync } from 'fs'
import { load as parseYAML } from 'js-yaml'
import { EnvObject } from './EnvObject'

export function valueAt(obj: any, jsonPath: string) {
    const dotPath = dotNotationFrom(jsonPath)
    return dotPath === '' ? obj : get(obj, dotPath)
}

function dotNotationFrom(jsonPath: string) {
    return jsonPath.replace(/^#\//,'').replace(/\//g, '.')
}

function envFromYAMLFile(filePathWithEnvJSONPath: string) {
    const [filePath, envJSONPathWithoutHashtag = '/'] = filePathWithEnvJSONPath.split('#')
    const content = readYAMLFileSync(filePath)
    const env = valueAt(content, `#${envJSONPathWithoutHashtag}`)
    return env
}

function readYAMLFileSync(filePath: string) {
    const fileContent = readFileSync(filePath).toString()
    const parsedContent = parseYAML(fileContent)
    return parsedContent
}

export function envFromYAMLFiles(valueFilePaths: string[]): EnvObject {
    const envs = valueFilePaths.map(envFromYAMLFile)
    const env = envs.reduce(merge, {})
    return env
}