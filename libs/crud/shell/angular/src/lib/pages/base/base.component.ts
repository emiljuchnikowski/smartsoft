import { AuthService, BaseComponent } from "@smartsoft001/angular";
import {Directive, OnInit} from "@angular/core";
import { getModelOptions } from "@smartsoft001/models";

import { CrudFullConfig } from "../../crud.config";

@Directive()
export abstract class PageBaseComponent<T> extends BaseComponent
  implements OnInit {
  protected constructor(
    protected authService: AuthService,
    public config: CrudFullConfig<T>
  ) {
    super();
  }

  async ngOnInit(): Promise<void> {
    this.checkPermissions(this.config);
  }

  private checkPermissions(val: CrudFullConfig<T>): void {
    const modelOptions = getModelOptions(val.type);

    if (
      val.add &&
      modelOptions.create &&
      modelOptions.create.permissions &&
      !this.authService.expectPermissions(modelOptions.create.permissions)
    ) {
      val.add = false;
    }

    if (
      val.edit &&
      modelOptions.update &&
      modelOptions.update.permissions &&
      !this.authService.expectPermissions(modelOptions.update.permissions)
    ) {
      val.edit = false;
    }

    if (
      val.remove &&
      modelOptions.remove &&
      modelOptions.remove.permissions &&
      !this.authService.expectPermissions(modelOptions.remove.permissions)
    ) {
      val.remove = false;
    }
  }
}
