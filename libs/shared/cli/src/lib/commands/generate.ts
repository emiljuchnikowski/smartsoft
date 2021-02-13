import {log, runCommand} from "./utils";

export async function generate(args) {
    const [ , type, res, opt1 ] = args["_"];

    switch (type) {
        case 'library':
            log('Generate library')
            runCommand(`ng g library ${ res } ${ opt1 ? opt1 : '' }`);
            break;
        default:
            console.error('Invalid type', args);
    }
}