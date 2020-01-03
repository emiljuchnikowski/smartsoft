import {ChangeDetectionStrategy, Component, OnInit} from '@angular/core';

import {AppBaseComponent} from "../base/base.component";

@Component({
  selector: 'smart-app-split-panel',
  templateUrl: './split-panel.component.html',
  styleUrls: ['./split-panel.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AppSplitPanelComponent extends AppBaseComponent implements OnInit {

  constructor() {
    super();
  }

  ngOnInit() {
  }

}
