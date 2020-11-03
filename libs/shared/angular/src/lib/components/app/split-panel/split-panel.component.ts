import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  ElementRef, Inject,
  PLATFORM_ID,
  OnInit
} from "@angular/core";
import { Router } from "@angular/router";
import {DOCUMENT} from "@angular/common";

import { AppBaseComponent } from "../base/base.component";
import { StyleService } from "../../../services/style/style.service";

@Component({
  selector: "smart-app-split-panel",
  templateUrl: "./split-panel.component.html",
  styleUrls: ["./split-panel.component.scss"],
  //encapsulation: ViewEncapsulation.ShadowDom,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AppSplitPanelComponent extends AppBaseComponent implements OnInit {
  constructor(
    router: Router,
    cd: ChangeDetectorRef,
    elementRef: ElementRef,
    styleService: StyleService,
    @Inject(PLATFORM_ID) readonly platform,
    @Inject(DOCUMENT) document: any
  ) {
    super(router, cd, elementRef, styleService, platform, document);
  }

  ngOnInit() {}
}
