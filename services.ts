// Ideas:
// Build dynamically created classmates: collection of first names, collection of lastnames, randomly pick birth date

import { firstNames, Geography, lastNames, Mathematics, History, Hebrew } from "./constants";
import { Classroom, School, Student, Teacher } from "./entities";
import { getRandomBirthDate, getRandomValueFromArray, fullName } from "./helpers";

export function initializeSchool(): School {
    const student1: Student = createStudent(getRandomValueFromArray(firstNames), getRandomValueFromArray(lastNames), getRandomBirthDate());
    const student2: Student = createStudent(getRandomValueFromArray(firstNames), getRandomValueFromArray(lastNames), getRandomBirthDate());
    const student3: Student = createStudent(getRandomValueFromArray(firstNames), getRandomValueFromArray(lastNames), getRandomBirthDate());
    const student4: Student = createStudent(getRandomValueFromArray(firstNames), getRandomValueFromArray(lastNames), getRandomBirthDate());

    const teacher1: Teacher = createTeacher(getRandomValueFromArray(firstNames), getRandomValueFromArray(lastNames), [Mathematics, Hebrew]);

    const student5: Student = createStudent(getRandomValueFromArray(firstNames), getRandomValueFromArray(lastNames), getRandomBirthDate());
    const student6: Student = createStudent(getRandomValueFromArray(firstNames), getRandomValueFromArray(lastNames), getRandomBirthDate());
    const student7: Student = createStudent(getRandomValueFromArray(firstNames), getRandomValueFromArray(lastNames), getRandomBirthDate());
    const student8: Student = createStudent(getRandomValueFromArray(firstNames), getRandomValueFromArray(lastNames), getRandomBirthDate());

    const teacher2: Teacher = createTeacher(getRandomValueFromArray(firstNames), getRandomValueFromArray(lastNames), [Geography, History]);

    const mathClass: Classroom = createClassroom("Math", teacher1, [student1, student2, student3, student4]);
    const geographyClass: Classroom = createClassroom("Geography", teacher2, [student5, student6, student7, student8]);

    return {
        name: "Big school",
        address: "Moscow",
        phone: "+7 (916) 000 12 21",
        classes: [
            mathClass,
            geographyClass
        ]
    }
}

function createTeacher(firstName: string, lastName: string, professions: string[]): Teacher {
    return {
        firstName: firstName,
        lastName: lastName,
        professions: professions,
        // 4.1. Add fullName() method to Teacher and Student types that utilizes method added in #4.
        fullName : fullName(firstName, lastName), // added
    };
}

function createStudent(firstName: string, lastName: string, birthDate: Date): Student {
    return {
        firstName: firstName,
        lastName: lastName,
        birthDate: birthDate,
        // 4.1. Add fullName() method to Teacher and Student types that utilizes method added in #4.
        fullName : fullName(firstName, lastName), // added
        age: () => { 
            const ageDiffInMs: number = Date.now() - birthDate.getTime(); // millisecond from birth
            const ageDiffInYears: number = new Date(ageDiffInMs).getFullYear(); // milliseconds convert to years 
            return ageDiffInYears - 1970; // offset 1970 as Date() uses 1970 year as starting point
        }
    };
}

function createClassroom(name: string, teacher: Teacher, students: Student[]): Classroom {
    return {
        name: name,
        teacher: teacher, 
        students: students
    };
}

/**
 * Method finds youngest student
 * @param classroom of type Classroom
 * @returns Full Name of youngest student in classroom
 */
export function getClassYoungestStudent(classroom: Classroom): string {
    
    // use reduce in order to find minimum
    const youngestStudent = classroom.students.reduce((student1,student2) => {
        // compare students by time in ms from 1970 year
        // less ms means student was born earlier, which means he is older than 2nd one
        if (student1.birthDate.getTime() < student2.birthDate.getTime()) {
            return student2;
        } else return student1;
    })

    return youngestStudent.fullName;
}

/**
 * Method prints all of the information about the school:
 * School data -> Class 1, Class 2 ...
 * @param school Please use result of initializeSchool()
 */
export function printSchool(school: School): void {

    // prints out School basic info
    console.log("School data:");
    console.log("============");
    console.log(`Name: ${school.name}`);
    console.log(`Address: ${school.address}`);
    console.log(`Phone: ${school.phone}`);
    console.log('\n');

    //prints out Classes 
    console.log("Classes:");
    console.log("============");

    // iterate through classes
    let indexOfClass: number = 1;
    for (const currentClass of school.classes) {
        
        // printing class N and name
        console.log(`Class ${indexOfClass}: ${currentClass.name}`); // indexOfClass counts from 0, so need to add +1

        // Teacher
        console.log(`Teacher: ${currentClass.teacher.fullName}: ${currentClass.teacher.professions.join(', ')}`);  // 4.2. Refactor the code of printSchool() to using fullName()  

        // Students: create a forEach loop to print each student
        currentClass.students.forEach((student: Student, index: number) => {
            console.log(`${index + 1}: ${student.fullName}: ${student.age()} y.o.`); // 4.2. Refactor the code of printSchool() to using fullName()  
        })

        indexOfClass++; // after printing is finished, need to add class
        console.log(''); // 

    }
}

/**
 * Sorts School object by name of Classes
 * @param school recieves School
 * @returns new object, doesn't mutate input object
 */
export function sortByClassName(school: School): School {
    // make copy of school not to mutate original object
    const sortedSchool: School = { ...school };

    // sorting ascending by classroom name
    sortedSchool.classes.sort((class1, class2) => {
        if (class1.name < class2.name)
            return -1;
        if (class1.name > class2.name)
            return 1;
        return 0;
    });

    // Option 2. Sorting can be done by _underscore package
    //
    //

    return sortedSchool;
}

/**
 * Sorts School Classes by lastName -> firstName
 * @param school recieves School
 * @returns new object, doesn't mutate input object
 */
export function sortStudentsInClass(school: School): School {
    // make copy of school not to mutate original object
    const sortedSchool: School = { ...school };

    // we should iterate each classroom and perform same sorting for each of classroom
    for (const currentClass of sortedSchool.classes) {
        
        // sorting lastName -> firstName
        // (this should be faster way, compared to sorting 2 times, as each current class is iterated only once, not 2 times)
        currentClass.students.sort((student1, student2) => {
            if (student1.lastName < student2.lastName) return -1;
            if (student1.lastName > student2.lastName) return 1;
            if (student1.lastName === student2.lastName && student1.firstName < student2.firstName) return -1;
            if (student1.lastName === student2.lastName && student1.firstName > student2.firstName) return 1;
            return 0;
        })

        // Option 2. Sorting can be done by _underscore package
        //
        //
    }
    
    return sortedSchool;
}
