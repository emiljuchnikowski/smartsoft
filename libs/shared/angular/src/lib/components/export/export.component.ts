import {ChangeDetectionStrategy, Component, Input} from "@angular/core";
import {NavParams, PopoverController} from "@ionic/angular";

@Component({
    selector: "smart-export",
    templateUrl: "./export.component.html",
    styleUrls: ["./export.component.scss"],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class ExportComponent {
    @Input() value: any;
    @Input() fileName: string;

    constructor() { }

    async onClick(): Promise<void> {
        this.download(this.value, (this.fileName ? this.fileName : 'data') + '.json','application/json');
    }

    private download(text, name, type): void {
        const file = new Blob([text], {type: type});
        // @ts-ignore
        const isIE = /*@cc_on!@*/false || !!document.documentMode;
        if (isIE) {
            window.navigator.msSaveOrOpenBlob(file, name);
        } else {
            const a = document.createElement('a');
            a.href = URL.createObjectURL(file);
            a.download = name;
            a.click();
        }
    }
}
