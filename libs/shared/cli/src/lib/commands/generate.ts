import {log, runCommand} from "./utils";

export async function generate(args) {
    const [ , type, res ] = args["_"];

    switch (type) {
        case 'library':
        case 'lib':
            log('Generate library')
            runCommand(`ng g lib ${ res } ${ args.type ? '--type' + args.type : '' }`);
            break;
        default:
            console.error('Invalid type', args);
    }
}