export interface IStudent {
    firstName: string;
    lastName: string;
    birthDate: Date;
    fullName: string; // added
    age: () => {};
};

export interface ITeacher {
    firstName: string;
    lastName: string;
    professions: string[];
    maxProfessions: number;
    fullName: string; // added
};

export interface IClassroom {
    name: string;
    teacher: ITeacher;
    students: IStudent[];
    getYoungestStudent(): string;
    transferStudentTo(fullName: string, toClassroom: IClassroom): void;
};

export interface ISchool {
    name: string;
    address: string;
    phone: string;
    classes: IClassroom[];
    printSchool(school: ISchool): void;
}