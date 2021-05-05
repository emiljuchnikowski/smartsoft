import {Component, Input, OnInit, Output, EventEmitter} from '@angular/core';

@Component({
  selector: 'smart-accordion',
  templateUrl: './accordion.component.html',
  styleUrls: ['./accordion.component.scss']
})
export class AccordionComponent implements OnInit {
  private _show: boolean;

  @Input() set show(val: boolean) {
    this._show = val;
    this.showChange.emit(this._show);
  }
  get show(): boolean {
    return this._show;
  }

  @Output() showChange = new EventEmitter();

  constructor() { }

  ngOnInit() {
  }

}
