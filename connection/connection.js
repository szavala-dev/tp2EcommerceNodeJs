import { Sequelize } from "sequelize";
import dotenv from 'dotenv';

// Cargar las variables de entorno desde el archivo .env
dotenv.config();

// Validar variables de entorno requeridas
const requiredEnvVars = {
  DB_NAME: process.env.DB_NAME,
  DB_USER: process.env.DB_USER,
  DB_PASSWORD: process.env.DB_PASSWORD,
  DB_HOST: process.env.DB_HOST,
  DB_DIALECT: process.env.DB_DIALECT
};

// Verificar que todas las variables requeridas estén definidas
const missingVars = Object.keys(requiredEnvVars).filter(key => !requiredEnvVars[key] || requiredEnvVars[key].trim() === '');

if (missingVars.length > 0) {
  console.error('❌ Error: Faltan las siguientes variables de entorno requeridas:');
  missingVars.forEach(varName => {
    console.error(`   - ${varName}`);
  });
  console.error('\n📝 Por favor, crea un archivo .env en la raíz del proyecto con las variables necesarias.');
  console.error('   Puedes usar env.example como referencia.\n');
  process.exit(1);
}

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
      trustServerCertificate: true,
      enableArithAbort: true,
      connectTimeout: 30000, // 30 segundos
      requestTimeout: 30000, // 30 segundos
      instanceName: process.env.DB_INSTANCE || undefined // Para instancias nombradas
    }
  },
  pool: {
    max: 5,
    min: 0,
    acquire: 30000,
    idle: 10000
  },
  logging: process.env.NODE_ENV === 'development' ? console.log : false
});

(async () => {
  try {
    await connection.authenticate();
    console.log("✅ La conexión a la base de datos se ha establecido con éxito.");
    console.log(`   Base de datos: ${process.env.DB_NAME}`);
    console.log(`   Host: ${process.env.DB_HOST}:${process.env.DB_PORT || 1433}`);
  } catch (error) {
    console.error("\n❌ No se pudo conectar a la base de datos.");
    console.error("\n📋 Información de conexión:");
    console.error(`   Host: ${process.env.DB_HOST || 'no definido'}`);
    console.error(`   Puerto: ${process.env.DB_PORT || 1433}`);
    console.error(`   Base de datos: ${process.env.DB_NAME || 'no definida'}`);
    console.error(`   Usuario: ${process.env.DB_USER || 'no definido'}`);
    
    console.error("\n🔍 Posibles causas del error:");
    
    if (error.code === 'ESOCKET' || error.message.includes('Could not connect')) {
      console.error("   1. SQL Server no está corriendo");
      console.error("   2. El puerto TCP/IP no está habilitado en SQL Server");
      console.error("   3. El firewall está bloqueando la conexión");
      console.error("   4. El servicio de SQL Server no está iniciado");
      console.error("   5. El puerto especificado es incorrecto");
    }
    
    if (error.message.includes('Login failed')) {
      console.error("   1. Usuario o contraseña incorrectos");
      console.error("   2. El usuario no tiene permisos");
      console.error("   3. La autenticación está configurada solo para Windows");
    }
    
    if (error.message.includes('database')) {
      console.error("   1. La base de datos no existe");
      console.error("   2. El usuario no tiene acceso a la base de datos");
    }
    
    console.error("\n💡 Soluciones sugeridas:");
    console.error("   - Verifica que SQL Server esté corriendo");
    console.error("   - Verifica las credenciales en el archivo .env");
    console.error("   - Revisa la guía de solución de problemas en SOLUCION_CONEXION_SQL.md");
    console.error(`\n❌ Error técnico: ${error.message}\n`);
    
    // No hacer exit fatal para que el servidor pueda iniciar y mostrar más información
    // process.exit(1);
  }
})();

export default connection;
