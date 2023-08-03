export const month= (i:number) :string=>{
    const months: string[] = ['miesiąc', 'miesiące', 'miesięcy'];

    if (i === 1) {
        return i  + ' ' + months[0];
    } else if(i>=12 && i<=16){
        return i  + ' ' + months[2];
    }else if ( i === 1 || i === 2 || i === 3 || i % 10 === 2 || i % 10 === 3 || i % 10 === 4) {
        return i  + ' ' + months[1];
    } else {
        return i  + ' ' + months[2];
    }
}