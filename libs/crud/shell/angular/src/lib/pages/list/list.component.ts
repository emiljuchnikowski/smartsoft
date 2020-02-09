import { ChangeDetectorRef, Component, Injector, OnInit } from "@angular/core";
import { map } from "rxjs/operators";
import { Router } from "@angular/router";

import {
  DynamicComponentLoader,
  IListOptions,
  IPageOptions,
  SharedModule
} from "@smartsoft001/angular";
import { CrudFacade } from "../../+state/crud.facade";
import { IEntity } from "@smartsoft001/domain-core";
import { CrudFullConfig } from "../../crud.config";
import { CommonModule } from "@angular/common";

@Component({
  selector: "smart-crud-list-page",
  templateUrl: "./list.component.html",
  styleUrls: ["./list.component.scss"]
})
export class ListComponent<T extends IEntity<string>> implements OnInit {
  pageOptions: IPageOptions;

  listOptions: IListOptions<T>;

  constructor(
    private facade: CrudFacade<T>,
    private router: Router,
    private config: CrudFullConfig<T>,
    private dynamicComponentLoader: DynamicComponentLoader<T>,
    private injector: Injector,
    private cd: ChangeDetectorRef
  ) {}

  async ngOnInit() {
    this.facade.read();

    this.pageOptions = {
      title: this.config.title,
      endButtons: this.config.add
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
        : []
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
        getData(): void {
          this.facade.read();
        },
        list$: this.facade.list$,
        loading$: this.facade.loaded$.pipe(map(l => !l))
      },
      type: this.config.type,
      details: this.config.details ? {
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
                  cc => cc.component === this.config.details["components"].top
                ).factory
              : null
        }
      } : null,
      edit: this.config.edit ?  {
        options: {
          routingPrefix: "/" + this.router.routerState.snapshot.url + "/"
        }
      } : null,
      remove: this.config.remove ? {
        provider: {
          invoke: id => this.facade.delete(id)
        }
      } : null
    };

    this.cd.detectChanges();
  }
}
