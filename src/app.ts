import { join } from 'path';
import AutoLoad, { AutoloadPluginOptions } from '@fastify/autoload';
import { FastifyPluginAsync, FastifyServerOptions } from 'fastify';
import SwaggerUI from "@fastify/swagger-ui";
import fastifyCors from '@fastify/cors'; // Import du plugin CORS

export interface AppOptions extends FastifyServerOptions, Partial<AutoloadPluginOptions> {}

const options: AppOptions = {};

const app: FastifyPluginAsync<AppOptions> = async (fastify, opts): Promise<void> => {
    // Configuration CORS
    void fastify.register(fastifyCors, {
        origin: true, // Autorise uniquement votre front-end
        methods: ['GET', 'POST', 'PUT', 'DELETE'], // Méthodes autorisées
        credentials: true // Si vous utilisez des cookies ou sessions
    });

    // Enregistrement des plugins et des routes
    void fastify.register(AutoLoad, {
        dir: join(__dirname, 'plugins'),
        options: opts
    });

    void fastify.register(AutoLoad, {
        dir: join(__dirname, 'routes'),
        options: opts
    });

    void fastify.register(SwaggerUI, {
        routePrefix: "/api-docs",
    });
};

export default app;
export { app, options };
