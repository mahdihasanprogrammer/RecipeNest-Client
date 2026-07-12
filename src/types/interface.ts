
export interface TUser {
    id?: string;
    name?:string;
    image?:string;
    email: string;
    password: string;
    userRole?: string,
    createdAt?: Date,
    updatedAt?: Date,
    emailVerified?:boolean
}