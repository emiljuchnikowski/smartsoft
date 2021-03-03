
import { parseName } from '@schematics/angular/utility/parse-name';
import { SchematicsException, Tree } from '@angular-devkit/schematics';
import { normalize } from '@angular-devkit/core';
import {buildDefaultPath, getProject} from "schematics-utilities";
import {getWorkspace} from "@schematics/angular/utility/workspace";

export async function setupOptions(tree: Tree, options: any): Promise<Tree> {
    const workspace = await getWorkspace(tree);

    if (!options.project) {
        options.project = Object.keys(workspace)[0];
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