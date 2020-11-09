export class Patient{
    constructor(
        public fullName:string = '',
        public dni:string = '',
        public age:number = 0,
        public testDate:Date = new Date(),
        public informDate:Date = new Date(),
        public remarks:string = ''
    ){

    }
}