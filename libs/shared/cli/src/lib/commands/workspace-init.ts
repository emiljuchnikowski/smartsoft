import { execSync } from 'child_process';
import { existsSync } from 'fs-extra';
import { join } from 'path';

function log(...msg) {
    console.log('>', ` SMART `, ...msg)
}

function runCommand(command: string, cwd = process.cwd()) {
    log(` RUN `, command);
    execSync(command, { cwd, stdio: [] })
}

function info(message: string) {
    log(` INFO `, message);
}

export async function workspaceInit({ name }: {
    name: string
}) {
    const target = join(process.cwd(), name)
    if (existsSync(target)) {
        throw new Error(`Path ${target} already exists`)
    }
    log('Creating Nx Workspace')
    const params = [
        '--nx-cloud=true',
        '--preset=empty',
        '--cli=angular',
        '--package-manager=npm',
    ]
    const createCommand = `npx create-nx-workspace@latest ${name} ${params.join(' ')}`
    runCommand(createCommand)

    log('Install dependencies')
    const deps = ['@smartsoft001/core'];
    const installDeps = `npm i ${deps.join(' ')} --save`;
    runCommand(installDeps, target);

    log('Install dev dependencies')
    const devDeps = [
        '@smartsoft001/core',
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
        'mock-local-storage'
    ];
    const installDevDeps = `npm i ${devDeps.join(' ')} -D`;
    runCommand(installDevDeps, target);
}