import {ChangeDetectionStrategy, Component, OnInit} from '@angular/core';

import {DetailsBaseComponent} from "../base/base.component";

@Component({
  selector: 'smart-details-standard',
  templateUrl: './standard.component.html',
  styleUrls: ['./standard.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class DetailsStandardComponent<T> extends DetailsBaseComponent<T> implements OnInit {

  ngOnInit() {
  }

}
