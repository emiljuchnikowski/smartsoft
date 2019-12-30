import {ElementRef, OnInit, Renderer2} from "@angular/core";

export abstract class PageBaseComponent implements OnInit {
    protected constructor(private el: ElementRef, private renderer: Renderer2) { }

    ngOnInit() {
        this.renderer.setStyle(this.el.nativeElement, 'height', '100%');
    }
}
