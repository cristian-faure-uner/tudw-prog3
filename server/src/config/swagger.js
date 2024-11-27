const swaggerOptions = {
    definition: {
        openapi: '3.0.0',
        info: {
            title: 'API REST - Programación 3 - 2024',
            version: '1.0.0',
            description: 'API REST para la gestión de reclamos de la concesionaria de automóviles Prog.III. '
        },
        components: {
            securitySchemes: {
              bearerAuth: {
                type: 'http',
                scheme: 'bearer',
                bearerFormat: 'JWT',
              },
            },
        },
        security: [
            {
              bearerAuth: [],
            },
        ],
        servers: [
            {
                url: 'http://localhost:3555',
            },
        ],
    },
    apis: ['./v1/routes/*.js'], 
};

export { swaggerOptions };