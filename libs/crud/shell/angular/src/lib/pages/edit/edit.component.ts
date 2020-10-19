import {Component, OnDestroy, OnInit} from "@angular/core";
import {ActivatedRoute, Router} from "@angular/router";
import {BehaviorSubject, Observable, Subscription} from "rxjs";
import {Location} from "@angular/common";

import {IPageOptions} from "@smartsoft001/angular";
import {IEntity} from "@smartsoft001/domain-core";

import {CrudFacade} from "../../+state/crud.facade";
import {CrudFullConfig} from "../../crud.config";
import {CrudService} from "../../services/crud/crud.service";
import {ICrudFilter} from "../../models/interfaces";

@Component({
  selector: "smart-crud-edit-page",
  templateUrl: "./edit.component.html",
  styleUrls: ["./edit.component.scss"]
})
export class EditComponent<T extends IEntity<string>> implements OnInit, OnDestroy {
  private _subscriptions = new Subscription();

  pageOptions: IPageOptions = {
    title: "",
    showBackButton: true,
    hideMenuButton: true
  };
  mode: string;
  id: string;
  formValue: T;
  formPartialValue: Partial<T>;
  uniqueProvider: (values: Record<keyof T, any>) => Promise<boolean>;

  selected$: Observable<T>;

  constructor(
    private router: Router,
    private facade: CrudFacade<T>,
    private service: CrudService<T>,
    private route: ActivatedRoute,
    public config: CrudFullConfig<T>,
    private location: Location
  ) {
    this.selected$ = this.facade.selected$;
  }

  ngOnInit() {
    if (this.router.routerState.snapshot.url.endsWith('/add')) {
      this.mode = "create";
    } else {
      this.mode = "update";
    }

    this.uniqueProvider = async values => {
      const filter: ICrudFilter = {
        query: []
      };

      Object.keys(values).forEach(key => {
        filter.query.push({
          key: key,
          value: values[key],
          type: "="
        });
      });

      const { totalCount } = await this.service.getList(filter).toPromise();

      return !totalCount;
    }

    this.pageOptions = {
      ...this.pageOptions,
      title:
        this.mode === "create" ? "add" : "change",
      endButtons: [
        {
          icon: this.mode === "create" ? "add" : "save",
          handler: () => {
            if (this.mode === "create") {
              this.facade.create(this.formValue);
            } else {
              this.formPartialValue.id = this.id;
              this.facade.updatePartial(this.formPartialValue as any);
            }

            this.location.back();
          },
          disabled$: new BehaviorSubject(false)
        }
      ]
    };

    if (this.mode === "update")
      this._subscriptions.add(
        this.route.params.subscribe(params => {
          this.facade.select(params.id);
          this.id = params.id;
        })
      );
  }

  onPartialChange(val: Partial<T>) {
    this.formPartialValue = val;
  }

  onChange(val: T) {
    this.formValue = val;
  }

  onValidChange(val: boolean) {
    (this.pageOptions.endButtons[0].disabled$ as BehaviorSubject<boolean>).next(!val);
  }

  ngOnDestroy(): void {
    if (this._subscriptions) {
      this._subscriptions.unsubscribe();
    }
  }
}
