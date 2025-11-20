
-- Creación de tablas para el proyecto eMercado

-- Tabla de Categorías
CREATE TABLE categoria (
    id_categoria INT PRIMARY KEY,
    nombre VARCHAR(100),
    descripcion TEXT,
    img_src VARCHAR(255)
);

-- Tabla de Productos
CREATE TABLE producto (
    id_producto INT PRIMARY KEY,
    nombre VARCHAR(100),
    descripcion TEXT,
    precio DECIMAL(10, 2),
    moneda VARCHAR(3),
    vendidos INT,
    imagen VARCHAR(255),
    id_categoria INT,
    FOREIGN KEY (id_categoria) REFERENCES categoria(id_categoria)
);

-- Tabla de Usuarios
CREATE TABLE usuario (
    id_usuario INT PRIMARY KEY,
    nombre VARCHAR(100),
    apellido VARCHAR(100),
    correo VARCHAR(100) UNIQUE,
    contraseña_hash VARCHAR(255),
    telefono VARCHAR(20),
    es_vendedor BOOLEAN
);

-- Tabla de Comentarios / Reseñas
CREATE TABLE comentario (
    id_comentario INT PRIMARY KEY AUTO_INCREMENT,
    id_producto INT,
    id_usuario INT,
    puntuacion INT CHECK (puntuacion BETWEEN 1 AND 5),
    texto TEXT,
    fecha DATETIME,
    FOREIGN KEY (id_producto) REFERENCES producto(id_producto),
    FOREIGN KEY (id_usuario) REFERENCES usuario(id_usuario)
);

-- Tabla de Tipo de Envío
CREATE TABLE tipo_envio (
    id_envio INT PRIMARY KEY,
    nombre VARCHAR(50),
    descripcion TEXT,
    porcentaje_costo DECIMAL(5, 2)
);

-- Tabla de Dirección
CREATE TABLE direccion (
    id_direccion INT PRIMARY KEY,
    id_usuario INT,
    departamento VARCHAR(50),
    localidad VARCHAR(50),
    calle VARCHAR(100),
    numero VARCHAR(10),
    esquina VARCHAR(100),
    FOREIGN KEY (id_usuario) REFERENCES usuario(id_usuario)
);

-- Tabla de Órdenes
CREATE TABLE orden (
    id_orden INT PRIMARY KEY,
    id_usuario INT,
    fecha DATETIME,
    subtotal DECIMAL(10, 2),
    costo_envio DECIMAL(10, 2),
    total DECIMAL(10, 2),
    moneda VARCHAR(3),
    id_envio INT,
    id_direccion INT,
    estado VARCHAR(50),
    FOREIGN KEY (id_usuario) REFERENCES usuario(id_usuario),
    FOREIGN KEY (id_envio) REFERENCES tipo_envio(id_envio),
    FOREIGN KEY (id_direccion) REFERENCES direccion(id_direccion)
);

-- Tabla de Detalle de Órdenes
CREATE TABLE orden_items (
    id_item INT PRIMARY KEY AUTO_INCREMENT,
    id_orden INT,
    id_producto INT,
    cantidad INT,
    precio_unitario DECIMAL(10, 2),
    FOREIGN KEY (id_orden) REFERENCES orden(id_orden),
    FOREIGN KEY (id_producto) REFERENCES producto(id_producto)
);

-- Tabla de Pagos
CREATE TABLE pago (
    id_pago INT PRIMARY KEY,
    id_orden INT,
    metodo VARCHAR(50),
    detalles TEXT,
    FOREIGN KEY (id_orden) REFERENCES orden(id_orden)
);
