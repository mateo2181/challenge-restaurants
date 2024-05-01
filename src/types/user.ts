export type UserCredentials = {
    email: string;
    password: string;
};

export type NewUserCredentials = UserCredentials & {
    name: string;
};

export type UserLogged = {
    _id: string;
    email: string;
    name: string;
};