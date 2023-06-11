export const month= (i:number) :string=>{
    const months: string[] = ['miesiąc', 'miesiące', 'miesięcy'];
    const month: string = i  + ' ' + months[2];
    if (i === 1) {
        return month.replace(months[2], months[0]);
    } else if(i>=12 && i<=16){
        return month;
    }else if ( i === 1 || i === 2 || i === 3 || i % 10 === 2 || i % 10 === 3 || i % 10 === 4) {
        return month.replace(months[2], months[1]);
    } else {
        return month;
    }
}