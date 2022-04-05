import {ChangeDetectorRef, Component, Inject, OnInit} from '@angular/core';

import {InputBaseComponent} from "../base/base.component";
import {IFormOptions} from "../../../models/interfaces";
import {FORM_COMPONENT_TOKEN} from "../../../shared.inectors";

@Component({
  selector: 'smart-input-object',
  templateUrl: './object.component.html',
  styleUrls: ['./object.component.scss'],
})
export class InputObjectComponent<T, TChild> extends InputBaseComponent<T> implements OnInit {
  childOptions: IFormOptions<TChild>;

  constructor(cd: ChangeDetectorRef, @Inject(FORM_COMPONENT_TOKEN) public formComponent: any) {
    super(cd);
  }

  protected afterSetOptionsHandler() {
    this.childOptions = {
      treeLevel: this.internalOptions.treeLevel + 1,
      mode: this.internalOptions.mode,
      control: this.control,
      model: (this.internalOptions.model[this.internalOptions.fieldKey] as TChild)
    }
  }

  ngOnInit() {}

}
