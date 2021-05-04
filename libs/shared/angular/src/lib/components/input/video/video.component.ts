import {
    ChangeDetectionStrategy, ChangeDetectorRef,
    Component,
    OnInit, Renderer2,
} from '@angular/core';
import {TranslateService} from "@ngx-translate/core";

import {InputFileBaseComponent} from "../base/file.component";
import {FileService} from "../../../services/file/file.service";
import {delay, tap} from "rxjs/operators";
import {IButtonOptions} from "../../../models";
import {ToastService} from "../../../services/toast/toast.service";

@Component({
    selector: "smart-input-video",
    templateUrl: "./video.component.html",
    styleUrls: ["./video.component.scss"],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class InputVideoComponent<T> extends InputFileBaseComponent<T> implements OnInit {
    url: string;
    play: boolean;
    playButtonOptions: IButtonOptions = {
        click: () => {
            this.play = true;
        },
        loading$: this.loading$,
    };

    constructor(
        cd: ChangeDetectorRef,
        renderer: Renderer2,
        fileService: FileService,
        toastService: ToastService,
        translateService: TranslateService
    ) {
        super(cd, renderer, fileService, toastService, translateService);
    }

    protected afterSetOptionsHandler() {
        super.afterSetOptionsHandler();

        this.control.valueChanges.pipe(
            tap(() => {
                this.url = null;
                this.play = false;
                this.cd.detectChanges();
            }),
            delay(5000),
            this.takeUntilDestroy,
        ).subscribe(value => {
            if (!value?.id) return;

            this.url = this.fileService.getUrl(value.id);

            this.cd.detectChanges();
        })
    }
}