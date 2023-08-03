import { snackbar } from './snackbar';

export const messageHandling = (message:string, status:number) : (false | true) =>{

    if ([400, 500].includes(status)) {
        snackbar(message);
        return false;
    }else{
        snackbar(message);
        return true;
    }
}
