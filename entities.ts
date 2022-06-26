export type Teacher = {
    firstName: string;
    lastName: string;
    professions: string[];
};

export type Student = {
    firstName: string;
    lastName: string;
    birthDate: Date;
    age: () => number
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