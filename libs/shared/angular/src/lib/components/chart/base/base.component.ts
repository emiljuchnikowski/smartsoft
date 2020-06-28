import { OnInit, Directive } from '@angular/core';

@Directive()
export abstract class ChartBaseComponent<T> implements OnInit {

  protected constructor() { }

  ngOnInit() {
  }

}
