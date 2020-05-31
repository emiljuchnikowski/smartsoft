import {Component, Input, OnInit} from '@angular/core';
import {Observable} from "rxjs";

import {IStream, IStreamComment} from "@smartsoft001/stream-shell-dtos";

import {StreamProvider} from "../../providers";

@Component({
  selector: 'smart-stream-client',
  templateUrl: './client.component.html',
  styleUrls: ['./client.component.scss']
})
export class ClientComponent implements OnInit {
  private _id: string;

  source = "http://techslides.com/demos/sample-videos/small.mp4";

  item$: Observable<IStream>

  @Input() set id(val: string) {
    this._id = val;
    this.item$ = this.provider.getById(this._id);
  }

  constructor(private provider: StreamProvider) { }

  addComment(item: IStreamComment): void {
    this.provider.addComment(this._id , item);
  }

  ngOnInit() {
    this.provider.init();
  }
}
