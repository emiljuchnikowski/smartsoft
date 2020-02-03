import {ChangeDetectionStrategy, Component, ElementRef, Renderer2} from '@angular/core';
import { Location } from '@angular/common';

import {PageBaseComponent} from "../base/base.component";

@Component({
  selector: 'smart-page-standard',
  templateUrl: './standard.component.html',
  styleUrls: ['./standard.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class PageStandardComponent extends PageBaseComponent {
  constructor(el: ElementRef, renderer: Renderer2, location: Location) {
    super(el, renderer, location);
  }
}
