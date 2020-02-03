import {Component, Input, OnInit} from '@angular/core';

import {ICardOptions} from "../../models";

@Component({
  selector: 'smart-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.scss']
})
export class CardComponent implements OnInit {

  @Input() options: ICardOptions;

  constructor() { }

  ngOnInit() {
  }

}
