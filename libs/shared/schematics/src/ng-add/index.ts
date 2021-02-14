import {
    apply,
    chain,
    externalSchematic, MergeStrategy, mergeWith, move,
    noop,
    Rule,
    SchematicContext,
    SchematicsException, template,
    Tree, url
} from '@angular-devkit/schematics';
import { NodePackageInstallTask } from '@angular-devkit/schematics/tasks';
import { addModuleImportToRootModule, addPackageJsonDependency, getAppModulePath, getProjectFromWorkspace, getWorkspace, InsertChange, NodeDependency, NodeDependencyType } from 'schematics-utilities';

import {Schema} from "./schema";
import {strings} from "@angular-devkit/core";

function addPackageJsonDependencies(options: Schema): Rule {
    return (host: Tree, context: SchematicContext) => {
        const dependencies: NodeDependency[] = [
            {
                type: NodeDependencyType.Default,
                version: '^0.0.11',
                name: '@smartsoft001/core',
            },
        ];

        dependencies.forEach((dependency) => {
            addPackageJsonDependency(host, dependency);
            context.logger.log('info', `✅️ Added "${dependency.name}" into ${dependency.type}`);
        });

        return host;
    };
}

export function smartNgAdd(options: Schema): Rule {
    return (tree: Tree, context: SchematicContext) => {
        const sourceText = tree.read('package.json')!.toString();
        const json = JSON.parse(sourceText);

        const projectName = json.name;

        const templateSource = apply(url('./files'), [
            template({
                ...strings,
                projectName
            }),
            move(''),
        ]);

        return chain([
            addPackageJsonDependencies(options),
            externalSchematic('@smartsoft001/schematics', 'library', {
                name: "angular",
                type: "angular"
            }),
            externalSchematic('@smartsoft001/schematics', 'library', {
                name: "models",
                type: "default"
            }),
            externalSchematic('@smartsoft001/schematics', 'library', {
                name: "nestjs",
                type: "default"
            }),
            externalSchematic('@smartsoft001/schematics', 'library', {
                name: "services",
                type: "default"
            }),
            mergeWith(templateSource, MergeStrategy.Overwrite),
        ])(tree, context);
    };
}