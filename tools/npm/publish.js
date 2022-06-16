const execSync = require("child_process").execSync;

function runCommand(command) {
    console.log(` RUN `, command);
    execSync(command, { cwd: process.cwd(), stdio: 'inherit' })
}

const libs = [
    /*
     * SHARED
     */
    {
        name: "shared-utils",
        path: "libs/shared/utils"
    },
    {
        name: "shared-users",
        path: "libs/shared/users"
    },
    {
        name: "shared-models",
        path: "libs/shared/models"
    },
    {
        name: "shared-domain-core",
        path: "libs/shared/domain-core"
    },
    {
        name: "shared-angular",
        path: "libs/shared/angular"
    },
    {
        name: "shared-mongo",
        path: "libs/shared/mongo"
    },
    {
        name: "shared-nestjs",
        path: "libs/shared/nestjs"
    },
    {
        name: "shared-fb",
        path: "libs/shared/fb"
    },
    {
        name: "shared-google",
        path: "libs/shared/google"
    },
    {
        name: "shared-payu",
        path: "libs/shared/payu"
    },
    {
        name: "shared-paynow",
        path: "libs/shared/paynow"
    },
    {
        name: "shared-paypal",
        path: "libs/shared/paypal"
    },

    {
        name: "shared-revolut",
        path: "libs/shared/revolut"
    },

    /*
     * AUTH
     */
    {
        name: "auth-domain",
        path: "libs/auth/domain"
    },
    {
        name: "auth-shell-dtos",
        path: "libs/auth/shell/dtos"
    },
    {
        name: "auth-shell-angular",
        path: "libs/auth/shell/angular"
    },
    {
        name: "auth-shell-app-services",
        path: "libs/auth/shell/app-services"
    },
    {
        name: "auth-shell-nestjs",
        path: "libs/auth/shell/nestjs"
    },

    /*
     * CRUD
     */
    {
        name: "crud-domain",
        path: "libs/crud/domain"
    },
    {
        name: "crud-shell-dtos",
        path: "libs/crud/shell/dtos"
    },
    {
        name: "crud-shell-angular",
        path: "libs/crud/shell/angular"
    },
    {
        name: "crud-shell-app-services",
        path: "libs/crud/shell/app-services"
    },
    {
        name: "crud-shell-nestjs",
        path: "libs/crud/shell/nestjs"
    },

    /*
     * TRANS
     */
    {
        name: "trans-domain",
        path: "libs/trans/domain"
    },
    // {
    //     name: "trans-shell-dtos",
    //     path: "libs/trans/shell/dtos"
    // },
    {
        name: "trans-shell-app-services",
        path: "libs/trans/shell/app-services"
    },
    {
        name: "trans-shell-nestjs",
        path: "libs/trans/shell/nestjs"
    },

    {
        cmd: "schematics:publish",
        path: "libs/shared/schematics"
    },
    {
        name: "shared-core",
        path: "libs/shared/core"
    },
    {
        name: "shared-cli",
        path: "libs/shared/cli"
    }
];

console.log('npm version path');
for (let index = 0; index < libs.length; index++) {
    const lib = libs[index];

    if (lib.path) {
        runCommand('npm version patch --prefix ' + lib.path);
    }
}
// [1,2,3,4,5,6,7,8,9,10].forEach(() => {
//     for (let index = 0; index < libs.length; index++) {
//         const lib = libs[index];
//
//         if (lib.path) {
//             runCommand('npm version patch --prefix ' + lib.path);
//         }
//     }
// })


console.log('publish schematics');
runCommand('npm run schematics:publish');

console.log('build');
runCommand('npm run all:build');

console.log('npm publish');
for (let index = 0; index < libs.length; index++) {
    const lib = libs[index];

    if (lib.path) {
        runCommand('npm publish dist/' + lib.path + ' --access public');
    }
}
