import express from "express";
import { router } from "./routes/ProdutoRoutes";

const app = express();

app.use(express.json());
app.use('/api/v1/produtos', router);

export { app };