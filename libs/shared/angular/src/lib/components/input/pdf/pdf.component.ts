import {
    ChangeDetectionStrategy, ChangeDetectorRef,
    Component,
    OnInit, Renderer2,
} from '@angular/core';

import {InputFileBaseComponent} from "../base/file.component";
import {FileService} from "../../../services/file/file.service";

@Component({
    selector: "smart-input-pdf",
    templateUrl: "./pdf.component.html",
    styleUrls: ["./pdf.component.scss"],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class InputPdfComponent<T> extends InputFileBaseComponent<T> implements OnInit {
    constructor(cd: ChangeDetectorRef, renderer: Renderer2, fileService: FileService) {
        super(cd, renderer, fileService);
    }
}
