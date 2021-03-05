import * as path from 'path';
import { envFromYAMLFiles, valueAt } from './yaml';

describe('yaml', () => {
    describe('#valueAt', () => {
        const testObject = { a: { b: 'c' } }

        it.each`
            path | expected
            ${"#/"} | ${testObject}
            ${"#/a"} | ${testObject.a}
            ${"#/a/b"} | ${testObject.a.b}
        `(
            'should resolve path $path to $expected',
            ({ path, expected }) => {
                expect(valueAt(testObject, path)).toEqual(expected);
            }
        );
    });

    describe('#envFromYAMLFiles', () => {
        it('should be an empty object if no files are passed', () => {
            expect(envFromYAMLFiles([])).toEqual({})
        });

        it('should load a single yaml file', () => {
            expect(envFromYAMLFiles([
                path.resolve(__dirname, '..', 'fixtures', 'yaml1.yaml#/env')
            ])).toEqual({ VALUES_A: "A" })
        });

        it('should load multiple yaml files', () => {
            expect(envFromYAMLFiles([
                path.resolve(__dirname, '..', 'fixtures', 'yaml1.yaml#/env'), 
                path.resolve(__dirname, '..', 'fixtures', 'yaml2.yaml#/env')
            ])).toEqual({ VALUES_A: "A", VALUES_B: "B" })
        });
    });
});