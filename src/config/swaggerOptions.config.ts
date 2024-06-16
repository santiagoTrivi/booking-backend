import { SwaggerUiOptions } from "swagger-ui-express";
import swaggerJsdoc from 'swagger-jsdoc';

const swaggerOptions = {
    definition: {
        openapi: '3.0.0',
        info: {
            title: 'komunly_api',
            version: '1.0.0',
            description: 'social network'
        },
        servers: [
            {
                url: 'http://localhost:3000'
            }
        ]
    },
    apis: ['**/*.{js, ts}']
}

export const swaggerConfig = swaggerJsdoc(swaggerOptions);