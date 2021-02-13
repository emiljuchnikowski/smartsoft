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
    template
} from '@angular-devkit/schematics';
import { normalize, strings } from '@angular-devkit/core';

import {Schema} from "./schema";

export default function (options: Schema): Rule {
    return (tree: Tree, context: SchematicContext) => {
        const projectName = strings.dasherize(options.name);
        const projectPath = `libs/shared/${projectName}`;

        const templateSource = apply(url('./files/base'), [
            template({
                ...strings,
                projectName
            }),
            move(projectPath),
        ]);

        const removeModule = (t: Tree) => {
            t.delete(projectPath + `/src/lib/shared-${projectName}.module.ts`)
        }

        if (options.type === "angular")
            return chain([
                externalSchematic('@nrwl/angular', 'library', {
                    name: projectName,
                    directory: "shared",
                    style: "scss",
                    unitTestRunner: "jest",
                    linter: "tslint"
                }),
                mergeWith(templateSource, MergeStrategy.Overwrite),
                removeModule
            ])(tree, context);
        else
            return chain([
                externalSchematic('@nrwl/nest', 'library', {
                    name: projectName,
                    directory: "shared",
                    target: "es6",
                    unitTestRunner: "jest",
                    linter: "eslint",
                    testEnvironment: "node"
                }),
                mergeWith(templateSource, MergeStrategy.Overwrite),
                removeModule
            ])(tree, context);
    };
}