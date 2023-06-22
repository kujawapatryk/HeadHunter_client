
type Messages = {
    [key: string]: {
        message: string;
        variant: 'default' | 'error' | 'success' | 'warning' | 'info' | undefined;
    };
}

export const messages: Messages = {
    statusChangeFailed : { message: 'Nie udało się wykonać zmiany statusu.', variant: 'error' },
    employ: { message: 'Kursant został zatrudniony.', variant: 'success' },
    reserve: { message: 'Kursant został zarezerwowany.', variant: 'success' },
    disinterest: { message: 'Zgłoszono brak zainteresowania kursantem.', variant: 'success' },
    bookedUp: { message: 'Student został już zarezerwowany.', variant: 'warning' },
    tryLater: { message: 'Coś poszło nie tak. Spróbuj później.', variant: 'error' },
    userAddFailed: { message: 'Dodanie użytkownika zakończone niepowodzeniem.', variant: 'error' },
    invalidEmail: { message: 'Podany został nie prawidłowy adres e-mail.', variant: 'error' },
    userHRAdded: { message: 'Użytkownik HR został dodany.', variant: 'success' },
    nameRequired: { message: 'Imie i nzawisko jest wymagane.', variant: 'warning' },
    organizationNameRequired: { message: 'Nazwa organizacji musi być podana.', variant: 'warning' },
    hrLimit: { message: 'Podaj liczbę między 1-999.', variant: 'warning' },
    emailRequired: { message: 'Adres e-mail jest wymagany.', variant: 'warning' },
    passwordInsecure: { message: 'Hasło nie spełnia wymagań bezpieczeństwa.', variant: 'warning' },
    emailExists: { message: 'Taki e-mail już istnieje w systemie.', variant: 'warning' },
    mismatchedPasswords: { message: 'Hasła nie są identyczne.', variant: 'warning' },
    invalidPasswordFormat: { message: 'Hasło musi mieć co najmniej 8 znaków, składać się z dużych i małych liter, cyfr i znaków specjalnych.', variant: 'warning' },
    unAuthorized: { message: 'Brak dostępu', variant: 'error' },
}