export class Test{
    constructor(
        public _id:String = '',
        public clientID:String = '',
        public testTypeID:String = '',
        public patient:{} = {
            "fullName":String,
            "age":Number,
            "testDate":Date,
            "informDate":Date,
            "remarks":String
        },
        public reviewevBy:String = '',
        public testFile:String = '',
        public createdAt:Date = new Date(),
        public state:Boolean = true
    ){

    }
}