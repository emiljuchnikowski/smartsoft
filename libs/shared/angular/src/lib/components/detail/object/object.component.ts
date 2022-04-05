import { ChangeDetectorRef, Component, Inject } from "@angular/core";
import { Observable, of } from "rxjs";
import { map } from "rxjs/operators";

import { IEntity } from "@smartsoft001/domain-core";

import { DetailBaseComponent } from "../base/base.component";
import { IDetailsOptions } from "../../../models/interfaces";
import { DETAILS_COMPONENT_TOKEN } from "../../../shared.inectors";

@Component({
  selector: "smart-detail-object",
  templateUrl: "./object.component.html",
  styleUrls: ["./object.component.scss"],
})
export class DetailObjectComponent<
  T,
  TChild extends IEntity<string>
> extends DetailBaseComponent<T> {
  childOptions$: Observable<IDetailsOptions<TChild>>;

  constructor(
    cd: ChangeDetectorRef,
    @Inject(DETAILS_COMPONENT_TOKEN) public detailsComponent: any
  ) {
    super(cd);
  }

  protected afterSetOptionsHandler() {
    super.afterSetOptionsHandler();

    this.childOptions$ = this.options.item$.pipe(
      map((item) => {
        if (!item) return;

        return {
          type: item[this.options.key].constructor as any,
          item$: of(item[this.options.key] as TChild),
        } as IDetailsOptions<TChild>;
      })
    );
  }
}
