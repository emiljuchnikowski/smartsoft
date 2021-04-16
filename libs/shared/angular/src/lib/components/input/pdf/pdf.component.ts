import {
    ChangeDetectionStrategy,
    ChangeDetectorRef,
    Component,
    ElementRef,
    OnInit,
    Renderer2,
    ViewChild
} from '@angular/core';

import {InputBaseComponent} from "../base/base.component";
import {IButtonOptions} from "../../../models";
import {FileService} from "../../../services";
import {BehaviorSubject, Observable} from "rxjs";

@Component({
    selector: "smart-input-pdf",
    templateUrl: "./pdf.component.html",
    styleUrls: ["./pdf.component.scss"],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class InputPdfComponent<T> extends InputBaseComponent<T> implements OnInit {
    valid = true;
    oldId: number;
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
            this.fileService.delete(this.control.value.id);
            this.control.setValue(null);
        },
        loading$: this.loading$,
        confirm: true
    };

    @ViewChild('inputPdf', { read: ElementRef }) inputElementRef: ElementRef;

    constructor(cd: ChangeDetectorRef, private renderer: Renderer2, private fileService: FileService) {
        super(cd);
    }

    protected afterSetOptionsHandler() {
        super.afterSetOptionsHandler();
    }

    ngOnInit(): void {
        this.renderer.listen(this.inputElementRef.nativeElement, 'change', () => {
            this.loading$.next(true);
            const file = (this.inputElementRef.nativeElement as HTMLInputElement).files[0];

            (this.inputElementRef.nativeElement as HTMLInputElement).type = 'text';
            (this.inputElementRef.nativeElement as HTMLInputElement).type = 'file';

            this.percent$ = this.fileService.upload(file, res => {
                this.control.setValue(res);
                this.loading$.next(false);
            });
        });
    }
}
