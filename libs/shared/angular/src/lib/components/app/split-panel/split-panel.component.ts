import { ChangeDetectionStrategy, ChangeDetectorRef, Component, OnInit, ViewEncapsulation } from '@angular/core';
import {Router} from "@angular/router";

import {AppBaseComponent} from "../base/base.component";

@Component({
  selector: 'smart-app-split-panel',
  templateUrl: './split-panel.component.html',
  styleUrls: ['./split-panel.component.scss'],
  //encapsulation: ViewEncapsulation.ShadowDom,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AppSplitPanelComponent extends AppBaseComponent implements OnInit {

  constructor(router: Router, cd: ChangeDetectorRef) {
    super(router, cd);
  }

  ngOnInit() {
  }
}
