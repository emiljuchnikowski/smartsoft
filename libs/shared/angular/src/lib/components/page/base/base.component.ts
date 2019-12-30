import {ElementRef, Input, OnInit, Renderer2} from "@angular/core";

export abstract class PageBaseComponent implements OnInit {
    @Input() title: string;
    @Input() hideHeader: boolean;

    protected constructor(private el: ElementRef, private renderer: Renderer2) { }

    ngOnInit() {
        this.renderer.setStyle(this.el.nativeElement, 'height', '100%');
    }
}
