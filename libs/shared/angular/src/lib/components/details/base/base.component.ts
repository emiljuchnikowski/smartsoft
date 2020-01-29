import {AfterViewInit, Input, ViewChild, ViewContainerRef} from "@angular/core";
import { Observable } from "rxjs";

import {IDetailsComponentFactories, IDetailsOptions} from "../../../models";
import { getModelFieldsWithOptions, IFieldOptions } from "@smartsoft001/models";
import { IEntity } from "@smartsoft001/domain-core";

export abstract class DetailsBaseComponent<T extends IEntity<string>> implements AfterViewInit {
  private _fields: Array<{ key: string; options: IFieldOptions }>;
  private _type: any;

  componentFactories: IDetailsComponentFactories<T>;

  get fields(): Array<{ key: string; options: IFieldOptions }> {
    return this._fields;
  }

  get type(): any {
    return this._type;
  }

  item$: Observable<T>;
  loading$: Observable<boolean>;

  @ViewChild("topTpl", { read: ViewContainerRef, static: true })
  topTpl: ViewContainerRef;

  @Input() set options(obj: IDetailsOptions<T>) {
    this._type = obj.type;
    this._fields = getModelFieldsWithOptions(new this._type()).filter(
      f => f.options.details
    );
    this.item$ = obj.item$;
    this.loading$ = obj.loading$;
    this.componentFactories = obj.componentFactories;

    this.generateDynamicComponents();
  }

  ngAfterViewInit(): void {
      this.generateDynamicComponents();
  }

    protected generateDynamicComponents(): void {
      if (!this.componentFactories) return;

      if (this.componentFactories.top && this.topTpl) {
          if (this.topTpl.get(0)) this.topTpl.clear();
          this.topTpl.createComponent(this.componentFactories.top);
      }
  }
}
