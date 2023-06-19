import { enqueueSnackbar } from 'notistack';

import { messages } from './messages';

export const Snackbar = async (key:string): Promise<void> =>{
    const  { message,variant } = messages[key];
    enqueueSnackbar(message, { variant: variant });
}