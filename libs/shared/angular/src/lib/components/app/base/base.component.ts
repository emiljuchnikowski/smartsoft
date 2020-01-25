import {ChangeDetectorRef, Input, OnDestroy} from "@angular/core";
import {Observable, Subscription} from "rxjs";
import {filter, map} from "rxjs/operators";
import {NavigationEnd, Router} from "@angular/router";

import {IAppOptions, IMenuItem} from "../../../models/interfaces";

export abstract class AppBaseComponent implements OnDestroy {
    private _options: IAppOptions;
    private _subscriptions = new Subscription();

    selectedPath = '';
    showMenu$: Observable<boolean>;
    menuItems$: Observable<IMenuItem[]>;
    logged$: Observable<boolean>;
    username$: Observable<string>;

    @Input() set options(val: IAppOptions) {
        this._options = val;
        this.initMenu();

        this.logged$ = this._options.provider.logged$;
        this.username$ = this._options.provider.username$;
    }

    protected constructor(private router: Router, private cd: ChangeDetectorRef) {
        this.initSelectedPath();
    }

    logout(): void {
        this._options.provider.logout();
    }

    ngOnDestroy(): void {
        if (this._subscriptions)
            this._subscriptions.unsubscribe();
    }

    private initMenu(): void {
        this.showMenu$ = this._options.provider.logged$.pipe(
            map(logged => {
                return logged || (this._options.menu && this._options.menu.showForAnonymous);
            })
        );
        if (this._options.menu)
            this.menuItems$ = this._options.menu.items$;
    }

    private initSelectedPath(): void {
        this._subscriptions.add(
            this.router.events.pipe(
                filter(event => event && (event instanceof NavigationEnd))
            ).subscribe((event: NavigationEnd) => {
                if (event.urlAfterRedirects)
                    this.selectedPath = event.urlAfterRedirects;
                else
                    this.selectedPath = event.url;
                this.cd.detectChanges();
            })
        );
    }
}
