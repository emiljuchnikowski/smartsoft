import {Component, Input, OnInit} from '@angular/core';
import {Observable} from "rxjs";

import {IStream} from "@smartsoft001/stream-shell-dtos";

import {StreamProvider} from "../../providers";

@Component({
  selector: 'smart-stream-client',
  templateUrl: './client.component.html',
  styleUrls: ['./client.component.scss']
})
export class ClientComponent implements OnInit {
  source = "http://techslides.com/demos/sample-videos/small.mp4";

  item$: Observable<IStream>

  @Input() set id(val: string) {
    this.item$ = this.provider.getById(val);
  }

  constructor(private provider: StreamProvider) { }

  ngOnInit() {
    this.provider.init();
  }
}
