import { Component, OnInit } from '@angular/core';
import RevolutCheckout from "@revolut/checkout";

@Component({
  selector: 'smartsoft-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  constructor() { }

  ngOnInit() {
    RevolutCheckout("adcf21f4-b02c-4c92-af8a-b82fb2b98acb").then((RC) => {
      console.log('REVOLUT-->', RC);

      RC.payWithPopup({
        // (optional) name of the customer
        name: "First Last",
        // (optional) email of the customer
        email: "customer@example.com",
        // (optional) phone of the customer
        phone: "+447950630319",
        onSuccess() {
          window.alert("Thank you!");
        },
        // Callback in case some error happened
        onError(message) {
          console.error(message)
          window.alert("Oh no :(");
        },
        // (optional) Callback in case user cancelled a transaction
        onCancel() {
          window.alert("Payment cancelled!");
        },
      });
    });
  }

}
