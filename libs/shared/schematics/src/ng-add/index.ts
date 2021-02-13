import { chain, noop, Rule, SchematicContext, SchematicsException, Tree } from '@angular-devkit/schematics';
import { NodePackageInstallTask } from '@angular-devkit/schematics/tasks';
import { addModuleImportToRootModule, addPackageJsonDependency, getAppModulePath, getProjectFromWorkspace, getWorkspace, InsertChange, NodeDependency, NodeDependencyType } from 'schematics-utilities';

import {Schema} from "./schema";

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
    return chain([
        addPackageJsonDependencies(options),
    ]);
}