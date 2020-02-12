import {
  AfterViewInit,
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Input,
  OnDestroy,
  Output,
  ViewChild
} from "@angular/core";
import { FormControl } from "@angular/forms";
import { Subscription } from "rxjs";
import {IonSearchbar} from "@ionic/angular";
import {debounceTime} from "rxjs/operators";

@Component({
  selector: "smart-searchbar",
  templateUrl: "./searchbar.component.html",
  styleUrls: ["./searchbar.component.scss"],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class SearchbarComponent implements OnDestroy, AfterViewInit {
  private _subscriptions = new Subscription();

  control: FormControl;
  show: boolean;

  @Input() set text(val: string) {
    this.control.setValue(val);
  }

  @Output() textChange = new EventEmitter<string>();

  @ViewChild("searchbar", { static: true, read: IonSearchbar }) searchEl: IonSearchbar;

  constructor() {
    this.control = new FormControl();
  }

  async setShow(): Promise<void> {
    this.show = true;
    await this.searchEl.setFocus();
  }

  tryHide(): void {
    if (!this.control.value)
      this.show = false;
  }

  ngAfterViewInit(): void {
    this._subscriptions.add(
        this.control.valueChanges.pipe(
            debounceTime(1000)
        ).subscribe(val => {
          this.textChange.emit(val);
        })
    );
  }

  ngOnDestroy() {
    if (this._subscriptions) {
      this._subscriptions.unsubscribe();
    }
  }
}
