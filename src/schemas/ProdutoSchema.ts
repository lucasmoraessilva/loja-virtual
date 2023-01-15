export const ProdutoSchema = {
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
};