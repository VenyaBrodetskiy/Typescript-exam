import { School } from "./entities";
import { getClassYoungestStudent as getClassYoungestStudentFullName, initializeSchool, printSchool } from "./services";

const school: School = initializeSchool();

// Ex 1. Enhance printSchool() method so it prints all of the information about the school in the following formats
printSchool(school);

// Ex 2. Explain why History constant cannot be used in constants.ts
// Explanation: 1. its commented, so TS doesn't see it at all
//              2. after removing comment, still will not work, as History is not exported. 
// Ex 3. Provide a solution for #2.
// Please check constants.ts

//console.log(getClassYoungestStudentFullName(school.classes[0]));