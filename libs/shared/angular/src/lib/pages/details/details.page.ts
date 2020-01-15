import {Component} from "@angular/core";
import { NavParams } from '@ionic/angular';

import { IPageOptions, IDetailsOptions } from '../../models';

@Component({
    templateUrl: './details.page.html',
    styleUrls: [
        './details.page.scss'
    ]
})
export class DetailsPage<T> {
    pageOptions: IPageOptions = {
        title: 'details',
        hideMenuButton: true
    };
    detailsOptions: IDetailsOptions<T>;

    constructor(navParams: NavParams) {
        this.detailsOptions = navParams.get('value') as IDetailsOptions<T>;
        this.initTitle();
    }

    private initTitle(): void {
        if (this.detailsOptions.title) {
            this.pageOptions.title = this.detailsOptions.title;
        }
    }
}
