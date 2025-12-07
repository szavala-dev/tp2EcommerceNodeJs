import { Sequelize } from "sequelize";
import dotenv from 'dotenv';

// Cargar las variables de entorno desde el archivo .env
dotenv.config();

const connection = new Sequelize(
  process.env.DB_NAME,
  process.env.DB_USER,
  process.env.DB_PASSWORD,
  {
  host: process.env.DB_HOST,
  dialect: process.env.DB_DIALECT,
  port: parseInt(process.env.DB_PORT) || 1433, // Puerto predeterminado para SQL Server
  dialectOptions: {
    options: {
      encrypt: process.env.ENCRYPT === 'true' || false,
      trustServerCertificate: true
    }
  }
});

(async () => {
  try {
    await connection.authenticate();
    console.log("La conexión a la base de datos se ha establecido con éxito.");
  } catch (error) {
    console.error("No se pudo conectar a la base de datos:", error);
  }
})();

export default connection;
