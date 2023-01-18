import express from "express";
import { router as produtoRouter } from "./routes/ProdutoRoutes";
import { router as usuarioRouter } from "./routes/UsuarioRoutes";
import { router as errorRouter } from "./routes/ErrorRoutes";
import { errorHandlingMiddleware } from "./controllers/ErrorController";

const app = express();

app.use(express.json());
app.use('/api/v1/produtos', produtoRouter);
app.use('/api/v1/usuarios', usuarioRouter);
app.all('*', errorRouter);
app.use(errorHandlingMiddleware);

export { app };