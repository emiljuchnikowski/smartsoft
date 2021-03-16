import {Tree} from "@angular-devkit/schematics";

export class PackageService {
    static getProjectName(tree: Tree): string {
        // tslint:disable-next-line:no-non-null-assertion
        const sourceText = tree.read('package.json')!.toString();
        const json = JSON.parse(sourceText);

        return json.name;
    }
}