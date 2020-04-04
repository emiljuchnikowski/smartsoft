import {Component, Input, OnInit} from '@angular/core';

@Component({
  selector: 'smart-accordion',
  templateUrl: './accordion.component.html',
  styleUrls: ['./accordion.component.scss']
})
export class AccordionComponent implements OnInit {
  @Input() show: boolean;

  constructor() { }

  ngOnInit() {
  }

}
