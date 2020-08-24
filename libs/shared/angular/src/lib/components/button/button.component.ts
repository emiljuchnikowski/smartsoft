import {ChangeDetectionStrategy, Component, Input, OnInit, ViewEncapsulation} from '@angular/core';

import {IButtonOptions} from "../../models/interfaces";

@Component({
  selector: 'smart-button',
  templateUrl: './button.component.html',
  styleUrls: ['./button.component.scss'],
  //encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ButtonComponent implements OnInit {

  mode: 'default' | 'confirm';

  @Input() options: IButtonOptions;
  @Input() disabled: boolean;

  constructor() { }

  ngOnInit() {
  }

  invoke(): void {
    if (!this.options) return;

    if (this.options.confirm) {
      this.mode = 'confirm';
    } else {
      this.options.click();
    }
  }

  confirmInvoke(): void {
    if (!this.options) return;
    this.options.click();
    this.mode = 'default';
  }

  confirmCancel(): void {
    if (!this.options) return;
    this.mode = 'default';
  }
}
