import { Component, OnInit } from '@angular/core';
import RevolutCheckout from "@revolut/checkout";

import {MenuService} from "@smartsoft001/angular";

@Component({
  template: 'test menu content <button (click)="menuService.closeEnd()">X</button>'
})
export class TestMenuComponent {
  constructor(public menuService: MenuService) { }
}

@Component({
  selector: 'smartsoft-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  constructor(private readonly menuService: MenuService) { }

  ngOnInit() {
    // RevolutCheckout("50f5e610-c133-49df-8bec-bb87b471e32d", "sandbox").then((RC) => {
    //   console.log('REVOLUT-->', RC);
    //
    //   RC.payWithPopup({
    //     // (optional) name of the customer
    //     name: "First Last",
    //     // (optional) email of the customer
    //     email: "customer@example.com",
    //     // (optional) phone of the customer
    //     phone: "+447950630319",
    //     onSuccess() {
    //       window.alert("Thank you!");
    //     },
    //     // Callback in case some error happened
    //     onError(message) {
    //       console.error(message)
    //       window.alert("Oh no :(");
    //     },
    //     // (optional) Callback in case user cancelled a transaction
    //     onCancel() {
    //       window.alert("Payment cancelled!");
    //     },
    //   });
    // });
  }

  async onOpenMenu(): Promise<void> {
    await this.menuService.openEnd({
      component: TestMenuComponent
    })
  }
}
