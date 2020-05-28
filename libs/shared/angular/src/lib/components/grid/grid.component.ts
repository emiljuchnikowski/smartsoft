import {Component, HostBinding, OnInit, ViewEncapsulation} from '@angular/core';

@Component({
  selector: 'smart-grid',
  templateUrl: './grid.component.html',
  styleUrls: ['./grid.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class GridComponent implements OnInit {
  @HostBinding('class.grid') gridClassExist = true;

  constructor() { }

  ngOnInit() {
  }
}
