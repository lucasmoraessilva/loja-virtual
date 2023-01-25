import { User } from "./User";

export class Buyer extends User {
    constructor(_uid: string, _name: string, _email: string, _password: string) {
        super(_uid, _name, _email, _password);
    }
}