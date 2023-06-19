import { Snackbar } from './snackbar';

export const messageHandling = async (res:Response):Promise <false | undefined> =>{
    const data = await res.json();
    if ([400, 500].includes(res.status)) {
        await Snackbar(data.message);
        return false
    }else{
        await Snackbar(data.message);
    }
}