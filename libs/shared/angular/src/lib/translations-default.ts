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
    search: string,
    page: string,

    OBJECT: {
        deleted: string
    },
    APP: {
        logout: string,
        logged: string
    };
    MODEL: {
        body: string
        buildingNumber: string,
        city: string,
        date: string,
        disabled: string,
        email: string,
        file: string,
        firstName: string,
        flatNumber:string,
        lastName: string,
        password: string,
        passwordConfirm: string,
        passwordReset: string,
        permissions: string,
        price: string,
        send: string,
        street: string,
        username: string,
        zipCode: string,
    };
    INPUT: {
        ERRORS: {
            required: string,
            invalidNip: string,
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
    search: 'search',
    page: 'page',    

    OBJECT: {
        deleted: 'object deleted'
    },
    APP: {
        logout: 'log out',
        logged: 'logged'
    },
    MODEL: {
        body: 'body',
        buildingNumber: 'building number',
        city: 'city',
        date: 'date',
        disabled: 'disabled',
        email: 'email',
        file: 'file',
        firstName: 'first name',
        flatNumber: 'flat number',
        lastName: 'last name',
        password: 'password',
        passwordConfirm: 'confirm password',
        passwordReset: 'reset password',
        permissions: 'permissions',
        price: 'price',
        send: 'send',
        street: 'street',
        username: 'user name',
        zipCode: 'zip code',
    },
    INPUT: {
        ERRORS: {
            required: 'field is required',
            invalidNip: 'Invalid nip format',
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
    search: 'wyszukaj',
    page: 'strona',

    OBJECT: {
        deleted: 'obiekt został usunięty'
    },
    APP: {
        logout: 'wyloguj się',
        logged: 'zalogowany'
    },
    MODEL: {
        body: 'treść',
        buildingNumber: 'numer budynku',
        city: 'miasto',
        date: 'data',
        disabled: 'nieaktywny',
        email: 'email',
        file: 'plik',
        firstName: 'imię',
        flatNumber: 'numer lokalu',
        lastName: 'nazwisko',
        password: 'hasło',
        passwordConfirm: 'powtórz hasło',
        passwordReset: 'Nie pamiętam hasła',
        permissions: 'uprawnienia',
        price: 'cena',
        send: 'wyślij',
        street: 'ulica',
        username: 'nazwa użytkownika',
        zipCode: 'kod pocztowy',
    },
    INPUT: {
        ERRORS: {
            required: 'to pole jest wymagane',
            invalidNip: 'niepoprawny format nip',
            confirm: 'źle powtórzone'
        }
    },
    ERRORS: {
        invalidUsernameOrPassword: 'Niepoprawna nazwa użytkownika, lub hasło',
        other: 'Wystąpił błąd'
    }
};

