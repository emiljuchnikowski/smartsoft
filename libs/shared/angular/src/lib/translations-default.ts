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
    MODEL: {
        firstName: string,
        lastName: string,
        password: string,
        username: string
    },
    INPUT: {
        ERRORS: {
            required: string
        }
    },
    ERRORS: {
        invalidUsernameOrPassword: string,
        other: string
    }
}

export const TRANSLATE_DATA_ENG: ITranslateData = {
    MODEL: {
        firstName: 'first name',
        lastName: 'last name',
        password: 'password',
        username: 'user name'
    },
    INPUT: {
        ERRORS: {
            required: 'field is required'
        }
    },
    ERRORS: {
        invalidUsernameOrPassword: 'Invalid username or password',
        other: 'Error'
    }
};

export const TRANSLATE_DATA_PL: ITranslateData = {
    MODEL: {
        firstName: 'imię',
        lastName: 'nazwisko',
        password: 'hasło',
        username: 'nazwa użytkownika'
    },
    INPUT: {
        ERRORS: {
            required: 'to pole jest wymagane'
        }
    },
    ERRORS: {
        invalidUsernameOrPassword: 'Niepoprawna nazwa użytkownika, lub hasło',
        other: 'Wystąpił błąd'
    }
};

