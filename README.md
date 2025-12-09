Trabajo Práctico Final TP2 - API RESTful con Node.js, Express y Sequelize
E_commerce Genérico
Descripción del Proyecto
Este proyecto es una API RESTful de e-commerce genérico desarrollada con Node.js, Express y Sequelize. La aplicación permite gestionar varias entidades (como usuarios, productos, pedidos, roles y carritos de compra) con operaciones CRUD (Crear, Leer, Actualizar, Eliminar). La arquitectura del proyecto sigue el patrón Modelo-Vista-Controlador (MVC) para mantener el código modular y escalable.
Dirección del Repositorio
Repositorio del proyecto en GitHub: TP2_Final_E_Commerce
Tecnologías Utilizadas
•	Node.js - Entorno de ejecución para JavaScript en el servidor.
•	Express - Framework para el desarrollo de servidores web.
•	Sequelize - ORM para la gestión de la base de datos SQL.
•	SQL Server (Microsoft) - Base de datos utilizada.
•	Dotenv - Gestión de variables de entorno.
Requisitos Previos
Asegúrate de tener los siguientes componentes instalados en tu sistema:
•	Node.js (versión 14 o superior)
•	npm (incluido con Node.js)
•	SQL Server de Microsoft
Instalación
1.	Clona este repositorio:
git clone https://github.com/szavala-dev/tp2EcommerceNodeJs.git
cd TP2_Final_E_Commerce
2.	Instala las dependencias:
npm install
3.	Configura las Variables de Entorno:
o	Crea un archivo .env en la raíz del proyecto con la siguiente configuración, utilizando tus propias credenciales de base de datos.
plaintext
Copiar código
DB_NAME=E_commerce
DB_USER=myusername
DB_PASSWORD=mypassword
DB_HOST=localhost
DB_DIALECT=mssql
DB_PORT=1433
DB_DIALECT=mssql
BCRYPT_SALT_ROUNDS=14
SECRET= (A elegir)
PORT= (A elegir)
NODE_ENV= production 
DURACION_COOKIE = int 
ADMIN_ROLE_ID = adminid
UPLOAD_MAX_SIZE=5242880
Si omites `UPLOAD_MAX_SIZE`, la API usa 5 MB como límite por archivo.
4.	Inicializa la Base de Datos:
o	Configura la base de datos SQL Server según las credenciales de .env.
5.	Carga datos base (opcional pero recomendado):
o	Ejecuta `npm run seed` para crear los roles iniciales (`admin`, `user`) y un usuario administrador por defecto (`admin@example.com`).
o	Puedes editar `seed.js` para ajustar los datos o agregar más entidades antes de correr el comando.
6.	Tests automatizados:
o	Ejecuta `npm test` para correr las suites unitarias (Jest + Supertest/uitles) que validan helpers clave.
Uso
1.	Inicia el servidor:
npm run dev
El servidor queda disponible en http://localhost:3000. La ruta raíz `/` devuelve una respuesta de salud y todas las rutas funcionales viven bajo el prefijo `/app`.
2.	Rutas del API (Base URL: http://localhost:3000/app)

Autenticación
•	POST /users/login → inicia sesión y devuelve JWT (1h).  
•	GET /users/loginToken → requiere `Authorization: Bearer <token>` y devuelve el usuario autenticado.  
•	POST /users/check-admin → recibe `{ RoleId }` y responde si es admin.  
•	GET /users/best-customer → mejor cliente por monto gastado.

Usuarios (públicos)
•	GET /users → lista usuarios.  
•	GET /users/:id → detalle por ID.  
•	POST /users → crea usuario (hash automático + carrito inicial).  
•	PUT /users/:id, DELETE /users/:id → actualiza/elimina usuario.

Roles (requiere token de admin)
•	GET /roles, GET /roles/:id.  
•	POST /roles → crea rol.  
•	PUT /roles/:id, DELETE /roles/:id → administra roles existentes.

Productos
•	GET /products, GET /products/:id.  
•	GET /products/best-selling y /products/least-selling → métricas de ventas.  
•	POST /products, PUT /products/:id, DELETE /products/:id → requieren token de admin.

Órdenes
•	GET /orders → lista todas las órdenes.  
•	GET /orders/:id → detalle.  
•	GET /orders/user/:id → órdenes por usuario.  
•	GET /orders/(pending|confirmed|prepared|sent|canceled) → filtros.  
•	POST /orders → crea orden.  
•	PUT /orders/:id, DELETE /orders/:id → requieren admin.  
•	PUT /orders/:id/(confirm|prepare|send|cancel) → cambios de estado (solo admin).

Carritos
•	POST /carts → crea carrito para un usuario.  
•	GET /carts/:userId → obtiene el carrito asociando al usuario.  
•	POST /carts/add → body `{ userId, productId, quantity }`.  
•	POST /carts/remove → body `{ userId, productId }`.  
•	POST /carts/:userId/generate-order → genera una orden con validaciones de stock.

Imágenes de producto
•	GET /image-urls, GET /image-urls/:id.  
•	POST /image-urls, PUT /image-urls/:id, DELETE /image-urls/:id.

Uploads (solo admin)
•	POST /uploads → recibe `multipart/form-data` con el campo `file`, persiste la imagen en `/uploads` y responde con la URL pública. Requiere header `Authorization` de un admin.
•	Puedes consumir la imagen luego desde `http://localhost:3000/uploads/<nombre-de-archivo>`.

Newsletter
•	POST /newsletter/subscribe → recibe `{ "email": "persona@dominio.com" }` y guarda la suscripción. Si el email ya existe devuelve 400 con el mensaje correspondiente.

Notas sobre autorización
•	Los endpoints marcados como “solo admin” usan los middlewares `authenticate` + `requireAdmin`.  
•	Incluye siempre el header `Authorization: Bearer <token>` cuando consumas endpoints protegidos.


3.	Ejemplos de Solicitud:
Ejemplo de solicitud para crear un nuevo usuario (POST):
json
Copiar código
POST /app/users
{
  "name": "Puchi",
  "lastname": "Rodriguez",
  "mail": "puchi.rod@example.com",
  "dni": "22345678",
  "pass": "79797979",
  "dateOfBirth": "1990-01-01",
  "address": "Condarco 981",
  "city": "Ciudad de Buenos Aires",
  "state": "Buenos Aires",
  "RoleId": 1
}
En esta solicitud, se envía un JSON con los datos necesarios para crear un usuario en la aplicación. Asegúrate de que el endpoint y el puerto sean correctos en tu servidor (http://localhost:8001/app/users) antes de enviar la solicitud.
Ejemplo para subir una imagen (POST):
```
curl -X POST http://localhost:3000/app/uploads \
  -H "Authorization: Bearer <token_admin>" \
  -F "file=@/ruta/a/la-imagen.jpg"
```
La respuesta incluye el nombre con el que se guardó el archivo y la URL pública para consumirlo.
Ejemplo para suscribirse al newsletter (POST):
```
POST /app/newsletter/subscribe
{
  "email": "persona@dominio.com"
}
```
Manejo de Errores
El servidor utiliza un middleware de manejo de errores para capturar y responder a las excepciones de manera estructurada. En caso de error, la API devuelve un mensaje JSON con el estado HTTP y detalles del error.
Dependencias Utilizadas
Este es el listado de dependencias incluidas en el package.json:
json
Copiar código
{
  "axios": "^1.7.7",
  "bcrypt": "^5.1.1",
  "cookie-parser": "^1.4.7",
  "cors": "^2.8.5",
  "dotenv": "^16.4.5",
  "express": "^4.21.0",
  "multer": "^1.4.5-lts.1",
  "jsonwebtoken": "^9.0.2",
  "morgan": "^1.10.0",
  "sequelize": "^6.37.4",
  "tedious": "^18.6.1",
  "winston": "^3.15.0"
}
Estructura del Proyecto
•	api.js: Punto de entrada de la aplicación, donde se inicializan los middlewares, autenticación básica y rutas.
•	connection/connection.js: Configura la conexión a la base de datos utilizando Sequelize.
•	controllers/: Contiene los controladores de cada entidad (usuarios, productos, pedidos, etc.).
•	models/: Contiene los modelos de datos definidos en Sequelize.
•	routes/: Define las rutas de la API para cada entidad.
•	services/: Lógica de negocio y operaciones de datos para cada entidad.
•	middlewares/: Middlewares personalizados (ej., logger.js para registrar eventos).
Buenas Prácticas Implementadas
•	Patrón MVC: La aplicación está organizada en Modelo-Vista-Controlador para facilitar el mantenimiento y la escalabilidad.
•	Variables de Entorno: Las credenciales sensibles se gestionan mediante un archivo .env.
•	Gestión de Errores: Manejo adecuado de errores para mejorar la robustez del servidor.
Contribuir
Las contribuciones son bienvenidas. Si deseas mejorar la aplicación o corregir errores, sigue estos pasos:
1.	Haz un fork del proyecto.
2.	Crea una nueva rama (git checkout -b feature/nueva-funcionalidad).
3.	Realiza los cambios y haz commit (git commit -am 'Agrego nueva funcionalidad').
4.	Haz push a la rama (git push origin feature/nueva-funcionalidad).
5.	Abre un Pull Request.
Licencia
Este proyecto se distribuye bajo la licencia ISC.
