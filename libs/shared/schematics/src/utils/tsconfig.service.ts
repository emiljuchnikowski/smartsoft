import {Tree} from "@angular-devkit/schematics";

export class TsConfigService {
    static setPath(tree: Tree, key: string, value: string): void {
        // tslint:disable-next-line:no-non-null-assertion
        const sourceText = tree.read('tsconfig.base.json')!.toString();
        const config: ITsConfig = JSON.parse(sourceText);

        config.compilerOptions.paths[key] = [value];

        tree.overwrite('tsconfig.base.json', JSON.stringify(config));
    }
}

export interface ITsConfig {
    compilerOptions: {
        paths: any
    }
}