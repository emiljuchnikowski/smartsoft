import {
    apply,
    chain,
    externalSchematic,
    move,
    Rule,
    SchematicContext,
    Tree,
    url,
    applyTemplates, mergeWith, MergeStrategy
} from '@angular-devkit/schematics';
import { strings } from '@angular-devkit/core';

import {Schema} from "./schema";
import {PackageService, TsConfigService} from "../../utils";

export default function (options: Schema): Rule {
    return (tree: Tree, context: SchematicContext) => {
        const domainName = strings.dasherize(options.name);
        const domainNamePluralize = strings.dasherize(options.name) + 's';
        const projectPath = `libs/${domainNamePluralize}`;

        const templateSource = apply(url('./files'), [
            applyTemplates({
                ...strings,
                domainName
            }),
            move(projectPath),
        ]);

        const clearModules = (t: Tree) => {
            t.delete(projectPath + `/domain/src/lib/${domainNamePluralize}-domain.module.ts`);
            t.delete(projectPath + `/domain/README.md`);

            t.delete(projectPath + `/shell/angular/src/lib/${domainNamePluralize}-shell-angular.module.ts`);
            t.delete(projectPath + `/shell/angular/README.md`);

            t.delete(projectPath + `/shell/app-services/src/lib/${domainNamePluralize}-shell-app-services.module.ts`);
            t.delete(projectPath + `/shell/app-services/README.md`);

            t.delete(projectPath + `/shell/dtos/src/lib/${domainNamePluralize}-shell-dtos.module.ts`);
            t.delete(projectPath + `/shell/dtos/README.md`);
        }

        const changeTsConfig = (t: Tree) => {
            const projectName = PackageService.getProjectName(t);

            TsConfigService.setPath(
                t,
                `@${projectName}/${domainNamePluralize}/domain/features`,
                `libs/${domainNamePluralize}/domain/src/features.ts`
                );
        }

        return chain([
            externalSchematic('@nrwl/nest', 'library', {
                name: 'domain',
                directory: domainNamePluralize,
                target: "es6",
                unitTestRunner: "jest",
                linter: "eslint",
                testEnvironment: "node"
            }),
            externalSchematic('@nrwl/nest', 'library', {
                name: 'app-services',
                directory: domainNamePluralize + '/shell',
                target: "es6",
                unitTestRunner: "jest",
                linter: "eslint",
                testEnvironment: "node"
            }),
            externalSchematic('@nrwl/nest', 'library', {
                name: 'dtos',
                directory: domainNamePluralize + '/shell',
                target: "es6",
                unitTestRunner: "jest",
                linter: "eslint",
                testEnvironment: "node"
            }),
            externalSchematic('@nrwl/angular', 'library', {
                name: 'angular',
                directory: domainNamePluralize + '/shell',
                style: "scss",
                unitTestRunner: "jest",
                linter: "tslint"
            }),
            clearModules,
            mergeWith(templateSource, MergeStrategy.Overwrite),
            changeTsConfig
        ])(tree, context);
    };
}