import { CorsOptions } from "cors";


export const corsConfig: CorsOptions = {
    origin: ['*'],
    preflightContinue: false,
    methods: ['*', 'PATCH'],
    optionsSuccessStatus: 204,
    allowedHeaders: [
      'Access-Control-Allow-Origin',
      'Content-Type',
      'Accept',
      'Origin',
      'x-refresh-token',
      'Authorization',
      'authorization',
      'jwt'
    ],
    credentials: true,
}