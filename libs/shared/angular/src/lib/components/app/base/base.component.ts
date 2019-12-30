import {Input} from "@angular/core";
import {Observable} from "rxjs";
import {map} from "rxjs/operators";

import {IAppOptions} from "../../../models";

export abstract class AppBaseComponent {
    private _options: IAppOptions;

    showMenu$: Observable<boolean>;

    @Input() set options(val: IAppOptions) {
        this._options = val;
        this.initShowMenu();
    }

    private initShowMenu(): void {
        this.showMenu$ = this._options.provider.logged$.pipe(
            map(logged => {
                return logged || (this._options.menu && this._options.menu.showForAnonymous);
            })
        );
    }
}
