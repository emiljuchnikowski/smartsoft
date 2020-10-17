import {ChangeDetectorRef, Component, OnInit} from '@angular/core';

import {InputBaseComponent} from "../base/base.component";
import {FormBuilder, FormControl} from "@angular/forms";

@Component({
  selector: 'smart-input-strings',
  templateUrl: './strings.component.html',
  styleUrls: ['./strings.component.scss'],
})
export class InputStringsComponent<T> extends InputBaseComponent<T> implements OnInit {
  list: Array<FormControl> = [];

  constructor(cd: ChangeDetectorRef, private fb: FormBuilder) {
    super(cd);
  }

  afterSetOptionsHandler() {
    if (this.control.value) {
      this.control.value.forEach(i => this.add(i));
    }

    this.refresh();
  }

  onItemChange(data: string) {
    this.refresh();
    this.control.markAsTouched();
  }

  ngOnInit() {}

  private refresh(): void {
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
  }

  private add(val: ''): void {
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
