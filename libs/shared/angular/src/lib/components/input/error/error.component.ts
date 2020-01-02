import { ChangeDetectionStrategy, Component, Input } from "@angular/core";

@Component({
  selector: "smart-input-error",
  templateUrl: "./error.component.html",
  styleUrls: ["../../../styles/global.scss", "./error.component.scss"],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class InputErrorComponent {
  @Input() errors: any;
}
