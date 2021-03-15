const fse = require('fs-extra');

fse.removeSync('../smartsoft-test/test001/node_modules/@smartsoft001/schematics/src');

(async () => {
    await new Promise(res => {
        fse.copySync(
            "dist/libs/shared/schematics",
            "../smartsoft-test/test001/node_modules/@smartsoft001/schematics"
        );
        res();
    });
})()
