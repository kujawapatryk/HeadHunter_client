import { Snackbar } from './snackbar';

export const ValidationError = async (res:Response):Promise <undefined | true> =>{
    
    if ([400, 500].includes(res.status)) {
        await Snackbar(res);
        return true;
    }
}