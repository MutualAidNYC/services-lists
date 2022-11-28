export interface UserDoc {
    name: string,
    email: string,
    id: string,
    lists: string[] //Array of list ids
}

export interface PasswordAuthResponse {
    code: number;
    message: string;
}