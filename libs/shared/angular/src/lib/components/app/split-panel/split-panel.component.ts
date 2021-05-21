import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  ElementRef, Inject,
  PLATFORM_ID,
  OnInit, ViewChild, AfterContentInit
} from "@angular/core";
import { Router } from "@angular/router";
import {DOCUMENT} from "@angular/common";

import { AppBaseComponent } from "../base/base.component";
import { StyleService } from "../../../services/style/style.service";
import {MenuService} from "../../../services/menu/menu.service";

@Component({
  selector: "smart-app-split-panel",
  templateUrl: "./split-panel.component.html",
  styleUrls: ["./split-panel.component.scss"],
  //encapsulation: ViewEncapsulation.ShadowDom,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AppSplitPanelComponent extends AppBaseComponent implements OnInit, AfterContentInit {
  @ViewChild('listRef', { read: ElementRef }) listRef: ElementRef;

  constructor(
    router: Router,
    cd: ChangeDetectorRef,
    elementRef: ElementRef,
    styleService: StyleService,
    menuService: MenuService,
    @Inject(PLATFORM_ID) readonly platform,
    @Inject(DOCUMENT) document: any
  ) {
    super(router, cd, elementRef, styleService, menuService, platform, document);
  }

  async ngAfterContentInit(): Promise<void> {
    await super.ngAfterContentInit();
    this.styleService.init(this.listRef);
  }

  ngOnInit() { }
}
