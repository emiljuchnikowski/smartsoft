import {Component, Input, OnInit} from '@angular/core';
import {memoize} from "lodash-decorators";
import * as moment from "moment";

import {IStreamComment} from "@smartsoft001/stream-shell-dtos";

@Component({
  selector: 'smart-stream-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.scss']
})
export class ChatComponent implements OnInit {
  @Input() comments: Array<IStreamComment> = [];

  constructor() { }

  @memoize
  getTitle(comment: IStreamComment): string {
    if (!comment) return '';
    return `${ comment.username } (${ moment(comment.createDate).format('YYYY-MM-DD HH:mm:ss') })`;
  }

  ngOnInit() {
  }
}
