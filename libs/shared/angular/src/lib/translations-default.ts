import {TranslateService} from "@ngx-translate/core";

export function setDefaultTranslationsAndLang(service: TranslateService) {
    const map = {
        'pl': TRANSLATE_DATA_PL,
        'eng': TRANSLATE_DATA_ENG
    };

    Object.keys(map).forEach(key => {
       service.setTranslation(key, map[key]);
    });

    if (!service.currentLang) {
        const lang = service.getBrowserLang();
        service.use(lang);
    }
}

export interface ITranslateData {
    MODEL: {
        firstName: string,
        lastName: string,
        password: string
    },
    INPUT: {
        ERRORS: {
            required: string
        }
    }
}

export const TRANSLATE_DATA_ENG: ITranslateData = {
    MODEL: {
        firstName: 'first name',
        lastName: 'last name',
        password: 'password'
    },
    INPUT: {
        ERRORS: {
            required: 'field is required'
        }
    }
};

export const TRANSLATE_DATA_PL: ITranslateData = {
    MODEL: {
        firstName: 'imię',
        lastName: 'nazwisko',
        password: 'hasło'
    },
    INPUT: {
        ERRORS: {
            required: 'to pole jest wymagane'
        }
    }
};

