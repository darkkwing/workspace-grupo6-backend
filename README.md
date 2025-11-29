# 🛍️ GROUPE SIX - Proyecto E-commerce JaP - 2025

-----

## 1\. ⚙️ Requisitos Previos

Para ejecutar el proyecto localmente, asegúrate de tener instalados los siguientes componentes:

  * **Node.js 16+**
  * **MariaDB 10.11.6**
  * **Cliente SQL** (HeidiSQL, Workbench, DBeaver, etc.)
  * **Git** (opcional)

-----

## 2\. 📂 Estructura del Proyecto

El proyecto se organiza en un *workspace* principal que contiene el servidor y la interfaz de usuario:

```
workspace-grupo6-backend/
├── backend/     (servidor Express + API REST + conexión a MariaDB)
└── frontend/   (HTML, CSS, JS servido automáticamente por el backend)
```

**Base de Datos:**

  * `backend/sql/groupeSix.sql` → **Dump completo de la base de datos** (necesario para la instalación).

-----

## 3\. 🚀 Instalación

  * **Clonar el repositorio:**

<!-- end list -->

```bash
git clone https://github.com/darkkwing/workspace-grupo6-backend.git
```

-----

## 4\. 🗄️ Configurar la Base de Datos

### 4.1. Crear la base de datos

Se debe crear la base de datos con el nombre `groupesix` utilizando un cliente SQL o la terminal.

  * **Por HeidiSQL:**
    1.  Conectar como usuario `root`.
    2.  Crear una base de datos nueva llamada: **`groupesix`**.
  * **Por terminal:**
    ```sql
    CREATE DATABASE groupesix;
    ```

### 4.2. Importar el archivo SQL con HeidiSQL

1.  Abrir HeidiSQL.
2.  Conectar con el usuario `root`.
3.  Clic derecho sobre la base de datos **`groupesix`** → “Importar archivo SQL”.
4.  Seleccionar el archivo: **`backend/sql/groupeSix.sql`**.

-----

## 5\. 🛠️ Importar / Exportar SQL por Terminal (Opcional)

  * **Para importar:**

    ```bash
    mysql -u root -p groupesix < groupeSix.sql
    ```

  * **Para exportar:**

    ```bash
    mysqldump -u root -p groupesix > groupeSix.sql
    ```

-----

## 6\. 🔗 Configurar Conexión a MariaDB

Es crucial que los datos de conexión coincidan con tu instalación local de MariaDB.

  * **Editar el archivo:**

    ```
    backend/config/db.js
    ```

  * **Asegurarse de que los datos coincidan:**

<!-- end list -->

```javascript
{
  host: "localhost",
  user: "root",
  password: "1234", // Contraseña usada en MariaDB (ajustar si es necesario)
  database: "groupesix" // Nombre exacto de la base de datos
}
```

> Es importante que el nombre de la base de datos creada en MariaDB sea **exactamente**: `groupesix`.

-----

## 7\. 📦 Instalar Dependencias del Backend

  * **Desde la carpeta `backend`:**

<!-- end list -->

```bash
cd backend
npm install
```

  * **Dependencias principales (ver `backend/package.json`):**
      * `cors`
      * `dotenv`
      * `express`
      * `jsonwebtoken`
      * `multer`
      * `mysql2`

-----

## 8\. ▶️ Iniciar el Backend

  * **Desde la carpeta `backend`:**

<!-- end list -->

```bash
cd backend
npm start
```

El servidor quedará disponible en:

➡️ **`http://localhost:3000`**

-----

## 9\. 🌐 Abrir el Frontend

El *backend* Express sirve automáticamente la carpeta `frontend`.

Para usar la aplicación, entra en el navegador a:

➡️ **`http://localhost:3000/`**

> ⚠️ **IMPORTANTE:** No utilizar Live Server, ya que el frontend debe comunicarse con el backend Express en el mismo puerto.

-----

## 10\. ✨ Funcionalidades del Frontend

El frontend está construido con HTML, CSS, JavaScript y Bootstrap5.

### Almacenamiento Local (`localStorage`)

*Usa `localStorage` para almacenar:*

  * Token de autenticación
  * Datos de usuario
  * Carrito de compras
  * Preferencias de tema (`dark mode`)
  * Preferencias de moneda (USD/UYU)

### Principales Características

  * Catálogo de productos por categoría.
  * Búsqueda dinámica de productos.
  * Vista de producto con galería de imágenes.
  * Comentarios con estrellas.
  * Carrito de compras dinámico.
  * Checkout real con dirección, envío y método de pago.
  * Modo oscuro persistente. (La primera vez detectará el modo del sistema o navegador)
  * Cambio de moneda USD ↔ UYU.

-----

## 11\. 🧩 Módulos JS Principales del Frontend

  * `frontend/js/index.js`

      * Carga el carrusel principal en la página de inicio.
      * Solicita y muestra las categorías.
      * Integra el buscador dinámico.
      * Actualiza el *badge* del carrito (cantidad de ítems).

  * `frontend/js/products.js`

      * Lista productos según la categoría seleccionada.
      * Permite ordenar productos (por precio, relevancia, etc.).
      * Aplica filtros por rango de precios.
      * Renderiza dinámicamente las *cards* de productos.

  * `frontend/js/product-info.js`

      * Obtiene el ID del producto desde `localStorage`.
      * Carga los datos completos del producto desde el backend.
      * Muestra la galería de imágenes del producto.
      * Muestra información como: nombre, descripción, precio, vendidos.
      * Muestra productos relacionados.
      * Integra con el sistema de comentarios.
      * Permite agregar el producto al carrito.

  * `frontend/js/agrega_comentario.js`

      * Permite enviar un nuevo comentario para el producto actual.
      * Valida que el usuario esté logueado (usa `token` en `localStorage`).
      * Envía la puntuación y el texto del comentario al backend.
      * Refresca la lista de comentarios tras agregar uno nuevo.

  * `frontend/js/cart.js`

      * Lee el carrito desde `localStorage` (y eventualmente desde backend).
      * Renderiza los productos del carrito en `cart.html`.
      * Permite cambiar la cantidad de cada producto.
      * Permite eliminar productos del carrito.
      * \-Calcula: Subtotal, Costo de envío (según tipo seleccionado: *premium, express, standard*), Total final.
      * \-Valida:
          * Dirección completa (departamento, localidad, calle, número, esquina)
          * Tipo de envío seleccionado
          * Método de pago seleccionado
      * Cuando todo es válido, llama a la función de checkout ubicada en `checkoutFront.js`.

  * `frontend/js/checkoutFront.js`

      * Obtiene el estado actual del carrito.
      * Lee subtotal, envío y total mostrados en pantalla.
      * Recoge datos de: dirección, tipo de envío, método de pago.
      * Valida que toda la información requerida exista.
      * Envía una petición `POST` a `/checkout` en el backend.
      * Si el backend confirma la compra: Limpia el carrito en `localStorage`, puede recargar la página o redirigir al inicio.

  * `frontend/js/currency.js`

      * Mantiene un interruptor para cambiar entre **USD** y **UYU**.
      * Guarda la moneda seleccionada en `localStorage`.
      * Lanza un evento personalizado (por ejemplo, `currencyChange`) para que otros módulos recalculen precios.
      * Convierte dinámicamente los precios de productos y totales.

  * `frontend/js/darkmode.js`

      * Alterna entre tema claro y oscuro.
      * Guarda la preferencia de tema en `localStorage`.
      * Aplica clases CSS específicas para modo oscuro.

  * `frontend/js/perfil_heder.js`

      * Carga los datos del usuario logueado desde `localStorage`.
      * Muestra el nombre y la imagen de perfil en el *header*.
      * Actualiza el menú desplegable con información de la cuenta.

  * `frontend/js/Cerrar_sesión.js`

      * Borra el *token* de autenticación y otros datos relevantes del usuario de `localStorage`.
      * Redirige a la página de *login*.

  * `frontend/js/init.js`

      * Define constantes globales, como URLs base de la API.
      * Expone funciones de utilidad como `getJSONData`, usadas en distintas partes del *frontend*.
      * Otros scripts (buscadores, responsive, etc.)
          * Implementan la búsqueda en *desktop* y móvil.
          * Muestran sugerencias al escribir.
          * Manejan menús y comportamientos *responsive*.

-----

## 12\. 🛣️ Rutas Principales del Backend

### AUTH

  * `POST /login`
      * Recibe correo y contraseña.
      * Verifica usuario en la BD.
      * Devuelve token **JWT** con `id_usuario`.
      * Si falla: retorna error de credenciales.

### CATEGORIES

  * `GET /categories`
      * Devuelve todas las categorías con `id`, `nombre`, `descripción` e `imagen`.
      * Usado en el *home* para renderizar el carrusel y *cards*.

### PRODUCTS

  * `GET /products/:catID`
      * Lista todos los productos de una categoría.
      * Respuesta incluye: `nombre`, `precio`, `moneda`, `vendidos`, `imagen`.
  * `GET /products/item/:id`
      * Devuelve información completa de un producto.
      * Incluye: datos principales + galería de imágenes.
  * `GET /products/related/:id`
      * Retorna IDs y detalles de productos relacionados.

### COMMENTS

  * `GET /comments/:productID`
      * Lista todos los comentarios de un producto.
      * Enviados por usuarios reales o preexistentes del *dataset*.
  * `POST /comments`
      * **Requiere token.**
      * Guarda un comentario con: `id_producto`, `id_usuario` (desde token), `puntuación`, `texto`, `fecha del servidor`.

### CART

  * `GET /cart`
      * Obtiene el carrito del usuario autenticado.
      * \-Respuesta contiene: `id_producto`, `nombre`, `imagen`, `moneda`, `costo`, `cantidad`, `subtotal`.
  * `POST /cart/sync`
      * Reemplaza el carrito del backend con el enviado desde *frontend*.
      * Se ejecuta cada vez que el usuario modifica cantidades o elimina productos.

### CHECKOUT

  * `POST /checkout`
      * **Requiere token.**
      * \-Guarda una orden completa: `subtotal`, `costo_envio`, `total`, `moneda`, `tipo de envío` (`premium`, `express`, `standard`), `dirección` (se inserta en tabla `direccion`), `items` (tabla `orden_items`), `método de pago` (tabla `pago`).
      * Devuelve `success` si todo fue correctamente insertado.

-----

## 13\. 🐞 Errores Comunes

  * `ECONNREFUSED`

      * Sucede cuando **MariaDB no está iniciado** o no está escuchando en el puerto correcto.

  * `Access denied`

      * Ocurre cuando la contraseña o el usuario en **`db.js`** no coinciden con los de MariaDB.

  * `Cannot find module`

      * Generalmente indica que faltan dependencias.
      * **Solución:** ejecutar `npm install` dentro de `backend`.

-----

## 14\. 🖥️ Uso de MariaDB desde Terminal

  * **Para abrir MariaDB desde la terminal:**
    ```bash
    mysql -u root -p
    ```
  * Luego ingresar la contraseña configurada.
  * **Para salir:**
    ```bash
    exit;
    ```

-----

## 15\. 💾 Importar / Exportar SQL desde Terminal

  * **Importar dump:**
    ```bash
    mysql -u root -p groupesix < groupeSix.sql
    ```
  * **Exportar dump:**
    ```bash
    mysqldump -u root -p groupesix > groupeSix.sql
    ```

-----

## 16\. 📝 Notas Finales

  * El **backend y el frontend** están pensados para ejecutarse juntos a través de **`http://localhost:3000`**.
  * No es necesario (ni recomendable) usar *Live Server* para servir el *frontend*.
  * El proyecto está orientado a fines educativos dentro del programa **Jóvenes a Programar (JAP) 2025**.

-----

## 🧑‍💻 17. Autores — Subgrupo 6 (Grupo 304, JaP 2025)

El desarrollo del proyecto se realizó de forma **colaborativa**, con rotación de tareas en cada entrega. Todos los integrantes participaron en diferentes áreas del diseño **UX/UI, frontend, backend** y **base de datos**.

---

### **Micaela Pérez** — GitHub: `micaela-perez304`

* **Roles principales:** Prototipado, UX/UI, desarrollo de frontend responsive, funcionalidades de frontend y funciones de backend (**middleware de autorización**).
* **Tecnologías usadas:** **Figma**, HTML, CSS, JavaScript, **Node.js, Express**, **Web Storage API** (`localStorage`), Postman.

### **Alfonso Alexandre** — GitHub: `alfualex`

* **Roles principales:** Prototipado, UX/UI, desarrollo de frontend responsive, funcionalidades de frontend y funciones de backend (**autenticación**).
* **Tecnologías usadas:** **Figma**, HTML, CSS, JavaScript, **Node.js, Express**, **JWT**, **Web Storage API** (`localStorage`), Postman.

### **Daiana Chambón** — GitHub: `Daiana-Chambon`

* **Roles principales:** Documentación, prototipado, UX/UI, desarrollo de frontend responsive, funcionalidades de frontend y **modelado de la base de datos** (MER).
* **Tecnologías usadas:** **Figma**, HTML, CSS, JavaScript, **Node.js, Express**, **Draw.io**, **Web Storage API** (`localStorage`), Postman.

### **Franco Márquez** — GitHub: `FrancooMarquez`

* **Roles principales:** Prototipado, UX/UI, desarrollo de frontend responsive, funcionalidades de frontend y **manejo de datos JSON en backend**.
* **Tecnologías usadas:** **Figma**, HTML, CSS, JavaScript, **Node.js, Express**, **JWT**, **Web Storage API** (`localStorage`), Postman.

### **Darwin Rodríguez** — GitHub: `darkkwing`

* **Roles principales:** Prototipado, UX/UI, desarrollo de frontend responsive, funcionalidades de frontend e **integración frontend/backend**.
* **Tecnologías usadas:** **Figma**, HTML, CSS, JavaScript, **Node.js, Express**, **JWT**, Postman, **MariaDB**.

---

> **NOTA:** Las responsabilidades fueron compartidas y cambiaron durante las distintas etapas del trabajo. Los roles principales no reflejan completamente todo el trabajo realizado por cada integrante. El proyecto es fruto del esfuerzo conjunto del subgrupo, orientado a fines educativos dentro del programa **Jóvenes a Programar (JAP) 2025**.

---

