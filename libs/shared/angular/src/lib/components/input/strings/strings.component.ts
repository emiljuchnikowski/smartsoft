import {ChangeDetectorRef, Component, OnInit} from '@angular/core';

import {InputBaseComponent} from "../base/base.component";
import {UntypedFormBuilder, UntypedFormControl} from "@angular/forms";

@Component({
  selector: 'smart-input-strings',
  templateUrl: './strings.component.html',
  styleUrls: ['./strings.component.scss'],
})
export class InputStringsComponent<T> extends InputBaseComponent<T> implements OnInit {
  list: Array<UntypedFormControl> = [];

  constructor(cd: ChangeDetectorRef, private fb: UntypedFormBuilder) {
    super(cd);
  }

  afterSetOptionsHandler() {
    if (this.control.value) {
      this.list = [];
      this.control.value.forEach(i => this.add(i));
    } else {
      this.list = [];
    }

    this.refresh();
  }

  onItemChange() {
    this.refresh();
  }

  ngOnInit() {}

  private refresh(): void {
    this.control.markAsTouched();
    this.control.markAsDirty();

    this.control.setValue(this.list
        .filter(i => i && i.value)
        .map(i => i.value)
    );

    if (
        !this.list.length
        || (this.list[this.list.length -1] && this.list[this.list.length -1].value)
    ) {
      this.add('');
    }

    this.cd.detectChanges();
  }

  private add(val: ''): void {
    this.list.push(this.fb.control(val));
  }

  removeItem(item: UntypedFormControl) {
    const index = this.list.indexOf(item);
    if (index > -1) {
      this.list.splice(index, 1);
    }
    this.refresh();
  }
}
