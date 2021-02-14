import { execSync } from 'child_process';
import { existsSync } from 'fs-extra';
import { join } from 'path';
import {log, runCommand} from "./utils";

function runInstallDeps(target) {
    log('Install dependencies');
    const devDeps = [
        '@smartsoft001/core',
    ];
    const installDevDeps = `npm i ${devDeps.join(' ')} --save`;
    runCommand(installDevDeps, target);
}

function runInstallDevDeps(target) {
    log('Install dev dependencies');
    const devDeps = [
        '@smartsoft001/schematics',
        '@nrwl/angular',
        '@ionic/angular-toolkit',
        '@nestjs/schematics',
        '@nestjs/testing',
        '@ngneat/spectator',
        '@ngrx/schematics',
        '@ngrx/store-devtools',
        '@nrwl/cypress',
        '@nrwl/jest',
        '@nrwl/nest',
        '@nrwl/node',
        '@nrwl/storybook',
        '@storybook/addon-knobs',
        '@storybook/addon-viewport',
        '@storybook/angular',
        '@storybook/client-api',
        'ng-mocks',
        'jest-junit',
        'jest-preset-angular',
        'mock-local-storage',
        'schematics-utilities'
    ];
    const installDevDeps = `npm i ${devDeps.join(' ')} -D`;
    runCommand(installDevDeps, target);
}

function runSetNgConfig(target) {
    log('Set NG config');
    runCommand("ng analytics project off", target);
    runCommand("ng config cli.defaultCollection @smartsoft001/schematics", target);
    runCommand("ng add @smartsoft001/schematics", target);
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

    runInstallDeps(target);

    runInstallDevDeps(target);

    runSetNgConfig(target);
}