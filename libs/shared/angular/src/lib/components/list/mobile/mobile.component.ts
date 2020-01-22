import { Component, OnInit } from '@angular/core';
import {Router} from "@angular/router";

import {ListBaseComponent} from "../base/base.component";
import {IEntity} from "@smartsoft001/domain-core";

@Component({
  selector: 'smart-list-mobile',
  templateUrl: './mobile.component.html',
  styleUrls: ['./mobile.component.scss']
})
export class ListMobileComponent<T extends IEntity<string>> extends ListBaseComponent<T> implements OnInit {
  constructor(router: Router) {
    super(router);
  }

  ngOnInit() {
  }
}
