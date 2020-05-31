import {ChangeDetectorRef, Component, ElementRef, Input, OnDestroy, OnInit, ViewChild} from '@angular/core';
import {Observable, Subscription} from "rxjs";

import {IStream, IStreamComment} from "@smartsoft001/stream-shell-dtos";

import {StreamProvider} from "../../providers";
import {map, tap} from "rxjs/operators";

@Component({
  selector: 'smart-stream-client',
  templateUrl: './client.component.html',
  styleUrls: ['./client.component.scss']
})
export class ClientComponent implements OnInit, OnDestroy {
  private _id: string;
  private _subscriptions = new Subscription();

  source$: Observable<string>;
  item$: Observable<IStream>

  @ViewChild("videoRef", { static: false }) videoRef: ElementRef;

  @Input() set id(val: string) {
    if (this._id) {
      this.provider.destroy(this._id, 'client');
    }

    this._id = val;
    this.item$ = this.provider.getById(this._id);

    this._subscriptions.add(
        this.provider.clientStream$.pipe(
            tap(source => {
              this.videoRef.nativeElement.srcObject = source;
              this.cd.detectChanges();
            })
        ).subscribe()
    );
    this.provider.init(this._id, 'client');
  }

  constructor(private provider: StreamProvider, private cd: ChangeDetectorRef) { }

  addComment(item: IStreamComment): void {
    this.provider.addComment(this._id , item);
  }

  ngOnInit() {

  }

  ngOnDestroy(): void {
    if (this._id) {
      this.provider.destroy(this._id, 'client');
    }

    if (this._subscriptions) {
      this._subscriptions.unsubscribe();
    }
  }
}
