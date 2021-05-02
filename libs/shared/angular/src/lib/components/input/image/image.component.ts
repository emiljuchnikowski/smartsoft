import {
    ChangeDetectionStrategy, ChangeDetectorRef,
    Component,
    OnInit, Renderer2,
} from '@angular/core';
import {debounceTime} from "rxjs/operators";

import {InputFileBaseComponent} from "../base/file.component";
import {FileService} from "../../../services/file/file.service";

@Component({
    selector: "smart-input-image",
    templateUrl: "./image.component.html",
    styleUrls: ["./image.component.scss"],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class InputImageComponent<T> extends InputFileBaseComponent<T> implements OnInit {
    imageUrl: any;

    constructor(cd: ChangeDetectorRef, renderer: Renderer2, fileService: FileService) {
        super(cd, renderer, fileService);
    }

    ngOnInit() {
        super.ngOnInit();

        this.control.valueChanges.pipe(
            debounceTime(1000),
            this.takeUntilDestroy
        ).subscribe(() => this.initImage());

        this.initImage();
    }

    private initImage(): void {
        this.imageUrl = this.control.value ? this.fileService.getUrl(this.control.value.id) : null;
        this.cd.detectChanges();
    }
}
