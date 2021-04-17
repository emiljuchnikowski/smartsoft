import {
    ChangeDetectionStrategy, ChangeDetectorRef,
    Component,
    OnInit, Renderer2,
} from '@angular/core';

import {InputFileBaseComponent} from "../base/file.component";
import {FileService} from "../../../services/file/file.service";

@Component({
    selector: "smart-input-attachment",
    templateUrl: "./attachment.component.html",
    styleUrls: ["./attachment.component.scss"],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class InputAttachmentComponent<T> extends InputFileBaseComponent<T> implements OnInit {
    constructor(cd: ChangeDetectorRef, renderer: Renderer2, fileService: FileService) {
        super(cd, renderer, fileService);
    }
}
