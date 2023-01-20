import mongoose, { Schema, Model } from "mongoose";
import GenericApiError from "../../errors/GenericApiError";
import { VendedorSchema } from "../../schemas/VendedorSchema";
import { IUserRepository } from "../IUserRepository";

export default class MongoUserRepository implements IUserRepository {
    private connectionString: string;
    private userSchema: Schema<typeof VendedorSchema>;
    private userModel: Model<typeof VendedorSchema>;

    constructor() {
        this.connectionString = process.env.DB_CONNECTION_STRING!.replace('<PASSWORD>', process.env.DB_PASSWORD!);
        this.userSchema = new Schema(VendedorSchema);
        this.userModel = mongoose.model('Vendedor',this.userSchema, 'usuarios');
        mongoose.set('strictQuery', false);
    }

    login(email: string, password: string): Promise<string> {
        return new Promise(async (resolve, reject) => {
            try {
                mongoose.connect(this.connectionString);
                
                const existsResult = await this.userModel.exists({ _email: email, _senha: password });

                if(!existsResult){
                    throw new GenericApiError(`E-mail e/ou senha incorretos.`, 400, 'fail');
                }

                const findResult = await this.userModel.findOne({ _id: existsResult._id }, '_uid -_id');

                resolve(String(findResult!._uid));
            }
            catch (error) {
                reject(error)
            }
        });
    }
}