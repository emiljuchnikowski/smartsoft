import {ChangeDetectorRef, Component, Inject, OnInit, Optional} from "@angular/core";
import {of} from "rxjs";
import {filter} from "rxjs/operators";
import * as _ from "lodash";

import { getModelFieldOptions } from "@smartsoft001/models";
import {
  IModelPossibilitiesProvider,
  MODEL_POSSIBILITIES_PROVIDER
} from "../../../providers/model-possibilities.provider";
import {InputPossibilitiesBaseComponent} from "../base/possibilities.component";

@Component({
  selector: "smart-input-check",
  templateUrl: "./check.component.html",
  styleUrls: ["./check.component.scss"]
})
export class InputCheckComponent<T> extends InputPossibilitiesBaseComponent<T>
  implements OnInit {
  possibilities: Array<{id: string, text: string, checked: boolean}>;

  constructor(
      cd: ChangeDetectorRef,
      @Optional()
      @Inject(MODEL_POSSIBILITIES_PROVIDER) modelPossibilitiesProvider: IModelPossibilitiesProvider
  ) {
    super(cd, modelPossibilitiesProvider);
  }

  protected afterSetOptionsHandler(): void {
    super.afterSetOptionsHandler();

    if (this.internalOptions && !this.possibilities$) {
      this.possibilities$ = of(
        getModelFieldOptions(this.internalOptions.model, this.internalOptions.fieldKey)
          .possibilities
      );
    }

    this.possibilities$.pipe(
        this.takeUntilDestroy,
        filter(list => list)
    ).subscribe(list => {
      const result = list.map(item => {
        if (this.control.value && item?.id?.id) {
          const controlItem = this.control.value.find(ci => ci?.id === item?.id.id);
          if (controlItem) {
            item.id = controlItem;
            item['checked'] = true;
          }
        } else {
          item['checked'] = item.id === this.control.value;
        }

        return item;
      })

      this.possibilities = result;

      this.cd.detectChanges();
    });
  }

  refresh(item: { checked: boolean }): void {
    item.checked = !item.checked;

    const result = this.possibilities.filter(p => p.checked).map(p => p.id);
    this.control.markAsDirty();
    this.control.markAsTouched();
    this.control.setValue(result);
  }

  ngOnInit() {}
}
