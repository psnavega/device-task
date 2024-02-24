export function dateToString(date: Date): string {
    const tempData = date.toLocaleString()
        .split(' ')[0];

    return handleDateToString(tempData);
}

function handleDateToString(tempData: string) {
    const teste = tempData.split('-');
    const year = teste[0];
    const month = teste[1];
    const day = teste[2].split('T')[0];
    const hours = teste[2].split('T')[1].split('.');
    const hour = hours[0].split(':')[0]
    const minutes = hours[0].split(':')[1]

    return `${day}/${month}/${year} ${hour}:${minutes}h`;
}