import {Directive, DoCheck, ElementRef, HostBinding, ViewContainerRef} from "@angular/core";

@Directive({
    // tslint:disable-next-line:directive-selector
    selector: "[smartViewportShow]"
})
export class ViewportShowDirective {
    @HostBinding('attr.smart-visible') visible = true;

    constructor(private el: ElementRef) {
        setTimeout(() => {
            this.update();
        });
    }

    update(): void {
        this.visible = this.isInViewport();
    }

    private isInViewport(): boolean {
        const el = this.el.nativeElement;

        const rect = el.getBoundingClientRect();
        return (
            rect.top >= 0 &&
            rect.left >= 0 &&
            rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
            rect.right <= (window.innerWidth || document.documentElement.clientWidth)
        );
    }
}