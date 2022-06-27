import { Classroom, School } from "./entities";
import { getRandomValueFromArray } from "./helpers";
import { getClassYoungestStudent as getYoungestStudent, initializeSchool, initializeSchoolDynamically, printSchool, sortByClassName, sortStudentsInClass, transferStudent } from "./services";

const school: School = initializeSchool();

// Ex 1. Enhance printSchool() method so it prints all of the information about the school in the following formats
printSchool(school);
console.log('___________________________________________________________________');


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
console.log('\nEx. 5 Youngest Student:')
console.log(`Youngest student in ${school.classes[0].name} class is: ${getYoungestStudent(school.classes[0])}`);
console.log(`Youngest student in ${school.classes[1].name} class is: ${getYoungestStudent(school.classes[1])}`);
console.log('___________________________________________________________________');
// ================================================================


// Ex. 6 printSchool output should be:
//	    1. Sorted ascending by a name of the class;
//      2. All students in a class should be sorted by lastName and then by firstName.

// create sorted copy of School, sort by Class name
let sortedSchool = sortByClassName(school);
// sort student by their lastName and firstName
sortedSchool = sortStudentsInClass(sortedSchool);

//print sorted copy of School
console.log('\nEx. 6 Sorted School:');
printSchool(sortedSchool);
console.log('___________________________________________________________________');
// ================================================================


// Ex. 7 Add a method that tranfers a student by name from one class to another:
//	    Prototype: services.transferStudent(fullName: string, fromClassroom: Classroom, toClassrom: Classroom): void
//	    Verify that the transfer is made correctly by calling to printSchool() before and after the transfer.
console.log('\nEx. 7 Transfer student:');

// Names of students are generated randomly, so I need to pick up student name from existing array during runtime. 
// So let's also pick up student randomly from 1st class 
const studentFullName: string = getRandomValueFromArray(sortedSchool.classes[0].students).fullName;

// picking classroom
const fromClassroom: Classroom = sortedSchool.classes[0];
const toClassrom: Classroom = sortedSchool.classes[1];

console.log(`Transfering student "${studentFullName}" from Class ${fromClassroom.name} >> Class ${toClassrom.name}`)
console.log('School after transfer looks like:\n')
transferStudent(studentFullName, fromClassroom, toClassrom);

printSchool(sortedSchool); // veryfy, that transfer made correctly
console.log('___________________________________________________________________');
// ================================================================


// Ex. 8 Add a method to create a school dynamically:
// 	    Number of classes;
// 	    Generation of a teacher for each class;
// 	    Random number of students in each class up to some limit (i.e. no more than 30 students in a class)
// 	    Verify output by solution added in #1

console.log('\nEx. 8 Create a school dynamically:');

const numOfClasses = 4; // change in order to check how dynamical initialization works
const maxStudents = 10; // change in order to check how dynamical initialization works

const bigSchool: School = initializeSchoolDynamically(numOfClasses, maxStudents); // create school with new method
// const bigSchool: School = initializeSchoolDynamically(); // such function call also possible, as initializeSchoolDynamically has default parameters

let bigSchoolSorted = sortStudentsInClass(sortByClassName(bigSchool)); // sort to improve readability
printSchool(bigSchoolSorted); //print school