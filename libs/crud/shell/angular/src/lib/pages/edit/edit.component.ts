import {Component, OnDestroy, OnInit} from "@angular/core";
import {ActivatedRoute, Router} from "@angular/router";
import {BehaviorSubject, Observable, Subscription} from "rxjs";

import {IPageOptions} from "@smartsoft001/angular";
import {CrudFacade} from "../../+state/crud.facade";
import {IEntity} from "@smartsoft001/domain-core";
import {CrudFullConfig} from "../../crud.config";
import {Location} from "@angular/common";

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

  selected$: Observable<T>;

  constructor(
    private router: Router,
    private facade: CrudFacade<T>,
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
