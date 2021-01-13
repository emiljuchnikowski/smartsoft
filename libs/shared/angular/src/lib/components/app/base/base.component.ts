import {
  AfterViewInit,
  ChangeDetectorRef,
  Input,
  OnDestroy,
  Directive,
  ElementRef,
  PLATFORM_ID,
  Inject, ViewChild, ViewContainerRef,
} from "@angular/core";
import { Observable, Subscription } from "rxjs";
import { filter, map } from "rxjs/operators";
import { DOCUMENT } from "@angular/common";
import {
  NavigationCancel,
  NavigationEnd,
  NavigationError,
  NavigationStart,
  Router,
} from "@angular/router";
import { isPlatformBrowser } from "@angular/common";

import { IAppOptions, IMenuItem } from "../../../models/interfaces";
import { StyleService } from "../../../services/style/style.service";
import {MenuService} from "../../../services/menu/menu.service";

@Directive()
export abstract class AppBaseComponent implements OnDestroy, AfterViewInit {
  private _options: IAppOptions;
  private _subscriptions = new Subscription();

  selectedPath = "";
  showMenu$: Observable<boolean>;
  menuItems$: Observable<IMenuItem[]>;
  logged$: Observable<boolean>;
  username$: Observable<string>;
  loadingPage: boolean;
  logo: string;

  @Input() set options(val: IAppOptions) {
    this._options = val;
    this.initMenu();

    this.logged$ = this._options.provider.logged$;
    this.username$ = this._options.provider.username$;
    this.logo = val.logo;

    this.refreshStyles();
  }

  @ViewChild("endMenuContainer", { read: ViewContainerRef }) endMenuContainer: ViewContainerRef;

  protected constructor(
    private router: Router,
    private cd: ChangeDetectorRef,
    private elementRef: ElementRef,
    private styleService: StyleService,
    private menuService: MenuService,
    @Inject(PLATFORM_ID) private readonly platformId,
    @Inject(DOCUMENT) private document: any
  ) {
    this.initSelectedPath();

    if (isPlatformBrowser(this.platformId)) {
      this.styleService.init(elementRef);
    }
  }

  logout(): void {
    this._options.provider.logout();
  }

  async ngAfterViewInit(): Promise<void> {
    this.initLoader();
    this.refreshStyles();

    await this.menuService.init(this.endMenuContainer);
  }

  ngOnDestroy(): void {
    if (this._subscriptions) this._subscriptions.unsubscribe();
  }

  private initMenu(): void {
    this.showMenu$ = this._options.provider.logged$.pipe(
      map((logged) => {
        return (
          logged || (this._options.menu && this._options.menu.showForAnonymous)
        );
      })
    );
    if (this._options.menu) this.menuItems$ = this._options.menu.items$;
  }

  private initSelectedPath(): void {
    this._subscriptions.add(
      this.router.events
        .pipe(filter((event) => event && event instanceof NavigationEnd))
        .subscribe((event: NavigationEnd) => {
          if (event.urlAfterRedirects)
            this.selectedPath = event.urlAfterRedirects;
          else this.selectedPath = event.url;
          this.cd.detectChanges();
        })
    );
  }

  private initLoader() {
    this._subscriptions.add(
      this.router.events
        .pipe
        //debounceTime(500)
        ()
        .subscribe(async (routerEvent) => {
          if (routerEvent instanceof NavigationStart) {
            this.loadingPage = true;
            this.cd.detectChanges();
          } else if (
            routerEvent instanceof NavigationEnd ||
            routerEvent instanceof NavigationCancel ||
            routerEvent instanceof NavigationError
          ) {
            this.loadingPage = false;
            this.cd.detectChanges();
          }
        })
    );
  }

  private refreshStyles(): void {
    if (isPlatformBrowser(this.platformId)) {
      setTimeout(() => {
        this.styleService.set(this._options.style);

        if (this.logo && this.document.getElementById("app-favicon")) {
          this.document
            .getElementById("app-favicon")
            .setAttribute("href", this.logo);
        }
      });
    }
  }
}
