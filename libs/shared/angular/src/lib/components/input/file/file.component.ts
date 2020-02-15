import {ChangeDetectorRef, Component, OnInit} from '@angular/core';
import {InputBaseComponent} from "../base/base.component";

@Component({
  selector: 'smart-input-file',
  templateUrl: './file.component.html',
  styleUrls: ['./file.component.scss']
})
export class InputFileComponent<T> extends InputBaseComponent<T> implements OnInit {

  constructor(cd: ChangeDetectorRef) {
    super(cd);
  }

  changeListener($event) : void {
    const file = $event.target.files[0];
    console.log(file);
    this.control.setValue(file);
    this.control.updateValueAndValidity();
    this.cd.detectChanges();
  }

  ngOnInit() {}

}
