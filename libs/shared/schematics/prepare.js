const execSync = require("child_process").execSync;
const cwd = process.cwd();
const fse = require('fs-extra');

execSync("copyfiles --all libs/shared/schematics/src/**/*.json dist", { cwd, stdio: 'inherit'});
execSync("copyfiles --all libs/shared/schematics/src/**/**/*.json dist", { cwd, stdio: 'inherit' });
execSync("copyfiles --all libs/shared/schematics/src/**/files/**/* dist", { cwd, stdio: 'inherit' });

(async () => {
    await new Promise(res => {
        fse.copySync("libs/shared/schematics/src/ng-add/files", "dist/libs/shared/schematics/src/ng-add/files");
        res();
    });
})()