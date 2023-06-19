import { enqueueSnackbar } from 'notistack';

import { messages } from './messages';

export const Snackbar = async (res: Response): Promise<void> =>{
    const data = await res.json();
    const  { message,variant } = messages[data.message];
    enqueueSnackbar(message, { variant: variant });
}