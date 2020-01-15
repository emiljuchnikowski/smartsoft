import { Component, OnInit } from '@angular/core';
import { map } from 'rxjs/operators';

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
      list$: this.facade.list$,
      loading$: this.facade.loaded$.pipe(map(l => !l))
    },
    detailsProvider: {
      getData: id => {
        this.facade.select(id);
      },
      clearData: () => {
        this.facade.unselect();
      },
      item$: this.facade.selected$,
      loading$: this.facade.loaded$.pipe(map(l => !l))
    },
    type: User,
    details: true
  };


  constructor(private facade: CrudFacade<User>) { }

  ngOnInit() {
    this.facade.read();
  }

}
