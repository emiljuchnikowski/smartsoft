import { execSync } from 'child_process';
import { existsSync } from 'fs-extra';
import { join } from 'path';
import {log, runCommand} from "./utils";

function runInstallDeps(target) {
    log('Install dependencies');
    const deps = [
        '@smartsoft001/core',
        "passport",
        '@angular/material',
        '@angular/cdk',
        '@ionic-native/core'
    ];
    const installDevDeps = `npm i ${deps.join(' ')} --save --force`;
    runCommand(installDevDeps, target);
}

function runInstallDevDeps(target) {
    log('Install dev dependencies');
    const devDeps = [
        //'@smartsoft001/schematics',
        '@ionic/angular-toolkit',
        '@ngneat/spectator',
        '@ngrx/schematics',
        '@ngrx/store-devtools',
        'ng-mocks',
        'jest-junit',
        'jest-preset-angular',
        'mock-local-storage',
        'schematics-utilities'
    ];
    const installDevDeps = `npm i ${devDeps.join(' ')} -D --force`;
    runCommand(installDevDeps, target);
}

function runSetNgConfig(target) {
    log('Set NG config');
    //runCommand("ng analytics project off", target);
    runCommand("ng config cli.defaultCollection @smartsoft001/schematics", target);
    runCommand("ng add @smartsoft001/schematics", target);
}

function runNgAdd(target) {
    log('NG add');
    const plugins = [
        '@nrwl/angular',
        '@nrwl/node',
        '@nrwl/nest',
        '@nrwl/cypress',
        '@nrwl/storybook',
        '@nrwl/jest',
    ];

    plugins.forEach(plugin => {
        runCommand("ng add " + plugin, target);
    })
}

function createNxWorkspace(name: string) {
    log('Creating Nx Workspace')
    const params = [
        '--nx-cloud=true',
        '--preset=empty',
        '--cli=angular',
        '--package-manager=npm',
    ]
    const createCommand = `npx create-nx-workspace@latest ${name} ${params.join(' ')}`
    runCommand(createCommand);
}

export async function workspaceInit({ name }: {
    name: string
}) {
    const target = join(process.cwd(), name)
    if (existsSync(target)) {
        throw new Error(`Path ${target} already exists`)
    }

    createNxWorkspace(name);

    runNgAdd(target);

    runInstallDeps(target);

    runInstallDevDeps(target);

    runSetNgConfig(target);
}