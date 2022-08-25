import {ChangeDetectorRef, Component, Inject, OnInit, Optional} from "@angular/core";
import { of } from "rxjs";
import * as _ from "lodash";
import {map} from "rxjs/operators";

import { getModelFieldOptions } from "@smartsoft001/models";

import {
  IModelPossibilitiesProvider,
  MODEL_POSSIBILITIES_PROVIDER
} from "../../../providers/model-possibilities.provider";
import {InputPossibilitiesBaseComponent} from "../base/possibilities.component";

@Component({
  selector: "smart-input-radio",
  templateUrl: "./radio.component.html",
  styleUrls: ["./radio.component.scss"]
})
export class InputRadioComponent<T> extends InputPossibilitiesBaseComponent<T>
  implements OnInit {

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
      let options = getModelFieldOptions(this.internalOptions.model, this.internalOptions.fieldKey);

      if (!options && this.internalOptions.model[0])
        options = getModelFieldOptions(this.internalOptions.model[0], this.internalOptions.fieldKey);

      this.possibilities$ = of(options.possibilities).pipe(
          map(possibilities => {
            if (!possibilities || _.isArray(possibilities)) return possibilities;

            return Object.keys(possibilities).map(key => ({
              id: possibilities[key],
              text: key
            }));
          })
      );
    }
  }

  ngOnInit() {}
}
