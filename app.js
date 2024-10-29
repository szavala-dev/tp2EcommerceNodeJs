import express from 'express';
import cors from 'cors';
import routes from './routes/routes.js';
import connection from './connection/connection.js';
import logger from './middlewares/logger.js'; // Importar el logger

const app = express();

app.use(cors()); // Permitir solicitudes CORS
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

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

const PORT = process.env.PORT || 8001;

app.listen(PORT, () => {
  logger.info(`🚀 Server running on http://localhost:${PORT}`);
});