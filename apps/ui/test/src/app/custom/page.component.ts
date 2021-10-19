import {Component} from "@angular/core";
import {PageBaseComponent} from "@smartsoft001/angular";

@Component({
    template: `
        TEST PAGE START<br/><br/>

        <div #contentTpl></div>

        TEST PAGE END<br/><br/>
    `
})
export class CustomPageComponent extends PageBaseComponent  {

}