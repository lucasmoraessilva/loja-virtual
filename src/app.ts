import express from "express";
import { router as productRouter } from "./routes/ProductRoutes";
import { router as userRouter } from "./routes/UserRoutes";
import { router as errorRouter } from "./routes/ErrorRoutes";
import { errorHandlingMiddleware, validationErrorMiddleware } from "./controllers/ErrorController";

const app = express();

app.use(express.json());
app.use('/api/v1/seller', productRouter);
app.use('/api/v1/user', userRouter);
app.all('*', errorRouter);
app.use(validationErrorMiddleware);
app.use(errorHandlingMiddleware);

export { app };