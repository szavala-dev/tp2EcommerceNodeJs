import { Sequelize } from "sequelize";
import dotenv from 'dotenv';

// Cargar variables de entorno
dotenv.config();

console.log('\n🔍 Verificando configuración de conexión...\n');

// Verificar variables de entorno
const config = {
  DB_NAME: process.env.DB_NAME,
  DB_USER: process.env.DB_USER,
  DB_PASSWORD: process.env.DB_PASSWORD ? '***' : undefined,
  DB_HOST: process.env.DB_HOST,
  DB_DIALECT: process.env.DB_DIALECT,
  DB_PORT: process.env.DB_PORT || 1433
};

console.log('📋 Configuración actual:');
console.log(`   Host: ${config.DB_HOST || '❌ no definido'}`);
console.log(`   Puerto: ${config.DB_PORT}`);
console.log(`   Base de datos: ${config.DB_NAME || '❌ no definida'}`);
console.log(`   Usuario: ${config.DB_USER || '❌ no definido'}`);
console.log(`   Contraseña: ${process.env.DB_PASSWORD ? '✅ definida' : '❌ no definida'}`);
console.log(`   Dialecto: ${config.DB_DIALECT || '❌ no definido'}\n`);

// Validar que todas las variables estén definidas
const missing = Object.keys(config).filter(key => !process.env[key] && key !== 'DB_PASSWORD');
if (missing.length > 0 || !process.env.DB_PASSWORD) {
  console.error('❌ Faltan variables de entorno requeridas');
  if (missing.length > 0) console.error(`   Variables faltantes: ${missing.join(', ')}`);
  if (!process.env.DB_PASSWORD) console.error('   Contraseña no definida');
  process.exit(1);
}

console.log('🔌 Intentando conectar a SQL Server...\n');

const sequelize = new Sequelize(
  config.DB_NAME,
  config.DB_USER,
  process.env.DB_PASSWORD,
  {
    host: config.DB_HOST,
    dialect: config.DB_DIALECT,
    port: parseInt(config.DB_PORT),
    dialectOptions: {
      options: {
        encrypt: process.env.ENCRYPT === 'true' || false,
        trustServerCertificate: true,
        enableArithAbort: true,
        connectTimeout: 10000,
        requestTimeout: 10000
      }
    },
    logging: false
  }
);

(async () => {
  try {
    console.log('⏳ Esperando respuesta del servidor...');
    await sequelize.authenticate();
    
    console.log('\n✅ ¡Conexión exitosa!\n');
    console.log(`   Base de datos: ${config.DB_NAME}`);
    console.log(`   Host: ${config.DB_HOST}:${config.DB_PORT}`);
    console.log(`   Usuario: ${config.DB_USER}\n`);
    
    // Probar consulta simple
    try {
      const [results] = await sequelize.query('SELECT @@VERSION AS Version');
      console.log('📊 Información del servidor:');
      console.log(`   ${results[0].Version.split('\n')[0]}\n`);
    } catch (err) {
      console.log('⚠️  No se pudo obtener información del servidor, pero la conexión es válida\n');
    }
    
    await sequelize.close();
    process.exit(0);
    
  } catch (error) {
    console.error('\n❌ Error de conexión:\n');
    
    if (error.original) {
      console.error(`   Código: ${error.original.code || 'N/A'}`);
      console.error(`   Mensaje: ${error.original.message || error.message}\n`);
    } else {
      console.error(`   Mensaje: ${error.message}\n`);
    }
    
    console.error('🔍 Diagnóstico:\n');
    
    if (error.code === 'ESOCKET' || error.message.includes('Could not connect') || error.message.includes('connect ECONNREFUSED')) {
      console.error('   ❌ No se puede establecer conexión TCP/IP con el servidor');
      console.error('   \n   Posibles soluciones:');
      console.error('   1. Verifica que SQL Server esté corriendo');
      console.error('   2. Verifica que TCP/IP esté habilitado en SQL Server Configuration Manager');
      console.error('   3. Verifica que el puerto sea correcto');
      console.error('   4. Verifica que el firewall permita conexiones al puerto');
      console.error('   5. Revisa SOLUCION_CONEXION_SQL.md para más detalles\n');
    } else if (error.message.includes('Login failed') || error.message.includes('authentication')) {
      console.error('   ❌ Error de autenticación');
      console.error('   \n   Posibles soluciones:');
      console.error('   1. Verifica que el usuario y contraseña sean correctos');
      console.error('   2. Verifica que la autenticación mixta esté habilitada en SQL Server');
      console.error('   3. Verifica que el usuario exista en SQL Server\n');
    } else if (error.message.includes('database') || error.message.includes('cannot open database')) {
      console.error('   ❌ Error con la base de datos');
      console.error('   \n   Posibles soluciones:');
      console.error(`   1. Verifica que la base de datos "${config.DB_NAME}" exista`);
      console.error('   2. Crea la base de datos: CREATE DATABASE ' + config.DB_NAME);
      console.error('   3. Verifica que el usuario tenga permisos en la base de datos\n');
    } else {
      console.error('   Revisa SOLUCION_CONEXION_SQL.md para más detalles\n');
    }
    
    await sequelize.close().catch(() => {});
    process.exit(1);
  }
})();

