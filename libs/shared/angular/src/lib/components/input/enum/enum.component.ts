import {ChangeDetectorRef, Component, OnInit} from '@angular/core';

import {InputBaseComponent} from "../base/base.component";

@Component({
  selector: 'smart-input-enum',
  templateUrl: './enum.component.html',
  styleUrls: ['./enum.component.scss']
})
export class InputEnumComponent<T> extends InputBaseComponent<T> implements OnInit {
  value: Array<string>;

  constructor(cd: ChangeDetectorRef) {
    super(cd);
  }

  protected afterSetOptionsHandler(): void {
    super.afterSetOptionsHandler();

    this.value = this.control.value ? [ ...this.control.value ]: [];
  }

  checked(item: string): boolean {
    if (!this.value) return false;
    return this.value.some(i => i === item);
  }

  change(item: string): void {
    const add = !this.checked(item);

    if (!this.value)
      this.value = [];

    if (add) {
      this.value.push(item);
    } else {
      this.value = this.value.filter(i => i !== item);
    }

    this.control.markAsDirty();
    this.control.setValue(this.value);

    this.cd.detectChanges();
  }

  ngOnInit() {
  }
}
