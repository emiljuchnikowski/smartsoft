import {ChangeDetectorRef, Component} from '@angular/core';

import {IEntity} from "@smartsoft001/domain-core";

import {DetailBaseComponent} from "../base/base.component";
import {FileService} from "../../../services/file/file.service";

@Component({
    selector: 'smart-detail-video',
    templateUrl: './video.component.html',
    styleUrls: ['./video.component.scss']
})
export class DetailVideoComponent<T extends IEntity<string>> extends DetailBaseComponent<T> {
    constructor(cd: ChangeDetectorRef, private fileService: FileService) {
        super(cd);
    }

    getUrl(item: { id: string }): string {
        return this.fileService.getUrl(item.id);
    }
}
