# Pasos para Ejecutar el Backend

## Requisitos Previos

1. **Node.js**: Versión 14 o superior (recomendado 18+)
   - Verificar instalación: `node --version`
   - Descargar desde: https://nodejs.org/

2. **SQL Server**: Microsoft SQL Server instalado y configurado
   - Asegúrate de tener SQL Server corriendo
   - Necesitarás las credenciales de acceso (usuario, contraseña, host, puerto)

3. **npm**: Viene incluido con Node.js
   - Verificar instalación: `npm --version`

---

## Pasos de Instalación y Configuración

### Paso 1: Instalar Dependencias

En la raíz del proyecto, ejecuta:

```bash
npm install
```

Esto instalará todas las dependencias listadas en `package.json`.

---

### Paso 2: Configurar Variables de Entorno

1. **Crear archivo `.env`** en la raíz del proyecto:

   Puedes copiar el archivo `env.example` como referencia:
   ```bash
   cp env.example .env
   ```

   O crear manualmente un archivo `.env` con el siguiente contenido:

```env
# Configuración de Base de Datos
DB_NAME=E_commerce
DB_USER=tu_usuario_sql_server
DB_PASSWORD=tu_contraseña_sql_server
DB_HOST=localhost
DB_DIALECT=mssql
DB_PORT=1433
ENCRYPT=false

# Configuración de Seguridad
BCRYPT_SALT_ROUNDS=14
SECRET=tu_secret_key_muy_segura_aqui_minimo_32_caracteres
DURACION_COOKIE=3600000

# Configuración del Servidor
PORT=3000
NODE_ENV=development

# Configuración de Roles
ADMIN_ROLE_ID=1
```

2. **Completar todas las variables** con tus valores reales:

   - `DB_NAME`: Nombre de tu base de datos SQL Server
   - `DB_USER`: Usuario de SQL Server
   - `DB_PASSWORD`: Contraseña de SQL Server
   - `DB_HOST`: Host donde está SQL Server (usualmente `localhost`)
   - `DB_PORT`: Puerto de SQL Server (usualmente `1433`)
   - `SECRET`: Una clave secreta para JWT (debe ser segura, mínimo 32 caracteres)
   - `PORT`: Puerto donde correrá el servidor Node.js (ej: `3000`, `8001`, etc.)
   - `ADMIN_ROLE_ID`: ID del rol de administrador (generalmente `1`)

---

### Paso 3: Configurar la Base de Datos

1. **Asegúrate de que SQL Server esté corriendo**

2. **Crea la base de datos** (si no existe):
   ```sql
   CREATE DATABASE E_commerce;
   ```

3. **Verifica las credenciales** en el archivo `.env` sean correctas

---

### Paso 4: Ejecutar el Servidor

#### Opción A: Modo Desarrollo (con recarga automática)

```bash
npm run dev
```

El servidor se iniciará y se recargará automáticamente cuando detecte cambios en los archivos.

#### Opción B: Modo Producción

```bash
npm start
```

El servidor se iniciará una vez y no se recargará automáticamente.

---

### Paso 5: Verificar que el Servidor Esté Corriendo

Si todo está configurado correctamente, deberías ver:

```
La conexión a la base de datos se ha establecido con éxito.
🚀 Server running on http://localhost:PUERTO
```

Donde `PUERTO` es el valor que configuraste en `PORT` del archivo `.env`.

---

## Solución de Problemas Comunes

### Error: "Cannot find module"
- **Solución**: Ejecuta `npm install` para instalar las dependencias

### Error: "PORT no configurado"
- **Solución**: Verifica que el archivo `.env` existe y tiene la variable `PORT` configurada

### Error: "No se pudo conectar a la base de datos"
- **Solución**: 
  - Verifica que SQL Server esté corriendo
  - Verifica las credenciales en `.env` (DB_USER, DB_PASSWORD, DB_HOST, DB_PORT)
  - Verifica que la base de datos existe
  - Verifica que el puerto de SQL Server sea el correcto (por defecto 1433)

### Error: "EADDRINUSE: address already in use"
- **Solución**: 
  - El puerto está en uso, cambia el valor de `PORT` en `.env` a otro puerto disponible
  - O termina el proceso que está usando ese puerto

### El servidor no se inicia
- **Solución**: 
  - Verifica que todas las variables de entorno estén configuradas
  - Revisa los logs para ver el error específico
  - Asegúrate de estar usando Node.js versión 14 o superior

---

## Endpoints Disponibles

Una vez que el servidor esté corriendo, puedes acceder a los siguientes endpoints:

- **Usuarios**: `http://localhost:PUERTO/app/users`
- **Roles**: `http://localhost:PUERTO/app/roles`
- **Productos**: `http://localhost:PUERTO/app/products`
- **Pedidos**: `http://localhost:PUERTO/app/orders`
- **Carritos**: `http://localhost:PUERTO/app/carts`
- **Imágenes**: `http://localhost:PUERTO/app/image-urls`

---

## Notas Importantes

1. **Archivo .env**: Nunca subas este archivo al repositorio (ya está en `.gitignore`)
2. **Puerto por defecto**: Si no configuras `PORT`, el servidor usará el puerto 3000
3. **Base de datos**: Los modelos se sincronizan automáticamente al iniciar el servidor
4. **Logs**: Los logs se guardan en archivos `combined.log` y `error.log` en la raíz del proyecto

