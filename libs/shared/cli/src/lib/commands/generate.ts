import {log, runCommand} from "./utils";

export async function generate(args) {
    const [ , type, res ] = args["_"];

    switch (type) {
        case 'library':
        case 'lib':
            log('Generate library')
            runCommand(`ng g @smartsoft001/schematics:lib ${ res } ${ args.type ? '--type' + args.type : '' }`);
            break;
        case 'domain':
            log('Generate domain')
            runCommand(`ng g @smartsoft001/schematics:domain ${ res }`);
            break;
        default:
            console.error('Invalid type', args);
    }
}