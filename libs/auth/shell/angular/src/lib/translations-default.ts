import {TranslateService} from "@ngx-translate/core";

export function setDefaultTranslationsAndLang(service: TranslateService) {
    const map = {
        'pl': TRANSLATE_DATA_PL,
        'eng': TRANSLATE_DATA_ENG
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
    FORM: {
        login: string
    }
}

export const TRANSLATE_DATA_ENG: ITranslateData = {
    FORM: {
        login: 'log in'
    }
};

export const TRANSLATE_DATA_PL: ITranslateData = {
    FORM: {
        login: 'zaloguj się'
    }
};

