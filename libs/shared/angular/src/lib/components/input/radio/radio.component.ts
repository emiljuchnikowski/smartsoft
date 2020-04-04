import { ChangeDetectorRef, Component, OnInit } from "@angular/core";
import { of } from "rxjs";

import { InputBaseComponent } from "../base/base.component";
import { getModelFieldOptions } from "@smartsoft001/models";

@Component({
  selector: "smart-input-radio",
  templateUrl: "./radio.component.html",
  styleUrls: ["./radio.component.scss"]
})
export class InputRadioComponent<T> extends InputBaseComponent<T>
  implements OnInit {
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
  }

  ngOnInit() {}
}
