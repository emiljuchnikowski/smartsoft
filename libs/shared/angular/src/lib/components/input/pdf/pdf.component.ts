import {
    ChangeDetectionStrategy, ChangeDetectorRef,
    Component,
    OnInit, Renderer2,
} from '@angular/core';
import {TranslateService} from "@ngx-translate/core";

import {InputFileBaseComponent} from "../base/file.component";
import {FileService} from "../../../services/file/file.service";
import {ToastService} from "../../../services/toast/toast.service";

@Component({
    selector: "smart-input-pdf",
    templateUrl: "./pdf.component.html",
    styleUrls: ["./pdf.component.scss"],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class InputPdfComponent<T> extends InputFileBaseComponent<T> implements OnInit {
    constructor(
        cd: ChangeDetectorRef,
        renderer: Renderer2,
        fileService: FileService,
        toastService: ToastService,
        translateService: TranslateService
    ) {
        super(cd, renderer, fileService, toastService, translateService);
    }
}
