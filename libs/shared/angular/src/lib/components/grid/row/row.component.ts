import {Component, HostBinding, OnInit} from '@angular/core';

@Component({
  selector: 'smart-grid-row',
  templateUrl: './row.component.html',
  styleUrls: ['./row.component.scss']
})
export class GridRowComponent implements OnInit {
  @HostBinding('class.row') rowClassExist = true;

  constructor() { }

  ngOnInit() {
  }

}
