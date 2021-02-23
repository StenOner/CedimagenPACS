import { TestType } from "./test-type";
import { User } from "./user";
import { Patient } from "./patient";

export class Test{
    constructor(
        public _id:String = '',
        public clientID:String|User = '',
        public testTypeID:String|TestType = '',
        public patient:Patient = new Patient(),
        public reviewedBy:String|User = '',
        public reviewDate:Date = new Date(),
        public responseFile:String = '',
        public testFile:String = '',
        public createdAt:Date = new Date(),
        public state:Boolean = true
    ){

    }
}