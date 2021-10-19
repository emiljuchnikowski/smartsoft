import {
  ChangeDetectionStrategy,
  Component,
  Input,
  ViewEncapsulation
} from '@angular/core';

import {IButtonOptions} from "../../models/interfaces";
import {ButtonBaseComponent} from "./base/base.component";
import {CreateDynamicComponent} from "../base";

@Component({
  selector: 'smart-button',
  template: `
    <smart-button-standard *ngIf="template === 'default'" [options]="options" [disabled]="disabled">
      <ng-container [ngTemplateOutlet]="contentTpl"></ng-container>
    </smart-button-standard>
    <ng-template #contentTpl>
      <ng-content></ng-content>
    </ng-template>
    <div #customTpl></div>
  `,
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ButtonComponent extends CreateDynamicComponent<ButtonBaseComponent>("button") {
  private _options: IButtonOptions;
  private _disabled: boolean;

  template: "custom" | "default";

  @Input() set options(val: IButtonOptions) {
    this._options = val;
    this.refreshDynamicInstance();
  }
  get options(): IButtonOptions { return this._options; }

  @Input() set disabled(val: boolean) {
    this._disabled = val;
    this.refreshDynamicInstance();
  }
  get disabled(): boolean { return this._disabled; }

  refreshProperties(): void {
    this.baseInstance.options = this.options;
    this.baseInstance.disabled = this.disabled;
  }
}
