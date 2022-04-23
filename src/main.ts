import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

import * as dotenv from 'dotenv';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
dotenv.config();

require('./common/plugins/mongoose.plugin');
async function bootstrap() {
    const app = await NestFactory.create(AppModule);

    //SWAGGER
    const options = new DocumentBuilder()
        .setTitle('TEST')
        .setDescription(`API ${process.env.NODE_ENV}`)
        .setVersion('1')
        .addBearerAuth({ type: 'http', name: 'Authorization' })
        .build();
    const document = SwaggerModule.createDocument(app, options, {
        deepScanRoutes: true,
    });
    SwaggerModule.setup('swagger', app, document, {
        customCss: `body { counter-reset: endpoints; }
                .models { display: none !important; } 
                .opblock { position: relative; padding-left: 40px; } 
                .opblock:before { 
                    counter-increment: endpoints;
                    width: 35px;
                    text-align: right;
                    display: block; 
                    content: counter(endpoints); 
                    position: absolute; 
                    left: 1px; 
                    top: 11px;
                    font-family: monospace;
                    font-weight: 700;
                    font-size: 14px;
                }`,
        customSiteTitle: 'TEST',
    });

    await app.listen(process.env.port);
}
bootstrap();
