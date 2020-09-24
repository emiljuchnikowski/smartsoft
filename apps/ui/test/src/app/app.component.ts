import {Component, ElementRef, OnInit} from "@angular/core";
import {of} from "rxjs";
import {TranslateService} from "@ngx-translate/core";
import {map} from "rxjs/operators";

import {IAppOptions, IMenuItem, IStyle} from "@smartsoft001/angular";
import {AuthFacade} from "@smartsoft001/auth-shell-angular";
import { variables } from "../theme/variables";

const MENU_ITEMS: Array<IMenuItem> = [
  {
    caption: 'Users',
    icon: 'person-outline',
    route: '/users'
  },
  {
    caption: 'Zadania',
    icon: 'list-outline',
    route: '/todos'
  },
  {
    caption: 'Transakcje',
    icon: 'cash-outline',
    route: '/trans'
  }
];

@Component({
  selector: "smartsoft-root",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.scss"]
})
export class AppComponent implements OnInit {
  appOptions: IAppOptions = {
    provider: {
      logged$: this.authFacade.token$.pipe(map(token => !!token)),
      username$: this.authFacade.username$,
      logout: () => this.authFacade.logout()
    },
    menu: {
      items$: of(MENU_ITEMS)
    },
    style: variables
  };

  constructor(translateService: TranslateService, private authFacade: AuthFacade) {
    //translateService.use('eng');
  }

  ngOnInit(): void {

  }
}
