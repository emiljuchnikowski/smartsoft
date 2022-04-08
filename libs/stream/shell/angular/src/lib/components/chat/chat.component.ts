import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {Memoize} from "lodash-decorators";
// @ts-ignore
import moment from "moment";

import {IStreamComment, StreamComment} from "@smartsoft001/stream-shell-dtos";
import {IButtonOptions, IFormOptions} from "@smartsoft001/angular";

@Component({
  selector: 'smart-stream-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.scss']
})
export class ChatComponent implements OnInit {
  buttonOptions: IButtonOptions = {
    click: () => {
      if (!this.validForm) return;

      this.invokeSubmit.emit(this.item);

      const value = new StreamComment();
      value.username = this.item.username;

      this.newItem = value;
      this.initForm();
    }
  };
  formOptions: IFormOptions<StreamComment>;
  item: StreamComment;
  newItem: StreamComment;
  validForm: boolean;

  @Input() comments: Array<IStreamComment> = [];
  @Output() invokeSubmit = new EventEmitter();

  constructor() { }

  @Memoize
  getTitle(comment: IStreamComment): string {
    if (!comment) return '';
    return `${ comment.username } (${ moment(comment.createDate).format('YYYY-MM-DD HH:mm:ss') })`;
  }

  onChangeValid($event: boolean) {
    this.validForm = $event;
  }

  ngOnInit() {
    this.newItem = new StreamComment();
    this.initForm();
  }

  private initForm() {
    this.formOptions = {model: this.newItem, mode: 'create'};
    setTimeout(() => {
      this.validForm = false;
    });
  }
}
