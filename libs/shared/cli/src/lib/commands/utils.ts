import {execSync} from "child_process";

export function log(...msg) {
    console.log('>', ` SMART `, ...msg)
}

export function runCommand(command: string, cwd = process.cwd()) {
    log(` RUN `, command);
    execSync(command, { cwd, stdio: 'inherit' })
}

export function info(message: string) {
    log(` INFO `, message);
}