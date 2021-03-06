import { UserType } from './user-type';

export class User{
    constructor(
        public _id:string = '',
        public userTypeID:string|UserType = '',
        public email:string = '',
        public password:string = '',
        public userName:string = '',
        public dni:string = '',
        public sign:string = '',
        public createdAt:Date = new Date(),
        public state:boolean = true
    ){

    }
}