import {ChangeDetectorRef, Directive, ElementRef, OnInit, Renderer2, ViewChild} from "@angular/core";
import {BehaviorSubject, Observable} from "rxjs";
import {TranslateService} from "@ngx-translate/core";

import {InputBaseComponent} from "./base.component";
import {IButtonOptions} from "../../../models/interfaces";
import {FileService} from "../../../services/file/file.service";
import {ToastService} from "../../../services/toast/toast.service";

@Directive()
export abstract class InputFileBaseComponent<T> extends InputBaseComponent<T> implements OnInit {
    valid = true;
    oldId: number;
    file: File;

    loading$ = new BehaviorSubject(false);
    percent$: Observable<number>;

    addButtonOptions: IButtonOptions ={
        click: () => {
            this.control.markAsDirty();
            this.control.markAsTouched();
            (this.inputElementRef.nativeElement as HTMLInputElement).click();
        },
        loading$: this.loading$
    };
    showButtonOptions: IButtonOptions ={
        click: () => {
            this.fileService.download(this.control.value.id);
        },
        loading$: this.loading$
    };
    deleteButtonOptions: IButtonOptions ={
        click: () => {
            this.control.markAsDirty();
            this.control.markAsTouched();
            //this.fileService.delete(this.control.value.id);
            this.control.setValue(null);
            this.file = null;
        },
        loading$: this.loading$,
        confirm: true
    };

    @ViewChild('inputObj', { read: ElementRef }) inputElementRef: ElementRef;

    protected constructor(
        cd: ChangeDetectorRef,
        protected renderer: Renderer2,
        protected fileService: FileService,
        protected toastService: ToastService,
        protected translateService: TranslateService
    ) {
        super(cd);
    }

    protected afterSetOptionsHandler() {
        super.afterSetOptionsHandler();
    }

    ngOnInit(): void {
        this.renderer.listen(this.inputElementRef.nativeElement, 'change', () => {
            this.loading$.next(true);
            this.file = (this.inputElementRef.nativeElement as HTMLInputElement).files[0];

            (this.inputElementRef.nativeElement as HTMLInputElement).type = 'text';
            (this.inputElementRef.nativeElement as HTMLInputElement).type = 'file';

            if ((this.inputElementRef.nativeElement as HTMLInputElement).accept && this.file && this.file.name) {
                const acceptTypes = (this.inputElementRef.nativeElement as HTMLInputElement).accept
                    .split(',').map(type => type.replace('.', ''));

                const fileType = this.file.name.substr(this.file.name.lastIndexOf('.') + 1).toLowerCase();

                if (!acceptTypes.some(a => a === fileType)) {
                    this.toastService.error({
                        duration: 3000,
                        message: this.translateService.instant('INPUT.ERRORS.invalidFileType')
                            + ` (${(this.inputElementRef.nativeElement as HTMLInputElement).accept})`
                    }).then(() => {});
                    this.loading$.next(false);
                    return;
                }
            }

            this.percent$ = this.fileService.upload(this.file, (res: Object) => {
                this.control.setValue(res);
                this.loading$.next(false);
            });
        });
    }
}