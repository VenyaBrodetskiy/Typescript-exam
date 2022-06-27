import * as _ from 'lodash';
import { firstNames, lastNames, professions } from "./constants";
import { IClassroom, ISchool, IStudent, ITeacher } from "./entities";
import { fullName, getRandomBirthDate, getRandomValueFromArray } from "./helpers";

export class Student implements IStudent {
    firstName: string;
    lastName: string;
    birthDate: Date;
    fullName: string;
    age: () => {};

    /**
     * Creates student. If any if parameters is not specified, creates random value for it
     */
    constructor(firstName?: string, lastName?: string, birthDate?: Date) {
        
        // checking if defined for each property
        if (typeof firstName !== 'undefined') {
            this.firstName = firstName;
        } else {
            this.firstName = getRandomValueFromArray(firstNames);
        }

        if (typeof lastName !== 'undefined') {
            this.lastName = lastName;
        } else {
            this.lastName = getRandomValueFromArray(lastNames);
        }

        if (typeof birthDate !== 'undefined') {
            this.birthDate = birthDate;
        } else {
            this.birthDate = getRandomBirthDate();
        }

        this.fullName = fullName(this.firstName, this.lastName);

        this.age = () => {
            const ageDiffInMs: number = Date.now() - this.birthDate.getTime(); // millisecond from birth
            const ageDiffInYears: number = new Date(ageDiffInMs).getFullYear(); // milliseconds convert to years 
            return ageDiffInYears - 1970; // offset 1970 as Date() uses 1970 year as starting point
        }
    }
}


// ==============================================================================================


export class Teacher implements ITeacher {
    firstName: string;
    lastName: string;
    professions: string[];
    maxProfessions: number;
    fullName: string;
    private static _defaultMaxProf = 2;

    /**
     * Creates teacher. If any of parameters is not specified, creates random value for it
     * @param firstName use only if you wish to create object manually
     * @param lastName use only if you wish to create object manually
     * @param professions use only if you wish to create object manually
     * @param maxProfessions use only if you wish to create object manually. Takes default value from Teacher._defaultMaxProf
     */
    constructor(firstName?: string, lastName?: string, professions?: string[], 
                maxProfessions: number = Teacher._defaultMaxProf) {
        // checking if defined for each property
        if (typeof firstName !== 'undefined') {
            this.firstName = firstName;
        } else {
            this.firstName = getRandomValueFromArray(firstNames);
        }

        if (typeof lastName !== 'undefined') {
            this.lastName = lastName;
        } else {
            this.lastName = getRandomValueFromArray(lastNames);
        }

        if (typeof maxProfessions !== 'undefined') {
            this.maxProfessions = maxProfessions;
        } else {
            this.maxProfessions = Teacher._defaultMaxProf;
        }

        this.fullName = fullName(this.firstName, this.lastName);

        // if professions unkown, generate randomly (if maxProfession unknow, use default params)
        if (typeof professions === 'undefined') {
            this.professions = Teacher.createRandomProfessions(this.maxProfessions);
        }  else {
            this.professions = professions;
        }
    }


    /**
     * Method creates array of professions, generated randomly
     * @param maxProfessions N of profession also random, this parameter shows maximum professions
     * @return array of professions
     */
    public static createRandomProfessions(maxProfessions: number): string[] {
        
        const prof: string[] = []; // create empty array of profession
        const numberOfProfessions: number = Math.ceil(Math.random() * maxProfessions); // randomize N of proff

        for (let indexOfProfession = 0; indexOfProfession < numberOfProfessions; indexOfProfession++) {
            prof.push(getRandomValueFromArray(professions));
        }

        return prof;
    }

}


// ==============================================================================================


export class Classroom implements IClassroom {
    name: string;
    teacher: Teacher;
    students: Student[];
    private static _defaultMaxStudents = 10;
    /**
     * Creates Classroom. If any of parameters is not specified, creates random value for it
     * @param maxNumOfStudents maximum students in 1 classroom. For each classroom N of students will be random up to maximum. default value takes from _defaultMaxStudents = 10
     * @param name use only if you wish to create object manually
     * @param teacher use only if you wish to create object manually
     * @param students use only if you wish to create object manually
     */
    constructor(maxNumOfStudents: number = Classroom._defaultMaxStudents, name?: string, teacher?: Teacher, students?: Student[]) {
        
        // checking if params defined for each property
        if (typeof teacher !== 'undefined') {
            this.teacher = teacher;
        } else {
            // creates new random teacher
            this.teacher = new Teacher(); // Teacher without any params generates random teacher
        }

        if (typeof name !== 'undefined') {
            this.name = name;
        } else {
            // take one of teacher's professions
            this.name = getRandomValueFromArray(this.teacher.professions);
        }

        if (typeof students !== 'undefined') {
            this.students = students;
        } else {
            // generate array of random students
            this.students = [];
            for (let indexOfStudent = 1; indexOfStudent <= maxNumOfStudents; indexOfStudent++) {
                this.students.push(new Student()); // Student without any params generates random student
            }
        }
    }


    /**
     * Method finds youngest student
     * @returns Full Name of youngest student in classroom
     */
    getYoungestStudent(): string {
        // use reduce in order to find minimum
        const youngestStudent = this.students.reduce((student1,student2) => {
            // compare students by time in ms from 1970 year
            // less ms means student was born earlier, which means he is older than 2nd one
            if (student1.birthDate.getTime() < student2.birthDate.getTime()) {
                return student2;
            } else return student1;
        })

        return youngestStudent.fullName;
    }

    
    /**
     * Transfers student from current classroom object to Classroom2
     * @param fullName of student
     * @param toClassroom 
     */
    transferStudentTo(fullName: string, toClassroom: IClassroom): void {
        //find Student and his index by fullName
        const student: Student = this.students.filter(student => student.fullName === fullName)[0];
        const indexOfStudent: number = this.students.indexOf(student)

        //transfer student from class to class
        // remove from original classroom
        this.students.splice(indexOfStudent, 1);

        // add to new classroom
        toClassroom.students.push(student);

        // make sure receiving classroom remains sorted
        toClassroom.students = _.sortBy(toClassroom.students, ['lastName', 'firstName']);
        }

}


// ==============================================================================================


export class School implements ISchool {
    name: string;
    address: string;
    phone: string;
    classes: Classroom[];
    private _defaultName = 'Small School';
    private _defaultAddress = 'Moscow';
    private _defaultPhone = '+7 (916) 000 12 21';
    private static _defaultNumOfClasses = 2;
    private static _defaultMaxStudentsInClass = 5;

    /**
     * Creates School. If classes are not specify, creates randomly based on params
     * @param numOfClasses creates N of classes according to this value. Takes default value from _defaultNumOfClasses
     * @param maxStudentsInClass maximum students in 1 classroom. For each classroom N of students will be random up to maximum. Takes default value takes from School._defaultMaxStudentsInClass = 10
     * @param name optional
     * @param address optional
     * @param phone optional
     * @param classes use only if you wish to create object manually
     */
    constructor(numOfClasses: number = School._defaultNumOfClasses, maxStudentsInClass: number = School._defaultMaxStudentsInClass, 
                name?: string, address?: string, phone?: string, classes?: Classroom[]) {
        
        // check if classes are specified
        if (typeof classes !== 'undefined') {
            this.classes = classes;
        } else {
            // creates array of N random classrooms
            this.classes = []
            for (let indexOfClass = 0; indexOfClass < numOfClasses; indexOfClass++) {
                this.classes.push(new Classroom(maxStudentsInClass)); // Teacher without any params generates random teacher
            }
        }

        if (typeof name === 'undefined') this.name = this._defaultName;
        else this.name = name;

        if (typeof address === 'undefined') this.address = this._defaultAddress;
        else this.address = address;

        if (typeof phone === 'undefined') this.phone = this._defaultPhone;
        else this.phone = phone;
    }

    /**
     * Method prints all of the information about the school:
     * School data -> Class 1, Class 2 ...
     */
    printSchool(): void {

        // prints out School basic info
        console.log("School data:");
        console.log("============");
        console.log(`Name: ${this.name}`);
        console.log(`Address: ${this.address}`);
        console.log(`Phone: ${this.phone}`);
        console.log('');

        //prints out Classes 
        console.log("Classes:");
        console.log("============");

        // iterate through classes
        let indexOfClass: number = 1;
        for (const currentClass of this.classes) {
            
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
     * @returns new object, doesn't mutate current object
     */ 
    static sortByClassName(school: School): School {
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
     * Method sorts School Classes by lastName -> firstName
     * @param school recieves School
     * @returns new object, doesn't mutate input object
     */
    static sortStudentsInClass(school: School): School {
        // make copy of school not to mutate original object
        const sortedSchool: School = _.cloneDeep(school);
        
        // we should iterate each classroom and perform sorting for each of classroom
        for (const currentClass of sortedSchool.classes) {
            // sorting by lodash package
            currentClass.students = _.sortBy(currentClass.students, ['lastName', 'firstName']);
        }

        return sortedSchool;
    }
}