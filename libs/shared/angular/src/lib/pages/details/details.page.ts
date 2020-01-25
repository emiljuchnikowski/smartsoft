import { Component } from "@angular/core";
import { NavParams } from "@ionic/angular";
import { first } from "rxjs/operators";

import { IPageOptions, IDetailsOptions } from "../../models/interfaces";
import {IEntity} from "@smartsoft001/domain-core";
import {ModalService} from "../../services/modal/modal.service";

@Component({
  templateUrl: "./details.page.html",
  styleUrls: ["./details.page.scss"]
})
export class DetailsPage<T extends IEntity<string>> {
  pageOptions: IPageOptions = {
    title: "details",
    hideMenuButton: true
  };
  detailsOptions: IDetailsOptions<T>;

  constructor(navParams: NavParams, private modalService: ModalService) {
    this.detailsOptions = navParams.get("value") as IDetailsOptions<T>;
    this.initTitle();
    this.initButtons();
  }

  private initTitle(): void {
    if (this.detailsOptions.title) {
      this.pageOptions.title = this.detailsOptions.title;
    }
  }

  private initButtons(): void {
    const buttons = [];

    if (this.detailsOptions.editHandler) {
      buttons.push({
        handler: () => {
          this.detailsOptions.item$.pipe(first()).subscribe(item => {
            this.detailsOptions.editHandler(item.id);
            this.modalService.dismiss();
          });
        }, icon: 'create'
      });
    }

    this.pageOptions.endButtons = buttons;
  }
}
