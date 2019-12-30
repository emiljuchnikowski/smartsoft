import {Observable} from "rxjs";

export interface IFormFacade {
    submit(): void;
}

export interface IAppFacade {
    logged$: Observable<boolean>;
}
