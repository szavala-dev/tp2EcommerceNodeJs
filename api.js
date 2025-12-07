import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import routes from './routes/routes.js';
import connection from './connection/connection.js';
import logger from './middlewares/logger.js';
import cookieParser from 'cookie-parser'; // Importar cookie-parser

// Cargar variables de entorno
dotenv.config();

const app = express();

app.use(cors({
  origin: 'http://localhost:8000',
  methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE'],
  allowedHeaders: ['Content-Type', 'Authorization']
}));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser()); // Usar cookie-parser

// Middleware para usar logger en todas las solicitudes entrantes
app.use((req, res, next) => {
  logger.info(`Incoming request: ${req.method} ${req.url}`);
  next();
});

// Rutas
app.use("/app", routes);

// Middleware para manejar 404
app.use((req, res, next) => {
  res.status(404).send({
    success: false,
    message: "Not found",
  });
  logger.warn(`404 - Not Found - ${req.method} ${req.url}`);
});

// Middleware para manejar errores (middleware de manejo de errores centralizado)
app.use((err, req, res, next) => {
  logger.error(`Error: ${err.message}`);
  res.status(500).send({
    success: false,
    message: "Internal Server Error",
  });
});

// Sincronizar los modelos con la base de datos
await connection.sync({ force: false });

const PORT = process.env.PORT || 3000;

if (!process.env.PORT) {
  logger.warn(`PORT no configurado, usando puerto por defecto: ${PORT}`);
}

app.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`);
  logger.info(`Servidor iniciado en el puerto ${PORT}`);
});

export default app;