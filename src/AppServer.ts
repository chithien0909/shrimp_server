import 'reflect-metadata';
import * as bodyParser from 'body-parser';
import * as controllers from './controllers';
import * as cors from 'cors';
import * as swagger from 'swagger-express-ts';
import * as express from 'express';
import { Request, Response } from 'express';
import { Server } from '@overnightjs/core';
import { Logger } from '@overnightjs/logger';
import { SwaggerDefinitionConstant } from 'swagger-express-ts';

// @ts-ignore
class AppServer extends Server {
    private readonly SERVER_STARTED = 'Example server started on port: ';

    constructor() {
        super(true);
        this.app.use(bodyParser.json());
        this.app.use(bodyParser.urlencoded({ extended: true }));
        this.setupControllers();
        this.enableCors();
    }

    /** Add features from `App` controllers. */
    private setupControllers(): void {
        const ctlrInstances = [];
        for (const name in controllers) {
            if (controllers.hasOwnProperty(name)) {
                const controller = (controllers as any)[name];
                ctlrInstances.push(new controller());
            }
        }
        super.addControllers(ctlrInstances);
    }

    /** Allow using `cors` */
    private enableCors(): void {
        const options: cors.CorsOptions = {
            allowedHeaders: [
                'Origin',
                'X-Requested-With',
                'Content-Type',
                'Accept',
                'X-Access-Token'
            ],
            credentials: true,
            methods: 'GET,HEAD,OPTIONS,PUT,PATCH,POST,DELETE',
            origin: 'localhost:30001',
            preflightContinue: false
        };
        this.app.use(cors(options));
    }

    /** API routes */
    private setSwagger(): void {
        this.app.use('/api-docs/swagger', express.static('swagger'));
        this.app.use(
            '/api-docs/swagger/assets',
            express.static('node_modules/swagger-ui-dist')
        );
        this.app.use(
            swagger.express({
                definition: {
                    info: {
                        title: 'Server api',
                        version: '1.0'
                    },
                    externalDocs: {
                        url: 'My url'
                    }
                }
            })
        );
    }

    /** Start up new `Express` server */
    public start(port: number): void {
        this.app.get('*', (req: Request, res: Response) => {
            res.send(this.SERVER_STARTED + port);
        });
        this.app.listen(port, () => {
            Logger.Imp(this.SERVER_STARTED + port);
        });
    }
}

export default AppServer;
