import { Directive, Inject, Input, OnInit, Optional } from "@angular/core";
import { Debounce } from "lodash-decorators";
import {Observable} from "rxjs";

import { IEntity } from "@smartsoft001/domain-core";
import { IModelFilter } from "@smartsoft001/models";

import { ICrudFilter } from "../../../models/interfaces";
import { CrudFacade } from "../../../+state/crud.facade";
import {
  CRUD_MODEL_POSSIBILITIES_PROVIDER,
  ICrudModelPossibilitiesProvider,
} from "../../../providers/model-possibilities/model-possibilities.provider";
import {CrudConfig} from "../../../crud.config";

@Directive()
export class BaseComponent<T extends IEntity<string>> implements OnInit {
  possibilities$: Observable<{ id: any; text: string }[]>;

  @Input() item: IModelFilter;
  @Input() filter: ICrudFilter;

  get value(): any {
    const query = this.filter.query.find(
      (q) => q.key === this.item.key && q.type === this.item.type
    );
    return query?.value;
  }

  set value(val: any) {
    this.refresh(val);
  }

  constructor(
    private facade: CrudFacade<T>,
    private config: CrudConfig<T>,
    @Optional()
    @Inject(CRUD_MODEL_POSSIBILITIES_PROVIDER)
    private modelPossibilitiesProvider: ICrudModelPossibilitiesProvider
  ) {}

  @Debounce(500)
  refresh(val: any): void {
    let query = this.filter.query.find(
        (q) => q.key === this.item.key && q.type === this.item.type
    );

    if (val === null || val === undefined || val === '') {
      const index = this.filter.query.indexOf(query);
      if (index > -1) {
        this.filter.query.splice(index, 1);
      }

      this.facade.read(this.filter);
      return;
    }

    if (!query) {
      query = {
        key: this.item.key,
        type: this.item.type,
        value: null,
      };

      this.filter.query.push(query);
    }

    query.value = val;
    query.label = this.item.label;

    this.facade.read(this.filter);
  }

  ngOnInit(): void {
    this.initPossibilities();
  }

  private initPossibilities(): void {
    let possibilities = this.item.possibilities$;

    if (this.modelPossibilitiesProvider) {
      const possibilitiesFromProvider = this.modelPossibilitiesProvider.get(this.config.type);
      if (possibilitiesFromProvider && possibilitiesFromProvider[this.item.key])
        possibilities = possibilitiesFromProvider[this.item.key];
    }

    this.possibilities$ = possibilities;
  }
}
