import { app } from './app';
import dotenv from "dotenv";

dotenv.config({
    path: './config.env'
});

app.listen(3000,() => {
    console.log('loja-virtual-api iniciada...');
});