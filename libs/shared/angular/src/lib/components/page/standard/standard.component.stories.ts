import {IonicModule} from "@ionic/angular";

import {PageStandardComponent} from "./standard.component";

export default {
    title: 'PageStandardComponent'
}

export const primary = () => ({
    moduleMetadata: {
        imports: [
            IonicModule.forRoot()
        ]
    },
    component: PageStandardComponent,
    props: {

    }
});
