import {
    apply,
    chain,
    externalSchematic,
    MergeStrategy,
    mergeWith,
    move,
    Rule,
    SchematicContext,
    Tree,
    url,
    applyTemplates
} from '@angular-devkit/schematics';
import { normalize, strings } from '@angular-devkit/core';

import {Schema} from "./schema";

export default function (options: Schema): Rule {
    return (tree: Tree, context: SchematicContext) => {
        const projectName = strings.dasherize(options.name);
        const projectPath = `libs/shared/${projectName}`;

        const templateSource = apply(url('./files/base'), [
            applyTemplates({
                ...strings,
                projectName
            }),
            move(projectPath),
        ]);

        const removeFiles = (t: Tree) => {
            t.delete(projectPath + `/src/lib/shared-${projectName}.module.ts`);
            t.delete(projectPath + `/README.md`);
        }

        if (options.type === "angular")
            return chain([
                externalSchematic('@nrwl/angular', 'library', {
                    name: projectName,
                    directory: "shared",
                    unitTestRunner: "jest",
                    linter: "eslint",
                    buildable: true
                }),
                removeFiles,
                mergeWith(templateSource, MergeStrategy.Overwrite)
            ])(tree, context);
        else
            return chain([
                externalSchematic('@nrwl/nest', 'library', {
                    name: projectName,
                    directory: "shared",
                    target: "es6",
                    unitTestRunner: "jest",
                    linter: "eslint",
                    testEnvironment: "node",
                    buildable: true
                }),
                removeFiles,
                mergeWith(templateSource, MergeStrategy.Overwrite),
            ])(tree, context);
    };
}