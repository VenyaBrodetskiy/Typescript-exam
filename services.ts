// Ideas:
// Build dynamically created classmates: collection of first names, collection of lastnames, randomly pick birth date

import { firstNames, Geography, lastNames, Mathematics, History, Hebrew } from "./constants";
import { Classroom, School, Student, Teacher } from "./entities";
import { getRandomBirthDate, getRandomValueFromArray } from "./helpers";

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
        professions: professions
    };
}

function createStudent(firstName: string, lastName: string, birthDate: Date): Student {
    return {
        firstName: firstName,
        lastName: lastName,
        birthDate: birthDate,
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

export function getClassYoungestStudent(classroom: Classroom): string {
    return classroom.students[0].firstName;
}

/**
 * Method prints all of the information about the school:
 * School data -> 
 * Class 1, Class 2 ...
 * @param school Please use result of initializeSchool()
 * 
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
        console.log(`Teacher: ${currentClass.teacher.firstName} ${currentClass.teacher.lastName}: ${currentClass.teacher.professions.join(', ')}`)

        // Students: create a forEach loop to print each student
        currentClass.students.forEach((student: Student, index: number) => {
            console.log(`${index + 1}: ${student.firstName} ${student.lastName}: ${student.age()} y.o.`);
        })

        indexOfClass++; // after printing is finished, need to add class
        console.log(''); // 

    }
}