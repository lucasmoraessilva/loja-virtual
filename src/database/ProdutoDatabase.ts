import mongoose from 'mongoose';
import { Produto } from '../models/Produto';

export class ProdutoDatabase {
    private static instance: ProdutoDatabase;
    private static connectionString: string;
    private static schema: mongoose.Schema;
    private static ProdutoModel;
    
    private constructor(connectionString: string){
        ProdutoDatabase.connectionString = connectionString;
        ProdutoDatabase.schema = new mongoose.Schema({
            _uid: {
                type: String,
                unique: true
            },
            _nome: {
                type: String,
                required: true,
                unique: true,
            },
            _descricao: {
                type: String,
                required: true,
            },
            _preco: {
                type: Number,
                required: true,
            },
            _imagens: [{
                type: String,
                required: true,
            }],
            _status: {
                type: Number,
                required: true,
                enum: [0,1]
            }
        });

        ProdutoDatabase.ProdutoModel = mongoose.model('Produto', ProdutoDatabase.schema);
    }

    static getInstance(): ProdutoDatabase {
        if(ProdutoDatabase.instance){
            return ProdutoDatabase.instance;
        }

        ProdutoDatabase.instance = new ProdutoDatabase(process.env.DB_CONNECTION_STRING!.replace('<PASSWORD>', process.env.DB_PASSWORD!));
        return ProdutoDatabase.instance;
    }

    adicionarProduto(produto: Produto){
        return new Promise((resolve, reject) =>{
            mongoose.set('strictQuery', false);
            mongoose.connect(ProdutoDatabase.connectionString);

            const produtoModel = new ProdutoDatabase.ProdutoModel(produto);
            
            produtoModel.save()
                .then(produto => resolve(
                    {
                        uid: produto._uid,
                        nome: produto._nome,
                        descricao: produto._descricao,
                        preco: produto._preco,
                        imagens: produto._imagens,
                        status: produto._status
                    }
                ))
                .catch(error => reject(error));
        });
    }

    pegarProdutosStatusDisponivel(){
        return new Promise((resolve, reject) => {
            mongoose.set('strictQuery', false);
            mongoose.connect(ProdutoDatabase.connectionString);

            const produtoModel = ProdutoDatabase.ProdutoModel;

            produtoModel.find({ _status: 1 }, '-_id _uid _nome _descricao _preco _imagens _status')
                .then(data => resolve(
                    data.map(produto => {
                        return {
                            uid: produto._uid,
                            nome: produto._nome,
                            descricao: produto._descricao,
                            preco: produto._preco,
                            imagens: produto._imagens,
                            status: produto._status
                        };
                    })
                ))
                .catch(error => reject(error));
        });
    }

    pegarProdutoPorUid(uid: string){
        return new Promise((resolve, reject) => {
            mongoose.set('strictQuery', false);
            mongoose.connect(ProdutoDatabase.connectionString);

            const produtoModel = ProdutoDatabase.ProdutoModel;

            produtoModel.findOne({ _uid: uid }, '-_id _uid _nome _descricao _preco _imagens _status')
                .then(data => resolve(
                    {
                        uid: data._uid,
                        nome: data._nome,
                        descricao: data._descricao,
                        preco: data._preco,
                        imagens: data._imagens,
                        status: data._status
                    }
                ))
                .catch(error => reject(error));
        });
    }

    atualizarProduto(uid: string, produto: Produto){
        return new Promise((resolve, reject) => {
            mongoose.set('strictQuery', false);
            mongoose.connect(ProdutoDatabase.connectionString);

            ProdutoDatabase.ProdutoModel.updateOne(
                { _uid: uid },
                {
                    _nome: produto.nome,
                    _descricao: produto.descricao,
                    _preco: produto.preco,
                    _imagens: produto.imagens,
                    _status: produto.status
                }
            )
            .then(data => resolve(data))
            .catch(error => reject(error));
        });
    }

    deletarProduto(uid: string){
        return new Promise((resolve, reject) => {
            mongoose.set('strictQuery', false);
            mongoose.connect(ProdutoDatabase.connectionString);

            ProdutoDatabase.ProdutoModel.deleteOne({ _uid: uid })
            .then(data => resolve(data))
            .catch(error => reject(error));
        });
    }
}
