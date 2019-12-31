import {ChangeDetectionStrategy, Component, Input, OnInit} from '@angular/core';

import {InputOptions} from "../../models";

@Component({
  selector: 'smart-input',
  templateUrl: './input.component.html',
  styleUrls: ['./input.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class InputComponent<T> implements OnInit {

  @Input() options: InputOptions<T>;

  constructor() { }

  ngOnInit() {
  }

}
