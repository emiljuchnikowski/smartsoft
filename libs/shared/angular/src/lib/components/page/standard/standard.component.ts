import {Component, ElementRef, Renderer2} from '@angular/core';

import {PageBaseComponent} from "../base/base.component";

@Component({
  selector: 'smart-page-standard',
  templateUrl: './standard.component.html',
  styleUrls: ['./standard.component.scss']
})
export class PageStandardComponent extends PageBaseComponent {
  constructor(el: ElementRef, renderer: Renderer2) {
    super(el, renderer);
  }
}
