import { Component, OnInit } from '@angular/core';
import {Observable, of} from "rxjs";

import {IListOptions} from "@smartsoft001/angular";
import {User} from "./user.dto";

@Component({
  selector: 'smartsoft-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css']
})
export class UsersComponent implements OnInit {
  listOptions: IListOptions<User> = {
    provider: {
      getData(): Observable<{ data: User[]; totalCount: number; links: any }> {
        return of(null);
      }
    },
    type: User
  }


  constructor() { }

  ngOnInit() {
  }

}
