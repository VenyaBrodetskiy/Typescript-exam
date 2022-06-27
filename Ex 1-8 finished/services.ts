// Ideas:
// Build dynamically created classmates: collection of first names, collection of lastnames, randomly pick birth date
import * as _ from 'lodash';
import { firstNames, Geography, lastNames, Mathematics, History, Hebrew, professions } from "./constants";
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
        name: "1st school",
        address: "Moscow",
        phone: "+7 (916) 000 12 21",
        classes: [
            mathClass,
            geographyClass
        ]
    }
}

/**
 * Dynamically creates school using below parameters:
 * @param numOfClasses how much classrooms will be created. by default = 3
 * @param maxStudentsInClass maximum students in 1 classroom. For each classroom N of students will be random up to maximum. by default = 10
 * @param maxProfessionsForTeacher maximum professions for each teacher. Will be random up to maximum. by default = 3
 */
export function initializeSchoolDynamically(numOfClasses: number = 3, maxStudentsInClass: number = 10, maxProfessionsForTeacher: number = 3): School {
    let classes: Classroom[] = [];

    // generate classrooms
    for (let indexOfClass = 0; indexOfClass < numOfClasses; indexOfClass++) {
        
        // generate professions for teacher
        const prof: string[] = []; // create empty array of profession
        const numberOfProfessions: number = Math.ceil(Math.random() * maxProfessionsForTeacher);

        for (let indexOfProfession = 0; indexOfProfession < numberOfProfessions; indexOfProfession++) {
            prof.push(getRandomValueFromArray(professions));
        }

        // generate teacher, using array of proffesion for this teacher
        const teacher: Teacher = createTeacher(
            getRandomValueFromArray(firstNames), 
            getRandomValueFromArray(lastNames), 
            prof);

        // generate name of classroom based on array of this teacher's professions
        const nameOfClass: string = getRandomValueFromArray(prof);
        
        // generate students for each classroom
        let students: Student[] = []; // create empty array of students
        const numberOfStudents: number = Math.ceil(Math.random() * maxStudentsInClass); // randomize N of students not more than Max Students in Class

        for (let indexOfStudents = 1; indexOfStudents <= numberOfStudents; indexOfStudents++) {
            // create new students randomly
            students.push(createStudent(
                getRandomValueFromArray(firstNames), 
                getRandomValueFromArray(lastNames), 
                getRandomBirthDate()));
        }

        // create Classroom based on generated above and add it to array of Classrooms
        classes.push(createClassroom(
            nameOfClass,
            teacher,
            students,
        ))

    }

    return {
        name: 'Big School',
        address: 'Tel Aviv',
        phone: '+7 (916) 000 12 21',
        classes: classes,
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
    console.log('');

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

        console.log(''); // just improve readibility
    }
}

/**
 * Method sorts School object by name of Classes
 * @param school recieves School
 * @returns new object, doesn't mutate input object
 */
export function sortByClassName(school: School): School {
    // make copy of school not to mutate original object
    const sortedSchool: School = _.cloneDeep(school);

    // sorting ascending by classroom name
    sortedSchool.classes.sort((class1, class2) => {
        if (class1.name < class2.name)
            return -1;
        if (class1.name > class2.name)
            return 1;
        return 0;
    });

    // Option 2. Sorting can be done by _lodash package
    // sortedSchool.classes = _.sortBy(sortedSchool.classes, 'name');
    //

    return sortedSchool;
}

/**
 * Methos sorts School Classes by lastName -> firstName
 * @param school recieves School
 * @returns new object, doesn't mutate input object
 */
export function sortStudentsInClass(school: School): School {
    // make copy of school not to mutate original object
    const sortedSchool: School = _.cloneDeep(school);

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

        // Option 2. Sorting can be done by _lodash package
        // currentClass.students = _.sortBy(currentClass.students, ['lastName', 'firstName']);
        //
    }

    return sortedSchool;
}

/**
 * Transfers student from Classroom1 to Classroom2
 * @param fullName of student
 * @param fromClassroom 
 * @param toClassroom 
 */
export function transferStudent(fullName: string, fromClassroom: Classroom, toClassroom: Classroom): void {

    //find Student and his index by fullName
    const student: Student = fromClassroom.students.filter(student => student.fullName === fullName)[0];
    const indexOfStudent: number = fromClassroom.students.indexOf(student)

    //transfer student from class to class
    // remove from original classroom
    fromClassroom.students.splice(indexOfStudent, 1);

    // add to new classroom
    toClassroom.students.push(student);

    // make sure receiving classroom remains sorted
    toClassroom.students = _.sortBy(toClassroom.students, ['lastName', 'firstName']);
}
