
type Messages = {
    [key: string]: {
        message: string;
        variant: 'default' | 'error' | 'success' | 'warning' | 'info' | undefined;
    };
}

export const messages: Messages = {
    statusChangeFailed : { message: 'Nie udało się wykonać zmiany statusu', variant: 'error' },
    employ: { message: 'Kursant został zatrudniony', variant: 'success' },
    reserve: { message: 'Kursant został zarezerwowany', variant: 'success' },
    disinterest: { message: 'Zgłoszono brak zainteresowania kursantem', variant: 'success' },
    bookedUp: { message: 'Student został już zarezerwowany', variant: 'warning' },
}