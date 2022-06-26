export function getRandomValueFromArray(array: string[]): string {
    return array[Math.floor(Math.random() * array.length)];
}

export function getRandomBirthDate(): Date {
    // for all random generators changed:
    // 1. '+' to '*'
    // 2. floor to ceil (to avoid 0 day of 0 month)
    const year: number = 2011 - (Math.floor(Math.random() * 3)); // students will be from 2009 till 2011 year
    const month: number = Math.ceil(Math.random() * 12);  
    const day: number = Math.ceil(Math.random() * 27);  // for simplicity, students will not be born from 29 to 31 day of month
    return new Date(year, month, day);
}