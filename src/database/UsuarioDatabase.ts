import mongoose from "mongoose";

export class UsuarioDatabase {
    private static instance: UsuarioDatabase;
    private static connectionString: string;
    private static schema: mongoose.Schema;
    private static UsuarioModel;
    
    private constructor(connectionString: string){
        UsuarioDatabase.connectionString = connectionString;
        UsuarioDatabase.schema = new mongoose.Schema({
            _uid: {
                type: String,
                unique: true
            },
            _nome: {
                type: String,
                required: true,
            },
            _email: {
                type: String,
                required: true,
            },
            _senha: {
                type: String,
                required: true,
            },
            _produtos: {
                type: [{}],
            }
        });

        UsuarioDatabase.UsuarioModel = mongoose.model('Usuario', UsuarioDatabase.schema);
    }

    static getInstance(): UsuarioDatabase {
        if(UsuarioDatabase.instance){
            return UsuarioDatabase.instance;
        }

        UsuarioDatabase.instance = new UsuarioDatabase(process.env.DB_CONNECTION_STRING!.replace('<PASSWORD>', process.env.DB_PASSWORD!));
        return UsuarioDatabase.instance;
    }

    login(email: string, senha: string): Promise<string> {
        return new Promise((resolve, reject) =>{
            mongoose.set('strictQuery', false);
            mongoose.connect(UsuarioDatabase.connectionString);

            UsuarioDatabase.UsuarioModel.exists( { _email: email, _senha: senha } )
                .then((objectId: { _id: string }) => {
                    if(objectId)
                        return UsuarioDatabase.UsuarioModel.findOne({ _id: objectId._id }, '_uid -_id');
                    throw new Error("'email' ou 'senha' incorreto!")
                })
                .then((userUidObject: { _uid: string }) => {
                    resolve(userUidObject._uid);
                })
                .catch(error => {
                    reject(error)
                });
        });
    }
}