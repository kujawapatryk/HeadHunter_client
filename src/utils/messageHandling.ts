import { Snackbar } from './snackbar';

export const messageHandling = async (message:string, status:number ):Promise <false | true> =>{

    if ([400, 500].includes(status)) {
        await Snackbar(message);
        return false;
    }else{
        await Snackbar(message);
        return true;
    }
}

// const data = await res.json();
// if ([400, 500].includes(res.status)) {
//     await Snackbar(data.message);
//     return false;
// }else{
//     await Snackbar(data.message);
//     return true;
// }