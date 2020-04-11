import {Component, Input, OnInit, ViewContainerRef} from '@angular/core';

@Component({
  selector: 'smart-tab',
  templateUrl: './tab.component.html',
  styleUrls: ['./tab.component.scss']
})
export class TabComponent implements OnInit {
  show: boolean;

  @Input() title: string;

  constructor(public container: ViewContainerRef) { }

  ngOnInit() {
  }

}
