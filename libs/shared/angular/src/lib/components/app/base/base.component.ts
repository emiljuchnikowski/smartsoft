import { AfterViewInit, ChangeDetectorRef, Input, OnDestroy, Directive } from "@angular/core";
import {Observable, Subscription} from "rxjs";
import {debounceTime, filter, map} from "rxjs/operators";
import {LoadingController} from "@ionic/angular";
import {NavigationCancel, NavigationEnd, NavigationError, NavigationStart, Router} from "@angular/router";

import {IAppOptions, IMenuItem} from "../../../models/interfaces";

@Directive()
export abstract class AppBaseComponent implements OnDestroy, AfterViewInit {
    private _options: IAppOptions;
    private _subscriptions = new Subscription();

    selectedPath = '';
    showMenu$: Observable<boolean>;
    menuItems$: Observable<IMenuItem[]>;
    logged$: Observable<boolean>;
    username$: Observable<string>;
    loadingPage: boolean;

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

    ngAfterViewInit(): void {
        this.initLoader();
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

    private initLoader() {
        this._subscriptions.add(this.router.events.pipe(
            //debounceTime(500)
        ).subscribe(async routerEvent => {
            if (routerEvent instanceof NavigationStart) {
                this.loadingPage = true;
                this.cd.detectChanges();
            }

            else if (routerEvent instanceof NavigationEnd ||
                routerEvent instanceof NavigationCancel ||
                routerEvent instanceof NavigationError) {
                this.loadingPage = false;
                this.cd.detectChanges();
            }
        }));
    }
}
