import {TranslateService} from "@ngx-translate/core";

export function setTranslationsAndLang(service: TranslateService) {
    const map = {
        pl: TRANSLATE_DATA_PL
    };

    Object.keys(map).forEach(key => {
        service.setTranslation(key, map[key], true);
    });

    if (!service.currentLang) {
        const lang = service.getBrowserLang();
        service.use(lang);
    }
}

export interface ITranslateData {
    MODEL: {
        //..
    },
    //..
}

export const TRANSLATE_DATA_PL: ITranslateData = {
    MODEL: {
        //..
    },
    //..
}