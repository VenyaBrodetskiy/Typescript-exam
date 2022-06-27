// =========================
// Here only last task №9.
// For tasks 1, 2, 3, 4, 5, 6, 7, 8 please check other folder: '../Ex 1-8 finished'
// =========================
import { getRandomValueFromArray } from './helpers';
import { Classroom, School } from './services'

// Ex.9 NOT REQUIRED (+++ BONUS)
// 	Refactor the resulting solution using the knowledge larned during the latest session:
// 	- module
// 	- interfaces
// 	- classes
// 	- constructors


// initialize school with default parameters
const school: School = new School(); 

// <Ex.1> Print school like in <Ex. 1>
//
//

console.log('<Ex. 1> Print school without sorting:')
school.printSchool(); 

console.log('___________________________________________________________________');


// ================================================================
// <Ex 2> Explain why History constant cannot be used in constants.ts
// <Explanation>: 
//      1. its commented, so TS doesn't see it at all
//      2. after removing comment, still will not work, as History is not exported from constants.ts and not imported in services.ts 

// <Ex 3> Provide a solution for #2.
// <done> Please check constants.ts

// <Ex 4> Add fullName() method to helpers.ts that receives firstName and lastName;
//	 <done> 4.1. Add fullName() method to Teacher and Student types that utilizes method added in #4.
//	 <done> 4.2. Refactor the code of printSchool() to use the relevant type fullName() method instead of referencing properties of firstName and lastName.
// ================================================================


// <Ex.5> Get Youngest student like in <Ex. 5>
console.log('\n<Ex. 5> Youngest Student:')
school.classes.forEach(classroom => 
    console.log(`Youngest student in ${classroom.name} class is: ${classroom.getYoungestStudent()}`));

console.log('___________________________________________________________________');
// ================================================================

// <Ex. 6> Sort school and print like in <Ex.6>
//	    1. Sorted ascending by a name of the class;
//      2. All students in a class should be sorted by lastName and then by firstName.

// create sorted copy of School, sort by Class name
let sortedSchool = School.sortByClassName(school);
// sort student by their lastName and firstName
sortedSchool = School.sortStudentsInClass(sortedSchool);

//print sorted copy of School
console.log('\n<Ex. 6> Sorted School:');
sortedSchool.printSchool();
console.log('___________________________________________________________________');
// ================================================================


// <Ex. 7> Add a method that tranfers a student by name from one class to another:
//	       - Due to class creation, I changed parameters for function transferStudentTo. Now it's similar to concat function
//	       - Verify that the transfer is made correctly by calling to printSchool() before and after the transfer.
console.log('\n<Ex. 7> Transfer student:');

// Names of students are generated randomly, so I need to pick up student name from existing array during runtime. 
// So let's also pick up student randomly from 1st class 
const studentFullName: string = getRandomValueFromArray(sortedSchool.classes[0].students).fullName;
// picking classroom
const fromClassroom: Classroom = sortedSchool.classes[0];
const toClassrom: Classroom = sortedSchool.classes[1];

console.log(`Transfering student "${studentFullName}" from Class ${fromClassroom.name} >> Class ${toClassrom.name}`)
console.log('School after transfer looks like:\n')
fromClassroom.transferStudentTo(studentFullName, toClassrom);

sortedSchool.printSchool(); // veryfy, that transfer made correctly
console.log('___________________________________________________________________');
// ================================================================


// <Ex. 8> Add a method to create a school dynamically:
//         - construction of each class is dynamicall
//         - each class can easily generate random object in case 0 parameters are passed
//         - please check it out
console.log('\n<Ex. 8> Create a school dynamically:');

const numOfClasses = 4; // change in order to check how dynamical initialization works
const maxStudents = 10; // change in order to check how dynamical initialization works

const bigSchool: School = new School(numOfClasses, maxStudents, 'Big School', 'Tel Aviv', '+972 3 222 22 22');

// sort and print to improve readability
let bigSchoolSorted = School.sortByClassName(bigSchool);
bigSchoolSorted = School.sortStudentsInClass(bigSchoolSorted);

bigSchoolSorted.printSchool();
