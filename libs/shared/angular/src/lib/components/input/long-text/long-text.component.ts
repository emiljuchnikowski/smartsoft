import { ChangeDetectorRef, Component, OnInit, OnDestroy } from "@angular/core";
import { Editor, Toolbar } from "ngx-editor";
import { TranslateService } from "@ngx-translate/core";

import { InputBaseComponent } from "../base/base.component";
import { HardwareService } from "../../../services/hardware/hardware.service";

@Component({
  selector: "smart-input-long-text",
  templateUrl: "./long-text.component.html",
  styleUrls: ["./long-text.component.scss"],
})
export class InputLongTextComponent<T>
  extends InputBaseComponent<T>
  implements OnInit, OnDestroy {
  editor: Editor;
  toolbar: Toolbar =
    this.hardwareService.isMobile || this.hardwareService.isMobileWeb
      ? [
          ["bold", "italic"],
          ["text_color", "background_color"],
          ["align_left", "align_center", "align_right", "align_justify"],
        ]
      : [
          // default value
          ["bold", "italic"],
          ["underline", "strike"],
          ["code", "blockquote"],
          ["ordered_list", "bullet_list"],
          [{ heading: ["h1", "h2", "h3", "h4", "h5", "h6"] }],
          ["link", "image"],
          ["text_color", "background_color"],
          ["align_left", "align_center", "align_right", "align_justify"],
        ];
  placeholder: string;

  constructor(
    cd: ChangeDetectorRef,
    private translateService: TranslateService,
    private hardwareService: HardwareService
  ) {
    super(cd);
  }

  ngOnInit() {
    this.placeholder = this.translateService.instant("writeHere") + "...";
    this.editor = new Editor({
      history: true,
      inputRules: true,
    });

    this.control.valueChanges.pipe(
        this.takeUntilDestroy
    ).subscribe(val => {
      if (!val || val.indexOf('<p>') !== 0) return;

      const div=document.createElement("div");
      div.innerHTML=val;

      const item = div.querySelectorAll("p").item(0);

      this.control.setValue(item.innerHTML);
    })
  }

  ngOnDestroy(): void {
    super.ngOnDestroy();
    this.editor.destroy();
  }
}
