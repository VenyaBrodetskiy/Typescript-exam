/**
 * Takes array of smth and return random element of this array
 * @param array array of same objects of any type
 * @returns one of objects of input array
 */
export function getRandomValueFromArray<T>(array: T[]): T {
    // changed string input/output -> generic type in order to use not only for array of string, but also for array of objects
    return array[Math.floor(Math.random() * array.length)];
}

export function getRandomBirthDate(): Date {
    // for all random generators changed:
    // 1. '+' to '*'
    // 2. floor to ceil (to avoid 0 day of 0 month)
    const year: number = 2011 - (Math.floor(Math.random() * 3)); // students will be from 2009 till 2011 year
    const month: number = Math.floor(Math.random() * 12);  
    const day: number = Math.floor(Math.random() * 28);  // for simplicity, students will not be born from 29 to 31 day of month
    return new Date(year, month, day);
}

// Ex 4. Add fullName() method to helpers.ts that receives firstName and lastName;
// function which returns fullName of object, if this object has properties firstName and lastName
export function fullName(firstName: string, lastName: string): string {
    return firstName + ' ' + lastName;
}