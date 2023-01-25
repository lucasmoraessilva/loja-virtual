import mongoose from "mongoose";
import GenericApiError from "../../errors/GenericApiError";
import { BuyerModel } from "../../models/BuyerModel";
import { SellerModel } from "../../models/SellerModel";
import { IUserRepository } from "../IUserRepository";

export default class MongoUserRepository implements IUserRepository {
    private connectionString: string;

    constructor() {
        this.connectionString = process.env.DB_CONNECTION_STRING!.replace('<PASSWORD>', process.env.DB_PASSWORD!);
        mongoose.set('strictQuery', false);
    }
    
    login(email: string, password: string): Promise<{ _uid: string, _type: string }> {
        return new Promise(async (resolve, reject) => {
            try {
                mongoose.connect(this.connectionString);
                
                let user = await SellerModel.findOne({ _email: email, _password: password });

                if(user){
                    return resolve({ _uid: user._uid, _type: 'seller' });
                }

                user = await BuyerModel.findOne({ _email: email, _password: password });

                if(user){
                    return resolve({ _uid: user._uid, _type: 'buyer' });
                }

                throw new GenericApiError('E-mail ou senha incorreto.', 400, 'fail');
            }
            catch (error) {
                reject(error)
            }
        });
    }
}