import {IAppProvider} from "../providers";

export interface IAppOptions {
    provider: IAppProvider;
    menu?: {
        showForAnonymous?: boolean
    }
}
