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
        const domainName = strings.dasherize(options.name);
        const projectPath = `libs/${domainName}`;

        const templateSource = apply(url('./files'), [
            template({
                ...strings,
                domainName
            }),
            move(projectPath),
        ]);

        const removeModules = (t: Tree) => {
            //t.delete(projectPath + `/domain/src/lib/shared-${domainName}.module.ts`)
        }

        return chain([
            externalSchematic('@nrwl/nest', 'library', {
                name: 'domain',
                directory: domainName,
                target: "es6",
                unitTestRunner: "jest",
                linter: "eslint",
                testEnvironment: "node"
            }),
            externalSchematic('@nrwl/nest', 'library', {
                name: 'app-services',
                directory: domainName + '/shell',
                target: "es6",
                unitTestRunner: "jest",
                linter: "eslint",
                testEnvironment: "node"
            }),
            externalSchematic('@nrwl/nest', 'library', {
                name: 'dtos',
                directory: domainName + '/shell',
                target: "es6",
                unitTestRunner: "jest",
                linter: "eslint",
                testEnvironment: "node"
            }),
            externalSchematic('@nrwl/angular', 'library', {
                name: 'angular',
                directory: domainName + '/shell',
                style: "scss",
                unitTestRunner: "jest",
                linter: "tslint"
            }),
            //mergeWith(templateSource, MergeStrategy.Overwrite),
            removeModules
        ])(tree, context);
    };
}