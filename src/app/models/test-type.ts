export class TestType{
    constructor(
        public _id:string = '',
        public type:string = '',
        public createdAt:Date = new Date(),
        public state:boolean = true
    ){

    }
}