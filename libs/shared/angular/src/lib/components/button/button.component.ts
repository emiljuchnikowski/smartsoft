import {ChangeDetectionStrategy, Component, Input, OnInit} from '@angular/core';

import {IButtonOptions} from "../../models";

@Component({
  selector: 'smart-button',
  templateUrl: './button.component.html',
  styleUrls: ['./button.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ButtonComponent implements OnInit {

  @Input() options: IButtonOptions;
  @Input() disabled: boolean;

  constructor() { }

  ngOnInit() {
  }

}
