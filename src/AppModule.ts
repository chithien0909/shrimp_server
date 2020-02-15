import "reflect-metadata";
import {createConnection} from 'typeorm';
import AppServer from './AppServer';
import {Logger} from '@overnightjs/logger';

createConnection().then(async connection => {
    const appServer = new AppServer();
    appServer.start(3000);

    Logger.Imp("TypeORM connection success");
})
.catch(error => {
    Logger.Err("TypeORM connection error: ", error);
});