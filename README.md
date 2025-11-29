GROUPE SIX - Proyecto Ecommerce JaP - 2025

1. REQUISITOS PREVIOS
    - Node.js 16+
    -MariaDB 10.11.6
    - Cliente SQL (HeidiSQL, Workbench, DBeaver, etc.)
    - Git (opcional)

2. ESTRUCTURA DEL PROYECTO
    workspace-grupo6-backend/
        ■■■ backend/ (servidor Express + API REST + conexión a MariaDB)
        ■■■ frontend/ (HTML, CSS, JS servido automáticamente por el backend)

backend/sql/groupeSix.sql → dump completo de la base de datos.

3. INSTALACIÓN
    Clonar el repositorio:
        git clone https://github.com/darkkwing/workspace-grupo6-backend.git

4. CONFIGURAR LA BASE DE DATOS
    4.1 Crear la base de datos
        Se puede crear la base 'groupesix' con HeidiSQL o por terminal.
            Por HeidiSQL:
                - Conectar como usuario root.
                - Crear una base de datos nueva llamada: groupesix.
            Por terminal:
                CREATE DATABASE groupesix;

    4.2 Importar el archivo SQL con HeidiSQL
        1- Abrir HeidiSQL.
        2- Conectar con el usuario root.
        3- Clic derecho sobre la base de datos 'groupesix' → “Importar archivo SQL”.
        4- Seleccionar backend/sql/groupeSix.sql.

5. IMPORTAR / EXPORTAR SQL POR TERMINAL (OPCIONAL)
    Para importar:
        mysql -u root -p groupesix < groupeSix.sql
    Para exportar:
        mysqldump -u root -p groupesix > groupeSix.sql

6. CONFIGURAR CONEXIÓN A MARIADB
    Editar el archivo:
        backend/config/db.js
    Asegurarse de que los datos coincidan con la instalación local:
        host: "localhost"
        user: "root"
        password: "1234" // contraseña usada en MariaDB
        database: "groupesix"
            Es importante que el nombre de la base de datos creada en MariaDB sea exactamente: groupesix.

7. INSTALAR DEPENDENCIAS DEL BACKEND
    Desde la carpeta backend:
        cd backend
        npm install
    Dependencias principales (ver backend/package.json):
        - cors
        - dotenv
        - express
        - jsonwebtoken
        - multer
        - mysql2

8. INICIAR EL BACKEND
    Desde la carpeta backend:
        cd backend
        npm start
    El servidor quedará disponible en: http://localhost:3000

9. ABRIR EL FRONTEND
    El backend sirve automáticamente la carpeta frontend.
        Para usar la aplicación, entrar en el navegador a:http://localhost:3000/

IMPORTANTE: No utilizar Live Server, ya que el frontend debe comunicarse con el backend Express en el mismo puerto.

10. FUNCIONALIDADES DEL FRONTEND
    El frontend está construido con HTML, CSS, JavaScript y Bootstrap5.
        Usa localStorage para almacenar:
            - token de autenticación
            - datos de usuario
            - carrito de compras
            - preferencias de tema (dark mode)
            - preferencias de moneda (USD/UYU)
    Principales características:
            - Catálogo de productos por categoría.
            - Búsqueda dinámica de productos.
            - Vista de producto con galería de imágenes.
            - Comentarios con estrellas.
            - Carrito de compras dinámico.
            - Checkout real con dirección, envío y método de pago.
            - Modo oscuro persistente.(La primera vez detectara el modo del sistema o navegador)
            - Cambio de moneda USD ↔ UYU.

11. MÓDULOS JS PRINCIPALES DEL FRONTEND
    frontend/js/index.js
        - Carga el carrusel principal en la página de inicio.
        - Solicita y muestra las categorías.
        - Integra el buscador dinámico.
        - Actualiza el badge del carrito (cantidad de ítems).
    frontend/js/products.js
        - Lista productos según la categoría seleccionada.
        - Permite ordenar productos (por precio, relevancia, etc.).
        - Aplica filtros por rango de precios.
        - Renderiza dinámicamente las cards de productos.
    frontend/js/product-info.js
        - Obtiene el ID del producto desde localStorage.
        - Carga los datos completos del producto desde el backend.
        - Muestra la galería de imágenes del producto.
        - Muestra información como: nombre, descripción, precio, vendidos.
        - Muestra productos relacionados.
        - Integra con el sistema de comentarios.
        - Permite agregar el producto al carrito.
    frontend/js/agrega_comentario.js
        - Permite enviar un nuevo comentario para el producto actual.
        - Valida que el usuario esté logueado (usa token en localStorage).
        - Envía la puntuación y el texto del comentario al backend.
        - Refresca la lista de comentarios tras agregar uno nuevo.
    frontend/js/cart.js
        - Lee el carrito desde localStorage (y eventualmente desde backend).
        - Renderiza los productos del carrito en cart.html.
        - Permite cambiar la cantidad de cada producto.
        - Permite eliminar productos del carrito.
        - Calcula:
            * Subtotal
            * Costo de envío (según tipo seleccionado: premium, express, standard)
            * Total final
        - Valida:
            * Dirección completa (departamento, localidad, calle, número, esquina)
            * Tipo de envío seleccionado
            * Método de pago seleccionado
        - Cuando todo es válido, llama a la función de checkout ubicada en checkoutFront.js.
    frontend/js/checkoutFront.js
        - Obtiene el estado actual del carrito.
        - Lee subtotal, envío y total mostrados en pantalla.
        - Recoge datos de:
            * dirección
            * tipo de envío
            * método de pago
        - Valida que toda la información requerida exista.
        - Envía una petición POST a /checkout en el backend.
        - Si el backend confirma la compra:
            * Limpia el carrito en localStorage.
        * Puede recargar la página o redirigir al inicio.
    frontend/js/currency.js
        - Mantiene un interruptor para cambiar entre USD y UYU.
        - Guarda la moneda seleccionada en localStorage.
        - Lanza un evento personalizado (por ejemplo, “currencyChange”) para que otros módulos recalculen precios.
        - Convierte dinámicamente los precios de productos y totales.
    frontend/js/darkmode.js
        - Alterna entre tema claro y oscuro.
        - Guarda la preferencia de tema en localStorage.
        - Aplica clases CSS específicas para modo oscuro.
    frontend/js/perfil_heder.js
        - Carga los datos del usuario logueado desde localStorage.
        - Muestra el nombre y la imagen de perfil en el header.
        - Actualiza el menú desplegable con información de la cuenta.
    frontend/js/Cerrar_sesión.js
        - Borra el token de autenticación y otros datos relevantes del usuario de localStorage.
        - Redirige a la página de login.
    frontend/js/init.js
        - Define constantes globales, como URLs base de la API.
        - Expone funciones de utilidad como getJSONData, usadas en distintas partes del frontend.
    Otros scripts (buscadores, responsive, etc.)
        - Implementan la búsqueda en desktop y móvil.
        - Muestran sugerencias al escribir.
        - Manejan menús y comportamientos responsive.

12. RUTAS PRINCIPALES DEL BACKEND (EXPANDIDO)
    AUTH
        POST /login
            - Recibe correo y contraseña.
            - Verifica usuario en la BD.
            - Devuelve token JWT con id_usuario.
            - Si falla: retorna error de credenciales.
    CATEGORIES
        GET /categories
            - Devuelve todas las categorías con id, nombre, descripción e imagen.
            - Usado en el home para renderizar el carrusel y cards.
    PRODUCTS
        GET /products/:catID
            - Lista todos los productos de una categoría.
            - Respuesta incluye: nombre, precio, moneda, vendidos, imagen.
        GET /products/item/:id
            - Devuelve información completa de un producto.
            - Incluye: datos principales + galería de imágenes.
        GET /products/related/:id
            - Retorna IDs y detalles de productos relacionados.
    COMMENTS
        GET /comments/:productID
            - Lista todos los comentarios de un producto.
            - Enviados por usuarios reales o preexistentes del dataset.
        POST /comments
            - Requiere token.
            - Guarda un comentario con:
                * id_producto
                * id_usuario (desde token)
                * puntuación
                * texto
                * fecha del servidor
    CART
        GET /cart
            - Obtiene el carrito del usuario autenticado.
            - Respuesta contiene:
                * id_producto
                * nombre
                * imagen
                * moneda
                * costo
                * cantidad
                * subtotal
        POST /cart/sync
            - Reemplaza el carrito del backend con el enviado desde frontend.
            - Se ejecuta cada vez que el usuario modifica cantidades o elimina productos.
    CHECKOUT
        POST /checkout
            - Requiere token.
            - Guarda una orden completa:
                * subtotal
                * costo_envio
                * total
                * moneda
                * tipo de envío (premium, express, standard)
                * dirección (se inserta en tabla ‘direccion’)
                * items (tabla ‘orden_items’)
                * método de pago (tabla ‘pago’)
            - Devuelve success si todo fue correctamente insertado.

13. ERRORES COMUNES
    ECONNREFUSED:
        - Sucede cuando MariaDB no está iniciado o no está escuchando en el puerto correcto.
    Access denied:
        - Ocurre cuando la contraseña o el usuario en db.js no coinciden con los de MariaDB.
    Cannot find module:
        - Generalmente indica que faltan dependencias.
        - Solución: ejecutar npm install dentro de la carpeta backend.

14. USO DE MARIADB DESDE TERMINAL
    Para abrir MariaDB desde la terminal:
        mysql -u root -p
    Luego ingresar la contraseña configurada.
    Para salir:
        exit;

15. IMPORTAR / EXPORTAR SQL DESDE TERMINAL
    Importar dump:
        mysql -u root -p groupesix < groupeSix.sql
    Exportar dump:
        mysqldump -u root -p groupesix > groupeSix.sql

16. NOTAS FINALES
    - El backend y el frontend están pensados para ejecutarse juntos a través de http://localhost:3000.
    - No es necesario (ni recomendable) usar Live Server para servir el frontend.
    - El proyecto está orientado a fines educativos dentro del programa Jóvenes a Programar (JAP) 2025.

17. AUTORES — Subgrupo 6 (Grupo 304, JaP 2025)

El desarrollo del proyecto se realizó de forma colaborativa, con rotación de tareas en cada entrega.
Todos los integrantes participaron en diferentes áreas del diseño UX/UI, frontend, backend y base de datos.

Micaela Pérez – GitHub: micaela-perez304

Alfonso Alexandre – GitHub: alfualex

Daiana Chambón – GitHub: Daiana-Chambon

Franco Márquez – GitHub: FrancooMarquez

Darwin Rodríguez – GitHub: darkkwing

NOTA: 
Las responsabilidades fueron compartidas y cambiaron durante las distintas etapas del trabajo.
El proyecto es fruto del esfuerzo conjunto del subgrupo.