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
git clone https://github.com/RoloMessina/TP2_Final_E_Commerce.git
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
4.	Inicializa la Base de Datos:
o	Configura la base de datos SQL Server según las credenciales de .env.
Uso
1.	Inicia el servidor:
npm run dev
El servidor debería estar disponible en http://localhost:8001.
2.	Rutas del API:
La API expone los siguientes endpoints. A continuación, se muestra un ejemplo de cada entidad disponible:
o	Usuarios
	GET /api/users: Obtiene una lista de todos los usuarios.
	POST /api/users: Crea un nuevo usuario.
	GET /api/users/:id: Obtiene un usuario específico por ID.
	PUT /api/users/:id: Actualiza un usuario específico.
	DELETE /api/users/:id: Elimina un usuario específico.
o	Productos
	GET /api/products: Lista todos los productos.
	POST /api/products: Crea un nuevo producto.
	GET /api/products/:id: Obtiene un producto específico por ID.
	PUT /api/products/:id: Actualiza un producto específico.
	DELETE /api/products/:id: Elimina un producto específico.
o	Pedidos
	GET /api/orders: Lista todos los pedidos.
	POST /api/orders: Crea un nuevo pedido.
	GET /api/orders/:id: Obtiene un pedido específico.
	PUT /api/orders/:id: Actualiza un pedido específico.
	DELETE /api/orders/:id: Elimina un pedido específico.
o	Roles
	GET /api/roles: Lista todos los roles de usuario.
	POST /api/roles: Crea un nuevo rol.
	GET /api/roles/:id: Obtiene un rol específico.
	PUT /api/roles/:id: Actualiza un rol específico.
	DELETE /api/roles/:id: Elimina un rol específico.
o	Carrito de Compras
	GET /api/cart: Lista todos los carritos de compra.
	POST /api/cart: Crea un nuevo carrito de compra.
	GET /api/cart/:id: Obtiene un carrito específico.
	PUT /api/cart/:id: Actualiza un carrito específico.
	DELETE /api/cart/:id: Elimina un carrito específico.

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
  "jsonwebtoken": "^9.0.2",
  "morgan": "^1.10.0",
  "sequelize": "^6.37.4",
  "tedious": "^18.6.1",
  "winston": "^3.15.0"
}
Estructura del Proyecto
•	app.js: Punto de entrada de la aplicación, donde se inicializan los middlewares y rutas.
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
