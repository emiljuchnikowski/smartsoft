import {
  Directive,
  Input,
  OnInit,
  TemplateRef,
  ViewContainerRef
} from "@angular/core";

import { AuthService } from "../../services/auth/auth.service";

@Directive({
  selector: "[smartAuth]"
})
export class AuthDirective<T> implements OnInit {
  private _permissions: Array<string>;
  private _rendered = false;

  @Input("smartAuth") set permissions(val: Array<string>) {
    this._permissions = val;
    this.check();
  }

  constructor(
    private templateRef: TemplateRef<T>,
    private viewContainer: ViewContainerRef,
    private authService: AuthService
  ) {}

  ngOnInit(): void {
    this.check();
  }

  private check(): void {
    if (
      this.authService.isAuthenticated() &&
      (!this._permissions ||
        this.authService.expectPermissions(this._permissions))
    ) {
      if (!this._rendered)
        this.viewContainer.createEmbeddedView(this.templateRef);
      this._rendered = true;
    } else {
      this.viewContainer.clear();
      this._rendered = false;
    }
  }
}
