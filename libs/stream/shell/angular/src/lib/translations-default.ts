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
    comments: string;
    description: string;
}

export const TRANSLATE_DATA_ENG: ITranslateData = {
    comments: 'comments',
    description: 'description'
};

export const TRANSLATE_DATA_PL: ITranslateData = {
    comments: 'komentarze',
    description: 'opis'
};

