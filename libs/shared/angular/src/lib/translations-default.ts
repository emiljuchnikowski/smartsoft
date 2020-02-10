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
    confirm: string,
    cancel: string,
    delete: string,
    undo: string,

    OBJECT: {
        deleted: string
    },
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
        file: string
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
    confirm: 'confirm',
    cancel: 'cancel',
    delete: 'delete',
    undo: 'undo',

    OBJECT: {
        deleted: 'object deleted'
    },
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
        file: 'file'
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
    confirm: 'potwierdź',
    cancel: 'anuluj',
    delete: 'usuń',
    undo: 'cofnij',

    OBJECT: {
        deleted: 'obiekt został usunięty'
    },
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
        file: 'plik'
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

