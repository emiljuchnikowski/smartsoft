import { Component } from "@angular/core";
import {of} from "rxjs";
import {TranslateService} from "@ngx-translate/core";

import {IAppOptions, IMenuItem} from "@smartsoft001/angular";
import {AuthFacade} from "@smartsoft001/auth-shell-angular";
import {map} from "rxjs/operators";

const MENU_ITEMS: Array<IMenuItem> = [
  {
    caption: 'Users',
    icon: 'person',
    route: '/users'
  },
  {
    caption: 'Zadania',
    route: '/todos'
  },
  {
    caption: 'Transakcje',
    route: '/trans'
  }
];

@Component({
  selector: "smartsoft-root",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.scss"]
})
export class AppComponent {
  appOptions: IAppOptions = {
    provider: {
      logged$: this.authFacade.token$.pipe(map(token => !!token)),
      username$: this.authFacade.username$,
      logout: () => this.authFacade.logout()
    },
    menu: {
      items$: of(MENU_ITEMS)
    }
  };

  constructor(translateService: TranslateService, private authFacade: AuthFacade) {
    //translateService.use('eng');
  }
}
