export class User{
    constructor(
        public _id:string = '',
        public userTypeID:string = '',
        public email:string = '',
        public password:string = '',
        public ruc:string = '',
        public createdAt:Date = null,
        public state:boolean = true
    ){

    }
}