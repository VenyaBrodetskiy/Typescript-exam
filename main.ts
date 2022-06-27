import { School } from "./entities";
import { getClassYoungestStudent as getYoungestStudent, initializeSchool, printSchool, sortByClassName, sortStudentsInClass } from "./services";

const school: School = initializeSchool();

// Ex 1. Enhance printSchool() method so it prints all of the information about the school in the following formats
printSchool(school);

// ================================================================
// Ex 2. Explain why History constant cannot be used in constants.ts
// <Explanation>: 
//      1. its commented, so TS doesn't see it at all
//      2. after removing comment, still will not work, as History is not exported from constants.ts and not imported in services.ts 

// Ex 3. Provide a solution for #2.
// <done> Please check constants.ts

// Ex 4. Add fullName() method to helpers.ts that receives firstName and lastName;
//	 <done> 4.1. Add fullName() method to Teacher and Student types that utilizes method added in #4.
//	 <done> 4.2. Refactor the code of printSchool() to use the relevant type fullName() method instead of referencing properties of firstName and lastName.
// ================================================================

// Ex 5. Fix the logic for getClassYoungestStudent().
console.log(`Youngest student in ${school.classes[0].name} class is: ${getYoungestStudent(school.classes[0])}`);
console.log(`Youngest student in ${school.classes[1].name} class is: ${getYoungestStudent(school.classes[1])}`);


// Ex. 6 printSchool output should be:
//	    1. Sorted ascending by a name of the class;
//      2. All students in a class should be sorted by lastName and then by firstName.

// create sorted copy of School, sort by Class name
let sortedSchool = sortByClassName(school);
// sort student by their lastName and firstName
sortedSchool = sortStudentsInClass(sortedSchool);

//print sorted copy of School
printSchool(sortedSchool);