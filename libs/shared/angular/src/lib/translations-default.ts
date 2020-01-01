import {TranslateService} from "@ngx-translate/core";

export function setDefaultTranslations(service: TranslateService) {
    const map = {
        'pl': TRANSLATE_DATA_PL,
        'eng': TRANSLATE_DATA_ENG
    };

    Object.keys(map).forEach(key => {
       service.setTranslation(key, map[key]);
    });
}

export interface ITranslateData {
    MODEL: {
        firstName: string,
        lastName: string
    }
}

export const TRANSLATE_DATA_ENG: ITranslateData = {
    MODEL: {
        firstName: 'first name',
        lastName: 'last name'
    }
};

export const TRANSLATE_DATA_PL: ITranslateData = {
    MODEL: {
        firstName: 'imię',
        lastName: 'nazwisko'
    }
};

