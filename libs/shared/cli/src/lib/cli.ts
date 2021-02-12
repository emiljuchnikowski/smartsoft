import { basename } from 'path';
import * as yargs from 'yargs';

import { workspaceInit } from "./commands/workspace-init";
import {systemPrepare} from "./commands/system-prepare";
//import { systemPrepare } from './commands/system-prepare'

// tslint:disable-next-line:no-unused-expression
yargs
    .command(
        'init',
        'Initialize new smartsoft workspace',
        {
            name: {
                alias: 'n',
                type: 'string',
                demandOption: true,
            },
        },
        async (args) => {
            await workspaceInit({
                name: args.name,
            })
        },
    )
    .command(
        'prepare',
        'Prepare system dependencies',
        async (args) => {
            await systemPrepare()
        },
    )
    .command(
        '$0',
        'Show usage',
        () => null,
        (args) => {
            console.log(basename(args['$0']))
            console.log(`See --help for usage.`)
            console.log(args)
        },
    ).argv