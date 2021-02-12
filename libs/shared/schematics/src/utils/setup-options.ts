import { getWorkspace } from '@schematics/angular/utility/config';
import { parseName } from '@schematics/angular/utility/parse-name';
import { SchematicsException, Tree } from '@angular-devkit/schematics';
import { normalize } from '@angular-devkit/core';
import {buildDefaultPath, getProject} from "schematics-utilities";

export function setupOptions(tree: Tree, options: any): Tree {
    const workspace = getWorkspace(tree);

    if (!options.project) {
        options.project = Object.keys(workspace.projects)[0];
    }

    if (!options.project) {
        throw new SchematicsException('Option "project" is required.');
    }

    const project = getProject(workspace as any, options.project);

    if (options.path === undefined) {
        options.path = normalize(buildDefaultPath(project)); // zwraca ścieżkę src/app
    }

    const parsedPath = parseName(options.path, options.name);

    options.name = parsedPath.name;
    options.path = parsedPath.path;
    return tree;
}