import {Pipe, PipeTransform} from "@angular/core";

import {FileService} from "../../services/file/file.service";

@Pipe({
    name: 'smartFileUrl'
})
export class FileUrlPipe implements PipeTransform {
    constructor(private service: FileService) {
    }

    transform(file: { id }): string {
        return this.service.getUrl(file.id);
    }
}