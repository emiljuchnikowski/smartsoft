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
    details: string,
    admin: string,
    add: string,
    change: string,

    APP: {
        logout: string,
        logged: string
    };
    MODEL: {
        firstName: string,
        lastName: string,
        password: string,
        passwordConfirm: string,
        username: string,
        disabled: string,
        permissions: string,
        email: string,
        price: string,
        date: string,
    };
    INPUT: {
        ERRORS: {
            required: string,
            confirm: string
        }
    };
    ERRORS: {
        invalidUsernameOrPassword: string,
        other: string
    };
}

export const TRANSLATE_DATA_ENG: ITranslateData = {
    details: 'details',
    admin: 'admin',
    add: 'add',
    change: 'change',
    
    APP: {
        logout: 'log out',
        logged: 'logged'
    },
    MODEL: {
        firstName: 'first name',
        lastName: 'last name',
        password: 'password',
        passwordConfirm: 'confirm password',
        username: 'user name',
        disabled: 'disabled',
        permissions: 'permissions',
        email: 'email',
        price: 'price',
        date: 'date',
    },
    INPUT: {
        ERRORS: {
            required: 'field is required',
            confirm: 'bad confirmed'
        }
    },
    ERRORS: {
        invalidUsernameOrPassword: 'Invalid username or password',
        other: 'Error'
    }
};

export const TRANSLATE_DATA_PL: ITranslateData = {
    details: 'szczegóły',
    admin: 'administrator',
    add: 'dodaj',
    change: 'zmień',

    APP: {
        logout: 'wyloguj się',
        logged: 'zalogowany'
    },
    MODEL: {
        firstName: 'imię',
        lastName: 'nazwisko',
        password: 'hasło',
        passwordConfirm: 'powtórz hasło',
        username: 'nazwa użytkownika',
        disabled: 'nieaktywny',
        permissions: 'uprawnienia',
        email: 'email',
        price: 'cena',
        date: 'data',
    },
    INPUT: {
        ERRORS: {
            required: 'to pole jest wymagane',
            confirm: 'źle powtórzone'
        }
    },
    ERRORS: {
        invalidUsernameOrPassword: 'Niepoprawna nazwa użytkownika, lub hasło',
        other: 'Wystąpił błąd'
    }
};

