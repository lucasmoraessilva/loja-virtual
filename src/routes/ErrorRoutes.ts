import { Router } from "express";
import ErrorController from "../controllers/ErrorController";

const router = Router();
const errorController = new ErrorController();

router.all('*', errorController.resourceNotFound);

export { router };