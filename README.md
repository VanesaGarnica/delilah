# delilah

API for Delilah Resto
Esta API fue desarrollada para el tercer proyecto del curso de fullstack developer de Acamica.
Esta pensado para un delivery de comidas de un restaurante.
Permite el registro de usuarios (como admin o user)
Y que los user puedan hacer pedidos.
El admin puede editar el estado de los pedidos, los productos que se venden, y ver las listas de todos los pedidos y todos los usuarios.

## comenzar

Instrucciones para utilizar el contenido del repositorio localmente:

### 1. paso previo

Tener instalado Node.js
Tener instalado Postman o similar para hacer las peticiones HTTP.
Tener instalado un IDE (recomendado Visual Studio Code).
Disponer un gestor de bases de datos MySQL (recomendado MySQL Workbench)
Descargar o clonar el contenido del repositorio

### 2. instalacion de dependencias

Desde la linea de comandos situada en la carpeta del proyecto, correr "npm install" para instalar todas las dependencias necesarias.

### 3. crear la base de datos

El archivo "db.sql" que se encuentra en la carpeta "database" contiene el script entero que deberá copiar como una consulta en el gestor de bases de datos MySQL para crear la base de datos con todas sus tablas y relaciones, e incluye algunos inserts iniciales para pruebas.

### 4. configurar las variables de entorno

Crear un archivo de texto llamado ".env" en la carpeta descargada, que deberá tener el siguiente formato, sin []:

```
APP_PORT=[puerto que usara la aplicación del servidor de la api]
DB_PORT=[puerto configurado en su servidor de base de datos]
DB_HOST=[ip o dirección de la aplicacion del servidor de la api, para usar local colocar localhost]
DB_USER=[usuario configurado en su servidor de base de datos, se puede usar root para pruebas]
DB_PASS=[contraseña de dicho usuario]
MYSQL_DB=delilah[es el nombre de la base de datos que descargó, no debería cambiarse]
JWT_SECRET=[la secret que se usara para generar los jsonwebtoken para el login]
```

### 5. correr la aplicacion

desde la linea de comandos situada en la carpeta del proyecto, correr "npm start" o "node app" para iniciar el servidor

## peticiones

todas las peticiones devuelven en el body un objeto en el formato
```
{
    "success":[0 para falla, 1 para exito],
    [message, data o ambos, segun se requiera]
}
```

### ruta /api/user/

#### registro de usuarios: post /api/user/

El registro de usuarios requiere en el body de la petición el siguiente formato:

```
{
	"username":"nombre_de_usuario_nuevo",
	"password":"password_nueva",
	"email":"email_de_prueba@email.com",
	"name":"primer_nombre",
	"last_name":"apellido",
	"address":"direccion",
	"phone":"telefono",
	"id_rol":[admite solo 1 para admin, 2 para user],
	"id_city":[admite 1 para CABA, 2 para Cordoba Capital, 3 para San Rafael (Mendoza), 4 para Rosario]
}
```

A los usuarios nuevos se les encriptara la contraseña para no guardarse como texto plano

#### login de usuarios: post /api/user/login

El login de usuarios requiere en el body de la petición el siguiente formato:

```
{
    "email":"email@email.com",
	"username":"nombre_de_usuario",
	"password":"password_de_usuario"
}
```
permite login mediante el username o el email (es decir, se puede omitir uno de los dos)

cuando es exitoso, devuelve un objeto con un token, en el formato

```
{
    "success": 1,
    "message": "Login successful.",
    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJyZXN1bHQiOnsiaWRfdXNlciI6NSwidXNlcm5hbWUiOiJzaW1iYWNoYW5jaG8iLCJ0b2tlbiI6bnVsbCwiZW1haWwiOiJzaW1iYUBnbWFpbC5jb20iLCJuYW1lIjoiU2ltYmEiLCJsYXN0X25hbWUiOiJTYXJpcyIsImFkcmVzcyI6IlNhbnRpYWdvIFRlbXBsZSA5NiIsInBob25lIjoiMzUxIDY2MSA5MTYxIiwiaWRfcm9sIjoxLCJpZF9jaXR5IjoyfSwiaWF0IjoxNTg3NDYxMTI2LCJleHAiOjE1ODc0NjQ3MjZ9.Y6Ao7aONVx50qEgOZGTtUS8M8Aeu1JVJFjYWT-EpTEI"
}
```

dicho token debe enviarse en todos los endpoints de la API (excepto registro de usuario y login)
se lo envía desde el header con los valores:
"Authorization: bearer [token]"
siendo [token] el que nos devolvió el login

los datos de prueba disponibles para login de usuario son:

##### usuario admin:

```
{
    "email":"juan@gmail.com",
	"username":"juancho",
	"password":"1234"
}
```

##### usuario user:

```
{
    "email":"jose@gmail.com",
	"username":"josepepe",
	"password":"1234"
}
```

#### ver todos los usuarios: get /api/user/

No requiere body, solo usuario admin puede acceder a este endpoint

#### ver usuario por id: get /api/user/id

requiere un body en el que se especifica el id del usuario que se solicita ver, en el formato

```
{
	"id_user":2
}
```

tambien requiere el token de autenticación en el header
si un usuario admin hace la petición, puede ver la información de cualquier usuario por ID
si un usuario user intenta la petición, solamente será exitosa si intenta ver su propia información

### ruta /api/product/ (CRUD de productos)

#### ver todos los productos: get /api/product/

no requiere body ni autenticación, devuelve una lista con todos los productos disponibles, los productos cargados de ejemplo son:

```
{
    "success": 1,
    "data": [
        {
            "id_product": 1,
            "name": "costeleta con papas",
            "price": 350
        },
        {
            "id_product": 2,
            "name": "pizza de rucula",
            "price": 390
        },
        {
            "id_product": 3,
            "name": "lomito criollo",
            "price": 450
        }
    ]
}
```

#### ver producto por ID: get /api/product/id

requiere en el body un objeto especificando el id del producto que se solicita, en el formato:

```
{
    "id_product": 2
}
```

#### modificar producto por ID: put /api/product/id

solo un usuario admin puede acceder a este endpoint
requiere en el body un objeto especificando el id del producto a modificar, el nuevo nombre y el nuevo precio, en el formato:

```
{
	"id_product":5,
	"name":"empanada de pollo",
	"price":50
}
```

#### crear producto: post /api/product/

solo un usuario admin puede acceder a este endpoint
requiere en el body el nombre y el precio del producto nuevo a crear, en el formato:

```
{
	"name":"empanada de pollo",
	"price":50
}
```

ejemplo de resultado:

```
{
    "success": 1,
    "data": {
        "fieldCount": 0,
        "affectedRows": 1,
        "insertId": 5,
        "info": "",
        "serverStatus": 2,
        "warningStatus": 0
    }
}
```

siendo "insertId" el "id_product" del producto nuevo creado

#### eliminar producto por ID: delete /api/product/id

solo un usuario admin puede acceder a este endpoint
requiere en el body un objeto especificando el id del producto que se pide eliminar, en el formato: 

```
{
    "id_product": 2
}
```

### ruta /api/order/

#### crear pedido nuevo: post /api/order/

todos los usuarios logeados pueden generar nuevos pedidos, requiere en el body un objeto con la orden en el formato:

```
{
	"id_user":5,
	"id_payment":1,
	"details":[
		{
			"id_product":5,
			"quantity":4
		},
		{
			"id_product":5,
			"quantity":4
		}
	]
}
```

se pueden agregar tantos elementos como se necesite en el array "details"

#### cambiar estado de un pedido por ID: put /api/order/id

solo un usuario admin puede acceder a este endpoint
requiere en el body un objeto especificando el id de la orden que se necesita modificar y el id del nuevo estado que la misma tendrá, en el formato:

```
{
	"id_order":14,
	"id_state":4
}
```

#### ver todas las ordenes: get /api/order/

solo un usuario admin puede acceder a este endpoint
no requiere body, devuelve una lista con todas las ordenes, el usuario que le corresponda y la dirección, por ejemplo
```
{
    "success": 1,
    "data": [
        {
            "id_order": 1,
            "time": "2020-04-21T08:47:55.000Z",
            "descrip": "efectivo",
            "username": "josepepe",
            "address": "Av. de las Riveras 17653 2B"
        },
        {
            "id_order": 2,
            "time": "2020-04-21T08:51:27.000Z",
            "descrip": "efectivo",
            "username": "josepepe",
            "address": "Av. de las Riveras 17653 2B"
        },
        {
            "id_order": 3,
            "time": "2020-04-21T08:51:51.000Z",
            "descrip": "efectivo",
            "username": "josepepe",
            "address": "Av. de las Riveras 17653 2B"
        }
    ]
}
```