import {ChangeDetectionStrategy, Component, EventEmitter, Input, Output} from "@angular/core";

@Component({
    selector: "smart-paging",
    templateUrl: "./paging.component.html",
    styleUrls: ["./paging.component.scss"],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PagingComponent {
    @Input() page: number;
    @Input() totalPages: number;

    @Output() nextPage = new EventEmitter();
    @Output() prevPage = new EventEmitter();
}