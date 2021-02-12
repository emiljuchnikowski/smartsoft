import { apply, chain, externalSchematic, mergeWith, move, Rule, SchematicContext, template, Tree, url } from '@angular-devkit/schematics';
import { normalize, strings } from '@angular-devkit/core';

import {Schema} from "./schema";
import {setupOptions} from "../../utils/setup-options";

export default function (options: Schema): Rule {
    return (tree: Tree, context: SchematicContext) => {
        // setupOptions(tree, options);
        //
        // const movePath = (options.flat) ?
        //     normalize(options.path) :
        //     normalize(options.path + '/' + strings.dasherize(options.name));
        //
        // const templateSource = apply(url('./files'), [
        //     template({
        //         ...strings,
        //         ...options,
        //     }),
        //     move(movePath),
        // ]);

        if (options.type === "angular")
            return chain([
                externalSchematic('@nrwl/angular', 'library', {
                    name: options.name,
                    directory: "shared",
                    style: "scss",
                    unitTestRunner: "jest",
                    linter: "tslint"
                }),
                //mergeWith(templateSource),
            ])(tree, context);
        else
            return chain([
                externalSchematic('@nrwl/nest', 'library', {
                    name: options.name,
                    directory: "shared",
                    target: "es6",
                    unitTestRunner: "jest",
                    linter: "eslint",
                    testEnvironment: "node"
                }),
                //mergeWith(templateSource),
            ])(tree, context);
    };
}