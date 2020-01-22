import { Component, OnInit } from "@angular/core";
import { map } from "rxjs/operators";
import { Router } from "@angular/router";

import { IListOptions, IPageOptions } from "@smartsoft001/angular";
import { CrudFacade } from "../../+state/crud.facade";
import { IEntity } from "@smartsoft001/domain-core";
import { CrudFullConfig } from "../../crud.config";

@Component({
  selector: "smart-crud-list-page",
  templateUrl: "./list.component.html",
  styleUrls: ["./list.component.scss"]
})
export class ListComponent<T extends IEntity<string>> implements OnInit {
  pageOptions: IPageOptions;

  listOptions: IListOptions<T> = {
    provider: {
      getData(): void {
        this.facade.read();
      },
      list$: this.facade.list$,
      loading$: this.facade.loaded$.pipe(map(l => !l))
    },
    detailsProvider: {
      getData: id => {
        this.facade.select(id);
      },
      clearData: () => {
        this.facade.unselect();
      },
      item$: this.facade.selected$,
      loading$: this.facade.loaded$.pipe(map(l => !l))
    },
    type: this.config.type,
    details: this.config.details,
    edit: this.config.edit,
    editOptions: {
      routingPrefix: "/" + this.router.routerState.snapshot.url + "/"
    }
  };

  constructor(
    private facade: CrudFacade<T>,
    private router: Router,
    private config: CrudFullConfig<T>
  ) {}

  ngOnInit() {
    this.facade.read();

    this.pageOptions = {
      title: this.config.title,
      endButtons: this.config.add ? [
        {
          icon: "add",
          handler: () => {
            this.router.navigate([
              "/" + this.router.routerState.snapshot.url + "/add"
            ]);
          }
        }
      ] : []
    };
  }
}
