import express from "express";
import { router as produtoRouter } from "./routes/ProdutoRoutes";
import { router as usuarioRouter } from "./routes/UsuarioRoutes";

const app = express();

app.use(express.json());
app.use('/api/v1/produtos', produtoRouter);
app.use('/api/v1/usuarios', usuarioRouter);

export { app };