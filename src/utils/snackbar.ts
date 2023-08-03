import { enqueueSnackbar } from 'notistack';

import { messages } from './messages';

export const snackbar = (key:string): void =>{
    const  { message,variant } = messages[key];
    enqueueSnackbar(message, { variant: variant });
}