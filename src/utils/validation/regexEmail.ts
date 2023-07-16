
export const regexEmail = (data:string):boolean => {
    const regex = /^\S+@\S+\.\S+$/;
    return regex.test(data);
}