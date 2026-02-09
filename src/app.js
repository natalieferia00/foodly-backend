const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const connectDB = require('./config/db');
const planRoutes = require('./routes/planRoutes');
const swaggerUI = require('swagger-ui-express');
const swaggerJsDoc = require('swagger-jsdoc');

dotenv.config();
connectDB();

const app = express();


const swaggerOptions = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'Foodly API',
      version: '1.0.0',
      description: 'Gestión de comidas y persistencia de widgets (RN3)',
    },
    servers: [{ url: 'http://localhost:5000' }],
    paths: {
      '/api/plans': {
        get: {
          summary: 'Obtiene el plan de comidas persistente',
          responses: {
            '200': {
              description: 'Éxito: Datos cargados de MongoDB'
            }
          }
        },
        post: {
          summary: 'Guarda y sincroniza el plan',
          requestBody: {
            required: true,
            content: {
              'application/json': {
                schema: {
                  type: 'object',
                  example: {
                    Lunes: {
                      desayuno: "Avena",
                      almuerzo: "Pollo",
                      merienda: "Fruta",
                      cena: "Ensalada"
                    }
                  }
                }
              }
            }
          },
          responses: {
            '200': {
              description: 'Éxito: Sincronización completa'
            }
          }
        }
      }
    }
  },
  apis: [],
};

const swaggerDocs = swaggerJsDoc(swaggerOptions);

app.use(cors());
app.use(express.json());


app.use('/api-docs', swaggerUI.serve, swaggerUI.setup(swaggerDocs));


app.use('/api/plans', planRoutes);

app.get('/', (req, res) => {
  res.send('Foodly API is running...');
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(` Servidor en puerto ${PORT}`);
  console.log(` Swagger listo en: http://localhost:${PORT}/api-docs`);
});