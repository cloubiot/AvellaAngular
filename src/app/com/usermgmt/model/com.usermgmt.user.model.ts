export class User{
    userName:string;
    firstName:string;
    lastName: string;
    email: string;
    phoneNumber:string;
    password: string;
    confirmPassword:string;
    username:string;
    id:number;
};
export class UserExt{
    userId:number;
    doctorName:string;
    doctorPhone:string;
    profileImageUrl:string;

}
export class ChangePasswordRequest{
    oldPassword: string;
    newPassword: string;
    confirmPassword:string;
    userId: string;
}