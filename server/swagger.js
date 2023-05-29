const swaggerJSDoc = require('swagger-jsdoc');

const options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'API Node.js',
      version: '1.0.0',
      description: 'Documentation de l\'API Node.js',
    },
    servers: [
      {
        url: 'http://localhost:3003',
      },
    ],
  },
  apis: ['./routes/api/*.js'], 
};

const swaggerSpec = swaggerJSDoc(options);

module.exports = swaggerSpec;
