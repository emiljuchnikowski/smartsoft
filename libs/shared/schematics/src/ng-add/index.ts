import {
    apply,
    chain,
    externalSchematic, MergeStrategy, mergeWith, move,
    noop,
    Rule,
    SchematicContext,
    SchematicsException, applyTemplates,
    Tree, url
} from '@angular-devkit/schematics';
import { NodePackageInstallTask } from '@angular-devkit/schematics/tasks';
import { addModuleImportToRootModule, addPackageJsonDependency, getAppModulePath, getProjectFromWorkspace, getWorkspace, InsertChange, NodeDependency, NodeDependencyType } from 'schematics-utilities';

import {Schema} from "./schema";
import {strings} from "@angular-devkit/core";
import {logRule, PackageService} from "../utils";

function addPackageJsonDependencies(options: Schema): Rule {
    return (host: Tree, context: SchematicContext) => {
        const dependencies: NodeDependency[] = [
            {
                type: NodeDependencyType.Default,
                version: '^1.0.23',
                name: '@smartsoft001/core',
            },
        ];

        dependencies.forEach((dependency) => {
            addPackageJsonDependency(host, dependency);
        });

        return host;
    };
}

export function smartNgAdd(options: Schema): Rule {
    return (tree: Tree, context: SchematicContext) => {
        const projectName = PackageService.getProjectName(tree);

        const templateSource = apply(url('./files'), [
            applyTemplates({
                ...strings,
                projectName
            }),
            move(''),
        ]);

        return chain([
            addPackageJsonDependencies(options),
            logRule('Add packages'),
            externalSchematic('@smartsoft001/schematics', 'library', {
                name: "angular",
                type: "angular"
            }),
            logRule('Add angular library'),
            externalSchematic('@smartsoft001/schematics', 'library', {
                name: "models",
                type: "default"
            }),
            logRule('Add models library'),
            externalSchematic('@smartsoft001/schematics', 'library', {
                name: "nestjs",
                type: "default"
            }),
            logRule('Add models nestjs'),
            externalSchematic('@smartsoft001/schematics', 'library', {
                name: "services",
                type: "default"
            }),
            logRule('Add services library'),
            mergeWith(templateSource, MergeStrategy.Overwrite),
            logRule('Add base files'),
            (t: Tree) => {
                // tslint:disable-next-line:no-non-null-assertion
                const sourceTextReadme = t.read('SMART.md')!.toString();

                t.overwrite('README.md', sourceTextReadme);
                t.delete('SMART.md');
            }
        ])(tree, context);
    };
}