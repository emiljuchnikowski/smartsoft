import { Component, OnInit } from '@angular/core';
import {ListBaseComponent} from "../base/base.component";

@Component({
  selector: 'smart-list-mobile',
  templateUrl: './mobile.component.html',
  styleUrls: ['./mobile.component.scss']
})
export class ListMobileComponent<T> extends ListBaseComponent<T> implements OnInit {
  ngOnInit() {
  }
}
