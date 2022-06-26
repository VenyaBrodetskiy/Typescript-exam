import { School } from "./entities";
import { getClassYoungestStudent as getYoungestStudent, initializeSchool, printSchool } from "./services";

const school: School = initializeSchool();

// Ex 1. Enhance printSchool() method so it prints all of the information about the school in the following formats
printSchool(school);

// ================================================================
// Ex 2. Explain why History constant cannot be used in constants.ts
// <Explanation>: 
//      1. its commented, so TS doesn't see it at all
//      2. after removing comment, still will not work, as History is not exported. 

// Ex 3. Provide a solution for #2.
// <done> Please check constants.ts

// Ex 4. Add fullName() method to helpers.ts that receives firstName and lastName;
//	 <done> 4.1. Add fullName() method to Teacher and Student types that utilizes method added in #4.
//	 <done> 4.2. Refactor the code of printSchool() to use the relevant type fullName() method instead of referencing properties of firstName and lastName.
// ================================================================

// Ex 5. Fix the logic for getClassYoungestStudent().
console.log(`Youngest student in ${school.classes[0].name} class is: ${getYoungestStudent(school.classes[0])}`);
console.log(`Youngest student in ${school.classes[1].name} class is: ${getYoungestStudent(school.classes[1])}`);