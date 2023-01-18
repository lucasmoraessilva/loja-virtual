import dotenv from "dotenv";
dotenv.config({
    path: `${__dirname}/../.env`
});

import { app } from './app';

app.listen(3000,() => {
    console.log('loja-virtual-api iniciada...');
});