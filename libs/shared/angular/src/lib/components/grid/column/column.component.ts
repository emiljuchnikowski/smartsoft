import {Component, HostBinding, OnInit} from '@angular/core';

@Component({
  selector: 'smart-grid-column',
  templateUrl: './column.component.html',
  styleUrls: ['./column.component.scss']
})
export class GridColumnComponent implements OnInit {
  @HostBinding('class.col') colClassExist = true;

  constructor() { }

  ngOnInit() {
  }

}
