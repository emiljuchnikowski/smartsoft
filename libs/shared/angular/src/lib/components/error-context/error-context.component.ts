import {Component, OnDestroy, OnInit} from "@angular/core";

import {BaseComponent} from "../base/base.component";
import {ToastService} from "../../services/toast/toast.service";

@Component({
  selector: "smart-error-context",
  templateUrl: "./error-context.component.html",
  styleUrls: ["./error-context.component.scss"],
})
export class ErrorContextComponent extends BaseComponent implements OnDestroy, OnInit {
  constructor(private toastService: ToastService) {
    super();
  }

  ngOnInit() {
      this.toastService.addLockError();
  }

    ngOnDestroy() {
      this.toastService.removeLockError();
      super.ngOnDestroy();
  }
}
