import { Component } from "@angular/core";
import { Observable } from "rxjs";
import { map } from "rxjs/operators";

import { IAddress } from "@smartsoft001/domain-core";

import { DetailBaseComponent } from "../base/base.component";

@Component({
  selector: "smart-detail-address",
  templateUrl: "./address.component.html",
  styleUrls: ["./address.component.scss"],
})
export class DetailAddressComponent<T> extends DetailBaseComponent<T> {
  address$: Observable<IAddress>;

  protected afterSetOptionsHandler() {
    this.address$ = this.options.item$.pipe(
      map((item) => (this.options ? item[this.options.key] : null))
    );
  }
}
