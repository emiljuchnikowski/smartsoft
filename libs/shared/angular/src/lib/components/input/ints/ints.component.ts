import {ChangeDetectorRef, Component, OnInit} from '@angular/core';

import {InputBaseComponent} from "../base/base.component";
import {FormBuilder, FormControl} from "@angular/forms";

@Component({
  selector: 'smart-input-ints',
  templateUrl: './ints.component.html',
  styleUrls: ['./ints.component.scss'],
})
export class InputIntsComponent<T> extends InputBaseComponent<T> implements OnInit {
  list: Array<FormControl> = [];

  constructor(cd: ChangeDetectorRef, private fb: FormBuilder) {
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
        .map(i => Number(i.value))
    );

    if (
        !this.list.length
        || (this.list[this.list.length -1] && this.list[this.list.length -1].value)
    ) {
      this.add(0);
    }

    this.cd.detectChanges();
  }

  private add(val: number): void {
    this.list.push(this.fb.control(val));
  }

  removeItem(item: FormControl) {
    const index = this.list.indexOf(item);
    if (index > -1) {
      this.list.splice(index, 1);
    }
    this.refresh();
  }
}
