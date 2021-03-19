import {Tree} from "@angular-devkit/schematics";

export class SmartConfigService {
    static addDomain(tree: Tree, domain: ISmartConfigDomain): void {
        // tslint:disable-next-line:no-non-null-assertion
        const sourceText = tree.read('smart.config.json')!.toString();
        const config: ISmartConfig = JSON.parse(sourceText);

        config.domains.push(domain);

        tree.overwrite('smart.config.json', JSON.stringify(config));
    }
}

export interface ISmartConfig {
    domains: Array<ISmartConfigDomain>;
}

export interface ISmartConfigDomain {
    name;
}