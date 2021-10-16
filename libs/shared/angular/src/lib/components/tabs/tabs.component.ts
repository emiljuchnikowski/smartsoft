import {
  AfterContentInit,
  Component,
  ContentChildren, EventEmitter,
  OnDestroy, Output,
  QueryList,
  ViewChild
} from "@angular/core";
import { Subscription } from "rxjs";
import { IonSegment } from "@ionic/angular";

import { TabComponent } from "./tab/tab.component";

@Component({
  selector: "smart-tabs",
  templateUrl: "./tabs.component.html",
  styleUrls: ["./tabs.component.scss"]
})
export class TabsComponent implements AfterContentInit, OnDestroy {
  private _subscriptions = new Subscription();

  tabs: Array<TabComponent>;

  @ViewChild("group", { read: IonSegment, static: true }) group: IonSegment;
  @ContentChildren(TabComponent, { read: TabComponent })
  tabComponents = new QueryList<TabComponent>();

  @Output() tabChange = new EventEmitter<TabComponent>();

  ngAfterContentInit(): void {
    this.setComponents();

    this._subscriptions.add(
      this.tabComponents.changes.subscribe(() => {
        this.setComponents();
      })
    );

    this.onSelectTab(this.tabs[0]);
    (this.group.value as any) = this.tabs[0];
  }

  onSelectTab(selected: TabComponent): void {
    this.tabs.forEach((tab) => {
      tab.show = tab === selected;
    });
    this.tabChange.emit(selected);
  }

  ngOnDestroy(): void {
    if (this._subscriptions) {
      this._subscriptions.unsubscribe();
    }
  }

  private setComponents(): void {
    this.tabs = this.tabComponents.toArray();
  }
}
