import {
  ChangeDetectorRef,
  Component,
  Injector,
  OnDestroy,
  OnInit
} from "@angular/core";
import { map, tap } from "rxjs/operators";
import { Router } from "@angular/router";
import { CommonModule } from "@angular/common";
import { combineLatest, Observable, Subscription } from "rxjs";

import {
  DynamicComponentLoader,
  IListOptions,
  IPageOptions,
  SharedModule
} from "@smartsoft001/angular";
import { CrudFacade } from "../../+state/crud.facade";
import { IEntity } from "@smartsoft001/domain-core";
import { CrudFullConfig } from "../../crud.config";
import { ICrudFilter } from "../../models/interfaces";

@Component({
  selector: "smart-crud-list-page",
  templateUrl: "./list.component.html",
  styleUrls: ["./list.component.scss"]
})
export class ListComponent<T extends IEntity<string>>
  implements OnInit, OnDestroy {
  private _subscriptions = new Subscription();

  pageOptions: IPageOptions;
  listOptions: IListOptions<T>;
  filter: ICrudFilter;
  links: { next; prev };

  filter$: Observable<ICrudFilter> = this.facade.filter$.pipe(
    tap(filter => {
      this.filter = filter;
    })
  );

  constructor(
    private facade: CrudFacade<T>,
    private router: Router,
    private config: CrudFullConfig<T>,
    private dynamicComponentLoader: DynamicComponentLoader<T>,
    private injector: Injector,
    private cd: ChangeDetectorRef
  ) {
    this._subscriptions.add(
      this.facade.links$.subscribe(links => {
        this.links = links;
      })
    );
  }

  async ngOnInit() {
    this.facade.read({
      limit: this.config.pagination ? this.config.pagination.limit : null,
      offset: this.config.pagination ? 0 : null,
      sortBy: this.config.sort['default'],
      sortDesc: this.config.sort['defaultDesc']
    });

    this.pageOptions = {
      title: this.config.title,
      search: this.config.search
        ? {
            text$: this.filter$.pipe(map(f => (f ? f.searchText : null))),
            set: txt => {
              if (txt !== this.filter.searchText)
                this.facade.read({
                  ...this.filter,
                  searchText: txt,
                  offset: 0
                });
            }
          }
        : null,
      endButtons: [
        ...(this.config.add
          ? [
              {
                icon: "add",
                handler: () => {
                  this.router.navigate([
                    "/" + this.router.routerState.snapshot.url + "/add"
                  ]);
                }
              }
            ]
          : []),
        ...(this.config.buttons ? this.config.buttons : [])
      ]
    };

    const compiledComponents = await this.dynamicComponentLoader.getComponentsWithFactories(
      {
        components:
          this.config.details &&
          this.config.details["components"] &&
          this.config.details["components"].top
            ? [this.config.details["components"].top]
            : [],
        imports: [SharedModule, CommonModule]
      }
    );

    this.listOptions = {
      provider: {
        getData: (filter): void => {
          const global = {
            ...this.filter,
            ...filter
          };
          this.facade.read(global);
        },
        list$: this.facade.list$,
        loading$: this.facade.loaded$.pipe(map(l => !l))
      },
      type: this.config.type,
      details: this.config.details
        ? {
            provider: {
              getData: id => {
                this.facade.select(id);
              },
              clearData: () => {
                this.facade.unselect();
              },
              item$: this.facade.selected$,
              loading$: this.facade.loaded$.pipe(map(l => !l))
            },
            componentFactories: {
              top:
                this.config.details &&
                this.config.details["components"] &&
                this.config.details["components"].top
                  ? compiledComponents.find(
                      cc =>
                        cc.component === this.config.details["components"].top
                    ).factory
                  : null
            }
          }
        : null,
      edit: this.config.edit
        ? {
            options: {
              routingPrefix: "/" + this.router.routerState.snapshot.url + "/"
            }
          }
        : null,
      remove: this.config.remove
        ? {
            provider: {
              invoke: id => this.facade.delete(id)
            }
          }
        : null,
      pagination: {
        ...this.config.pagination,
        loadNextPage: () => {
          if (!this.links || !this.links.next) return Promise.resolve(false);

          return new Promise(res => {
            const sub = this.facade.loaded$.subscribe(l => {
              if (l) {
                // if (sub && !sub.closed) sub.unsubscribe();
                setTimeout(() => {
                  res(this.links && this.links.next);
                });
              }
            });

            this.facade.read({
              ...this.filter,
              offset: this.filter.offset + this.filter.limit
            });
          });
        },
        loadPrevPage: () => {
          if (!this.links || !this.links.prev) return Promise.resolve(false);

          return new Promise(res => {
            const sub = this.facade.loaded$.subscribe(l => {
              if (l) {
                // if (sub && !sub.closed) sub.unsubscribe();
                setTimeout(() => {
                  res(this.links && this.links.prev);
                });
              }
            });

            this.facade.read({
              ...this.filter,
              offset: this.filter.offset - this.filter.limit
            });
          });
        },
        page$: this.facade.filter$.pipe(
          map(f => {
            return f.offset / f.limit + 1;
          })
        ),
        totalPages$: combineLatest(
          this.facade.filter$,
          this.facade.totalCount$
        ).pipe(
          map(([filter, totalCount]) => {
            return Math.ceil(totalCount / filter.limit);
          })
        )
      },
      sort: this.config.sort
    };

    this.cd.detectChanges();
  }

  ngOnDestroy(): void {
    if (this._subscriptions) {
      this._subscriptions.unsubscribe();
    }
  }
}
