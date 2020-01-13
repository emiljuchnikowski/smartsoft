import { Directive, HostListener, Input } from "@angular/core";

import { HardwareService, ModalService } from "../../services";

@Directive({
  selector: "[smartDetails]"
})
export class DetailsDirective {
  @Input("smartDetails")
  options: { component: any; params: any };

  constructor(
    private modalService: ModalService,
    private hardwareService: HardwareService
  ) {}

  @HostListener("click")
  async click(): Promise<void> {
    if (!this.options || !this.options.component) return;

    let modal = await this.modalService.show({
      component: this.options.component,
      props: this.options.params,
      mode: "bottom"
    });

    const handler = this.hardwareService.onBackButtonClick(async () => {
      if (modal) {
        await modal.dismiss();
      }
    });

    await modal.onDidDismiss();

    handler.remove();

    modal = null;
  }
}
