import {ChangeDetectorRef, Component, OnInit, ViewChild} from '@angular/core';

import {InputBaseComponent} from "../base/base.component";
import {FormControl} from "@angular/forms";

@Component({
  selector: 'smart-input-logo',
  templateUrl: './logo.component.html',
  styleUrls: ['./logo.component.scss'],
})
export class InputLogoComponent<T> extends InputBaseComponent<T> implements OnInit {
  constructor(cd: ChangeDetectorRef) {
    super(cd);
  }

  set(inputFile: HTMLInputElement) {
    inputFile.click();

    inputFile.onchange = () => {
      if (!inputFile.files[0]) {
        inputFile.onchange = null;
        inputFile.files = null;
        return;
      }

      const reader = new FileReader();

      reader.onload = ((theFile) => {
        return (e) => {
          const binaryData = e.target.result;
          const base64String = window.btoa(binaryData);

          this.control.setValue('data:image/jpeg;base64, ' + base64String);
          this.control.markAsTouched();

          this.cd.detectChanges();
        };
      })(inputFile);

      reader.readAsBinaryString(inputFile.files[0]);
      inputFile.onchange = null;
      inputFile.files = null;
    }
  }

  clear() {
    this.control.setValue(null);
    this.control.markAsTouched();
  }

  ngOnInit() {}
}
