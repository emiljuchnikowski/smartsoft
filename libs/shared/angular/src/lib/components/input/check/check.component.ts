import { ChangeDetectorRef, Component, OnInit } from "@angular/core";
import { of } from "rxjs";

import { InputBaseComponent } from "../base/base.component";
import { getModelFieldOptions } from "@smartsoft001/models";
import {filter} from "rxjs/operators";

@Component({
  selector: "smart-input-check",
  templateUrl: "./check.component.html",
  styleUrls: ["./check.component.scss"]
})
export class InputCheckComponent<T> extends InputBaseComponent<T>
  implements OnInit {
  possibilities: Array<{id: string, text: string, checked: boolean}>;

  constructor(cd: ChangeDetectorRef) {
    super(cd);
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
        return {
          ...item,
          checked: this.control.value && this.control.value.some(v => v === item.id)
        }
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
