import {IAppFacade} from "../facadies";

export interface IAppOptions {
    facade: IAppFacade;
    menu?: {
        showForAnonymous?: boolean
    }
}
