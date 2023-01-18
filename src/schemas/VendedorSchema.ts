export const VendedorSchema = {
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
}