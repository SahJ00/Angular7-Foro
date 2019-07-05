export class User {
    constructor(
        public _id: string,
        public name: string,
        public surname: string,
        public email: string,
        public password: string,
        public image: string,
        public role: string,
        public github: String,
        public linkedin: String,
        public twitter: String,
        public facebook: String

    ) { }
}