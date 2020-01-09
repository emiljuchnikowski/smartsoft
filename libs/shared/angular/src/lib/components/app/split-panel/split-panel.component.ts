import {ChangeDetectionStrategy, ChangeDetectorRef, Component, OnInit} from '@angular/core';

import {AppBaseComponent} from "../base/base.component";
import {Router} from "@angular/router";

@Component({
  selector: 'smart-app-split-panel',
  templateUrl: './split-panel.component.html',
  styleUrls: ['./split-panel.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AppSplitPanelComponent extends AppBaseComponent implements OnInit {

  constructor(router: Router, cd: ChangeDetectorRef) {
    super(router, cd);
  }

  ngOnInit() {
  }
}
