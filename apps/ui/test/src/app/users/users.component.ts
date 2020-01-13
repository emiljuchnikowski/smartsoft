import { Component, OnInit } from '@angular/core';

import {IListOptions} from "@smartsoft001/angular";
import {User} from "./user.dto";
import {CrudFacade} from "@smartsoft001/crud-shell-angular";

@Component({
  selector: 'smartsoft-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css']
})
export class UsersComponent implements OnInit {
  listOptions: IListOptions<User> = {
    provider: {
      getData(): void {
        this.facade.read();
      },
      list$: this.facade.list$
    },
    type: User,
    details: true
  }


  constructor(private facade: CrudFacade<User>) { }

  ngOnInit() {
    this.facade.read();
  }

}
