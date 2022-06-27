export type Teacher = {
    firstName: string;
    lastName: string;
    professions: string[];
    fullName: string; // added
};

export type Student = {
    firstName: string;
    lastName: string;
    birthDate: Date;
    fullName: string; // added
    age: () => number;
};

export type Classroom = {
    name: string;
    teacher: Teacher;
    students: Student[];
};

export type School = {
    name: string;
    address: string;
    phone: string;
    classes: Classroom[];
}