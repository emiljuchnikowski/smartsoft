import {Component, Input, OnDestroy, OnInit} from '@angular/core';
import {Observable} from "rxjs";

import {IStream, IStreamComment} from "@smartsoft001/stream-shell-dtos";

import {StreamProvider} from "../../providers";

@Component({
  selector: 'smart-stream-client',
  templateUrl: './client.component.html',
  styleUrls: ['./client.component.scss']
})
export class ClientComponent implements OnInit, OnDestroy {
  private _id: string;

  source = "http://techslides.com/demos/sample-videos/small.mp4";

  item$: Observable<IStream>

  @Input() set id(val: string) {
    if (this._id) {
      this.provider.destroy(this._id, 'client');
    }

    this._id = val;
    this.item$ = this.provider.getById(this._id);

    this.provider.init(this._id, 'client');
  }

  constructor(private provider: StreamProvider) { }

  addComment(item: IStreamComment): void {
    this.provider.addComment(this._id , item);
  }

  ngOnInit() {

  }

  ngOnDestroy(): void {
    if (this._id) {
      this.provider.destroy(this._id, 'client');
    }
  }
}
