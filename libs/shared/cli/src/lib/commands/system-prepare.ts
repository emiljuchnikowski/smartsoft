import {log, runCommand} from "./utils";

export async function systemPrepare() {
    log('Install nx cli');
    runCommand(`npm i -g nx@11.0.18 -g`);

    log('Install angular cli');
    runCommand(`npm i @angular/cli@11.0.5 -g`);

    log('Install ionic cli');
    runCommand(`npm i -g @ionic/cli@6.12.3 -g`);
}