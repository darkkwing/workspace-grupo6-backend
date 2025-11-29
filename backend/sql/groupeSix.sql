-- --------------------------------------------------------
-- Host:                         127.0.0.1
-- Versión del servidor:         10.11.6-MariaDB - mariadb.org binary distribution
-- SO del servidor:              Win64
-- HeidiSQL Versión:             12.3.0.6589
-- --------------------------------------------------------

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET NAMES utf8 */;
/*!50503 SET NAMES utf8mb4 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;


-- Volcando estructura de base de datos para groupesix
CREATE DATABASE IF NOT EXISTS `groupesix` /*!40100 DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci */;
USE `groupesix`;

-- Volcando estructura para tabla groupesix.categoria
CREATE TABLE IF NOT EXISTS `categoria` (
  `id_categoria` int(11) NOT NULL,
  `nombre` varchar(100) DEFAULT NULL,
  `descripcion` text DEFAULT NULL,
  `img_src` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`id_categoria`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- Volcando datos para la tabla groupesix.categoria: ~9 rows (aproximadamente)
INSERT INTO `categoria` (`id_categoria`, `nombre`, `descripcion`, `img_src`) VALUES
	(101, 'Autos', 'Los mejores precios en autos 0 kilómetro, de alta y media gama.', 'img/cat101_1.jpg'),
	(102, 'Juguetes', 'Encuentra aquí los mejores precios para niños/as de cualquier edad.', 'img/cat102_1.jpg'),
	(103, 'Muebles', 'Muebles antiguos, nuevos y para ser armados por uno mismo.', 'img/cat103_1.jpg'),
	(104, 'Herramientas', 'Herramientas para cualquier tipo de trabajo.', 'img/cat104_1.jpg'),
	(105, 'Computadoras', 'Todo en cuanto a computadoras, para uso de oficina y/o juegos.', 'img/cat105_1.jpg'),
	(106, 'Vestimenta', 'Gran variedad de ropa, nueva y de segunda mano.', 'img/cat106_1.jpg'),
	(107, 'Electrodomésticos', 'Todos los electrodomésticos modernos y de bajo consumo.', 'img/cat107_1.jpg'),
	(108, 'Deporte', 'Toda la variedad de indumentaria para todo tipo de deporte.', 'img/cat108_1.jpg'),
	(109, 'Celulares', 'Celulares de todo tipo para cubrir todas las necesidades.', 'img/cat109_1.jpg');

-- Volcando estructura para tabla groupesix.comentario
CREATE TABLE IF NOT EXISTS `comentario` (
  `id_comentario` int(11) NOT NULL AUTO_INCREMENT,
  `id_producto` int(11) DEFAULT NULL,
  `id_usuario` int(11) DEFAULT NULL,
  `puntuacion` int(11) DEFAULT NULL CHECK (`puntuacion` between 1 and 5),
  `texto` text DEFAULT NULL,
  `fecha` datetime DEFAULT NULL,
  PRIMARY KEY (`id_comentario`),
  KEY `id_producto` (`id_producto`),
  KEY `id_usuario` (`id_usuario`),
  CONSTRAINT `comentario_ibfk_1` FOREIGN KEY (`id_producto`) REFERENCES `producto` (`id_producto`),
  CONSTRAINT `comentario_ibfk_2` FOREIGN KEY (`id_usuario`) REFERENCES `usuario` (`id_usuario`)
) ENGINE=InnoDB AUTO_INCREMENT=37 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- Volcando datos para la tabla groupesix.comentario: ~36 rows (aproximadamente)
INSERT INTO `comentario` (`id_comentario`, `id_producto`, `id_usuario`, `puntuacion`, `texto`, `fecha`) VALUES
	(1, 50741, 3, 5, 'Precioso, a mi nena le encantó', '2021-02-20 14:00:42'),
	(2, 50741, 4, 4, 'Esperaba que fuera más grande, pero es muy lindo.', '2021-01-11 16:26:10'),
	(3, 50741, 5, 5, 'Hermoso el oso. Quedamos encantados, lo recomiendo.', '2020-12-16 19:55:19'),
	(4, 50741, 6, 1, 'Se lo regalé a mi novia para que me perdone, pero no funcionó', '2020-02-14 23:19:09'),
	(5, 50742, 7, 5, 'Perfecta. La que me recomendó el entrenador', '2022-05-21 23:10:41'),
	(6, 50742, 8, 4, 'Es lo que esperaba. Ahora a entrenar mucho!', '2021-10-30 06:33:53'),
	(7, 50742, 9, 5, 'Muy buena calidad.', '2020-11-02 09:28:45'),
	(8, 50742, 10, 5, 'Excelente. Para rememorar viejos tiempos y volver a sentirse un campeón.', '2019-11-09 21:15:29'),
	(9, 50743, 11, 5, 'Un lujo. Se la compré a mis hijos, pero creo que me la quedo yo.', '2022-04-18 13:20:56'),
	(10, 50743, 12, 5, 'Increibles los gráficos que tiene.', '2022-04-05 11:20:09'),
	(11, 50743, 13, 5, 'IM PRE SIO NAN TE.', '2022-03-21 22:38:39'),
	(12, 50743, 14, 5, 'Me cuesta creer lo que han avanzado las consolas', '2022-01-04 11:16:48'),
	(13, 50744, 15, 5, 'Compra de último momento para la navidad. A mi nieto le gustó.', '2021-12-24 23:59:59'),
	(14, 50744, 16, 2, 'Les pedí azul y me mandaron verde. La bicicleta es buena', '2021-09-15 01:27:19'),
	(15, 50744, 17, 3, 'Es buena, pero le faltaron las rueditas.', '2021-03-24 20:11:19'),
	(16, 50744, 18, 4, 'Perfecta para que mis hijos vayan empezando a practicar.', '2021-01-18 05:22:50'),
	(17, 50921, 19, 3, 'Ya llevo un año con este auto y la verdad que tiene sus ventajas y desventajas', '2020-02-25 18:03:52'),
	(18, 50921, 20, 5, 'Es un auto muy cómodo y en relación precio/calidad vale la pena!', '2020-01-17 13:42:18'),
	(19, 50921, 21, 4, 'Casi todo bien!, excepto por algún detalle de gusto personal', '2020-03-14 09:05:13'),
	(20, 50921, 22, 5, 'Un espectáculo el auto!', '2020-02-21 15:05:22'),
	(21, 50922, 23, 3, 'Es un buen auto, pero el precio me pareció algo elevado', '2022-04-05 15:29:40'),
	(22, 50922, 24, 5, 'Muy buen auto, vale cada centavo', '2021-11-15 19:32:10'),
	(23, 50922, 25, 5, 'Me gusta como se comporta en tierra y pista', '2020-02-21 15:05:22'),
	(24, 50923, 26, 5, 'Gran opción. Bueno, bonito y barato', '2022-02-15 20:19:20'),
	(25, 50923, 27, 4, 'No había el color que yo quería, pero lo demás está perfecto.', '2021-05-24 19:25:43'),
	(26, 50923, 28, 5, 'Lo que busco cuando no compito', '2020-12-03 14:15:33'),
	(27, 50924, 29, 5, 'Espectacular. Sport con potencia y confort.', '2022-06-24 20:19:20'),
	(28, 60801, 30, 3, 'Es algo chico, pero está bien para una familia pequeña.', '2021-12-02 11:23:32'),
	(29, 60802, 31, 4, 'Muy cómodo. Ideal para las siestas', '2022-03-29 09:15:01'),
	(30, 60802, 32, 5, 'Lo compré para ver los partidos con mis amigos. Valió la pena.', '2021-08-09 22:05:12'),
	(31, 60803, 33, 5, 'Es grande. Entra más de lo que parece', '2022-11-21 03:33:41'),
	(32, 50741, 1, 5, 'me da plata, alto producto', '2025-11-27 18:36:21'),
	(33, 50741, 1, 5, 'me da plata, alto producto', '2025-11-27 18:36:29'),
	(34, 50741, 1, 5, 'patota', '2025-11-27 19:00:37'),
	(35, 50921, 1, 4, 'aaaaa', '2025-11-28 13:20:01'),
	(36, 60807, 1, 5, 'Como da plata este producto', '2025-11-28 13:45:30');

-- Volcando estructura para tabla groupesix.direccion
CREATE TABLE IF NOT EXISTS `direccion` (
  `id_direccion` int(11) NOT NULL AUTO_INCREMENT,
  `id_usuario` int(11) DEFAULT NULL,
  `departamento` varchar(50) DEFAULT NULL,
  `localidad` varchar(50) DEFAULT NULL,
  `calle` varchar(100) DEFAULT NULL,
  `numero` varchar(10) DEFAULT NULL,
  `esquina` varchar(100) DEFAULT NULL,
  PRIMARY KEY (`id_direccion`),
  KEY `id_usuario` (`id_usuario`),
  CONSTRAINT `direccion_ibfk_1` FOREIGN KEY (`id_usuario`) REFERENCES `usuario` (`id_usuario`)
) ENGINE=InnoDB AUTO_INCREMENT=14 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- Volcando datos para la tabla groupesix.direccion: ~10 rows (aproximadamente)
INSERT INTO `direccion` (`id_direccion`, `id_usuario`, `departamento`, `localidad`, `calle`, `numero`, `esquina`) VALUES
	(4, 2, 'aaaa', 'aaaa', 'aaa', '123456', 'aaaaa'),
	(5, 2, 'aaaa', 'aaa', 'aaaa ', '12344', '1234'),
	(6, 2, 'aaaaa', 'aaaaa', 'aaa', '1234', '12w'),
	(7, 2, 'aaaa', 'aaaaa', 'aaaa', '12344', 'aaaa'),
	(8, 2, 'aaa', 'aaaa', 'aaaa', '1111', 'aaaaa'),
	(9, 2, 'aa', 'aaa', '123', '1231', '44324234'),
	(10, 2, 'ggg', 'gggg', '1111', '1111', 'gggg'),
	(11, 2, 'kok', 'lol', 'pop', '000', 'jiji'),
	(12, 2, 'aaa', '2123', '31', '31231', '1'),
	(13, 2, 'tac', 'tac', 'tac', '1234', 'taccc');

-- Volcando estructura para tabla groupesix.orden
CREATE TABLE IF NOT EXISTS `orden` (
  `id_orden` int(11) NOT NULL AUTO_INCREMENT,
  `id_usuario` int(11) DEFAULT NULL,
  `fecha` datetime DEFAULT NULL,
  `subtotal` decimal(10,2) DEFAULT NULL,
  `costo_envio` decimal(10,2) DEFAULT NULL,
  `total` decimal(10,2) DEFAULT NULL,
  `moneda` varchar(3) DEFAULT NULL,
  `id_envio` int(11) DEFAULT NULL,
  `id_direccion` int(11) DEFAULT NULL,
  `estado` varchar(50) DEFAULT NULL,
  PRIMARY KEY (`id_orden`),
  KEY `id_usuario` (`id_usuario`),
  KEY `id_envio` (`id_envio`),
  KEY `id_direccion` (`id_direccion`),
  CONSTRAINT `orden_ibfk_1` FOREIGN KEY (`id_usuario`) REFERENCES `usuario` (`id_usuario`),
  CONSTRAINT `orden_ibfk_2` FOREIGN KEY (`id_envio`) REFERENCES `tipo_envio` (`id_envio`),
  CONSTRAINT `orden_ibfk_3` FOREIGN KEY (`id_direccion`) REFERENCES `direccion` (`id_direccion`)
) ENGINE=InnoDB AUTO_INCREMENT=12 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- Volcando datos para la tabla groupesix.orden: ~10 rows (aproximadamente)
INSERT INTO `orden` (`id_orden`, `id_usuario`, `fecha`, `subtotal`, `costo_envio`, `total`, `moneda`, `id_envio`, `id_direccion`, `estado`) VALUES
	(2, 2, '2025-11-28 18:34:44', 2259.00, 338.85, 2597.85, 'USD', 1, 4, 'pendiente'),
	(3, 2, '2025-11-28 18:40:43', 2400.00, 120.00, 2520.00, 'UYU', 3, 5, 'pendiente'),
	(4, 2, '2025-11-28 20:45:46', 13500.00, 2025.00, 15525.00, 'USD', 1, 6, 'pendiente'),
	(5, 2, '2025-11-28 20:49:19', 15200.00, 2280.00, 17480.00, 'USD', 1, 7, 'pendiente'),
	(6, 2, '2025-11-28 21:07:11', 60.00, 4.20, 64.20, 'USD', 2, 8, 'pendiente'),
	(7, 2, '2025-11-28 21:13:57', 60.00, 9.00, 69.00, 'USD', 1, 9, 'pendiente'),
	(8, 2, '2025-11-28 21:16:46', 24000.00, 3600.00, 27600.00, 'UYU', 1, 10, 'pendiente'),
	(9, 2, '2025-11-28 21:18:57', 74.97, 11.25, 86.22, 'USD', 1, 11, 'pendiente'),
	(10, 2, '2025-11-28 21:29:40', 12500.00, 1875.00, 14375.00, 'USD', 1, 12, 'pendiente'),
	(11, 2, '2025-11-28 21:46:46', 8000.00, 1200.00, 9200.00, 'UYU', 1, 13, 'pendiente');

-- Volcando estructura para tabla groupesix.orden_items
CREATE TABLE IF NOT EXISTS `orden_items` (
  `id_item` int(11) NOT NULL AUTO_INCREMENT,
  `id_orden` int(11) DEFAULT NULL,
  `id_producto` int(11) DEFAULT NULL,
  `cantidad` int(11) DEFAULT NULL,
  `precio_unitario` decimal(10,2) DEFAULT NULL,
  PRIMARY KEY (`id_item`),
  KEY `id_orden` (`id_orden`),
  KEY `id_producto` (`id_producto`),
  CONSTRAINT `orden_items_ibfk_1` FOREIGN KEY (`id_orden`) REFERENCES `orden` (`id_orden`),
  CONSTRAINT `orden_items_ibfk_2` FOREIGN KEY (`id_producto`) REFERENCES `producto` (`id_producto`)
) ENGINE=InnoDB AUTO_INCREMENT=11 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- Volcando datos para la tabla groupesix.orden_items: ~10 rows (aproximadamente)
INSERT INTO `orden_items` (`id_item`, `id_orden`, `id_producto`, `cantidad`, `precio_unitario`) VALUES
	(1, 2, NULL, 1, 2259.00),
	(2, 3, NULL, 1, 2400.00),
	(3, 4, NULL, 1, 13500.00),
	(4, 5, NULL, 1, 15200.00),
	(5, 6, NULL, 1, 2400.00),
	(6, 7, NULL, 1, 2400.00),
	(7, 8, NULL, 1, 24000.00),
	(8, 9, NULL, 1, 2999.00),
	(9, 10, NULL, 1, 12500.00),
	(10, 11, NULL, 1, 8000.00);

-- Volcando estructura para tabla groupesix.pago
CREATE TABLE IF NOT EXISTS `pago` (
  `id_pago` int(11) NOT NULL AUTO_INCREMENT,
  `id_orden` int(11) DEFAULT NULL,
  `metodo` varchar(50) DEFAULT NULL,
  `detalles` text DEFAULT NULL,
  PRIMARY KEY (`id_pago`),
  KEY `id_orden` (`id_orden`),
  CONSTRAINT `pago_ibfk_1` FOREIGN KEY (`id_orden`) REFERENCES `orden` (`id_orden`)
) ENGINE=InnoDB AUTO_INCREMENT=11 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- Volcando datos para la tabla groupesix.pago: ~10 rows (aproximadamente)
INSERT INTO `pago` (`id_pago`, `id_orden`, `metodo`, `detalles`) VALUES
	(1, 2, 'transfer', '{}'),
	(2, 3, 'transfer', '{}'),
	(3, 4, 'transfer', '{}'),
	(4, 5, 'credit', '{}'),
	(5, 6, 'credit', '{}'),
	(6, 7, 'credit', '{}'),
	(7, 8, 'transfer', '{}'),
	(8, 9, 'transfer', '{}'),
	(9, 10, 'transfer', '{}'),
	(10, 11, 'transfer', '{}');

-- Volcando estructura para tabla groupesix.producto
CREATE TABLE IF NOT EXISTS `producto` (
  `id_producto` int(11) NOT NULL AUTO_INCREMENT,
  `nombre` varchar(100) DEFAULT NULL,
  `descripcion` text DEFAULT NULL,
  `precio` decimal(10,2) DEFAULT NULL,
  `moneda` varchar(3) DEFAULT NULL,
  `vendidos` int(11) DEFAULT NULL,
  `imagen` varchar(255) DEFAULT NULL,
  `id_categoria` int(11) DEFAULT NULL,
  PRIMARY KEY (`id_producto`),
  KEY `id_categoria` (`id_categoria`),
  CONSTRAINT `producto_ibfk_1` FOREIGN KEY (`id_categoria`) REFERENCES `categoria` (`id_categoria`)
) ENGINE=InnoDB AUTO_INCREMENT=60809 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- Volcando datos para la tabla groupesix.producto: ~16 rows (aproximadamente)
INSERT INTO `producto` (`id_producto`, `nombre`, `descripcion`, `precio`, `moneda`, `vendidos`, `imagen`, `id_categoria`) VALUES
	(40281, 'Computadora de escritorio', 'Computadora de escritorio. Potencia y rendimiento, para juegos o trabajo', 2599.00, 'USD', 11, 'img/prod40281_1.jpg', 105),
	(50741, 'Oso de peluche', 'Oso de peluche gigante, con el bebé. Resistente y lavable. Tus hijos los amarán', 2400.00, 'UYU', 97, 'img/prod50741_1.jpg', 102),
	(50742, 'Pelota de básquetbol', 'Balón de baloncesto profesional, para interiores, tamaño 5, 27.5 pulgadas. Oficial de la NBA', 2999.00, 'UYU', 11, 'img/prod50742_1.jpg', 102),
	(50743, 'PlayStation 5', 'Maravíllate con increíbles gráficos y disfruta de nuevas funciones de PS5. Con E/S integrada.', 59999.00, 'UYU', 16, 'img/prod50743_1.jpg', 102),
	(50744, 'Bicicleta', '¡La mejor BMX pequeña del mercado! Frenos traseros y cuadro duradero de acero Hi-Ten.', 10999.00, 'UYU', 8, 'img/prod50744_1.jpg', 102),
	(50921, 'Chevrolet Onix Joy', 'Generación 2019, variedad de colores. Motor 1.0, ideal para ciudad.', 13500.00, 'USD', 14, 'img/prod50921_1.jpg', 101),
	(50922, 'Fiat Way', 'La versión de Fiat que brinda confort y a un precio accesible.', 14500.00, 'USD', 52, 'img/prod50922_1.jpg', 101),
	(50923, 'Suzuki Celerio', 'Un auto que se ha ganado la buena fama por su economía con el combustible.', 12500.00, 'USD', 25, 'img/prod50923_1.jpg', 101),
	(50924, 'Peugeot 208', 'El modelo de auto que se sigue renovando y manteniendo su prestigio en comodidad.', 15200.00, 'USD', 17, 'img/prod50924_1.jpg', 101),
	(50925, 'Bugatti Chiron', 'El mejor hiperdeportivo de mundo. Producción limitada a 500 unidades.', 3500000.00, 'USD', 0, 'img/prod50925_1.jpg', 101),
	(60801, 'Juego de comedor', 'Un conjunto sencillo y sólido, ideal para zonas de comedor pequeñas, hecho en madera maciza de pino', 4000.00, 'UYU', 88, 'img/prod60801_1.jpg', 103),
	(60802, 'Sofá', 'Cómodo sofá de tres cuerpos, con chaiselongue intercambiable. Ideal para las siestas', 24000.00, 'UYU', 12, 'img/prod60802_1.jpg', 103),
	(60803, 'Armario', 'Diseño clásico con puertas con forma de panel. Espejo de cuerpo entero para ver cómo te queda la ropa', 8000.00, 'UYU', 24, 'img/prod60803_1.jpg', 103),
	(60804, 'Mesa de centro', 'Añade más funciones a tu sala de estar, ya que te permite cambiar fácilmente de actividad.', 10000.00, 'UYU', 37, 'img/prod60804_1.jpg', 103),
	(60807, 'iPhone 17 Pro Max 256GB', 'El iPhone 17 Pro Max redefine lo que un smartphone puede hacer, combinando un diseño unibody de aluminio forjado con el chip A19 Pro para un rendimiento sin precedentes.', 2259.00, 'USD', 0, '/img/uploads/1764346247781.webp', 109),
	(60808, 'Atornillador Milwaukee 18v', 'El taladro atornillador Milwaukee 18V es una herramienta inalámbrica y compacta con motor brushless, que ofrece hasta 56 Nm de torque y 1800 RPM de velocidad máxima.', 595.00, 'USD', 0, '/img/uploads/1764349534603.webp', 104);

-- Volcando estructura para tabla groupesix.producto_imagen
CREATE TABLE IF NOT EXISTS `producto_imagen` (
  `id_imagen` int(11) NOT NULL AUTO_INCREMENT,
  `id_producto` int(11) NOT NULL,
  `url` varchar(255) NOT NULL,
  PRIMARY KEY (`id_imagen`),
  KEY `id_producto` (`id_producto`),
  CONSTRAINT `producto_imagen_ibfk_1` FOREIGN KEY (`id_producto`) REFERENCES `producto` (`id_producto`)
) ENGINE=InnoDB AUTO_INCREMENT=63 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- Volcando datos para la tabla groupesix.producto_imagen: ~62 rows (aproximadamente)
INSERT INTO `producto_imagen` (`id_imagen`, `id_producto`, `url`) VALUES
	(1, 40281, 'img/prod40281_1.jpg'),
	(2, 40281, 'img/prod40281_2.jpg'),
	(3, 40281, 'img/prod40281_3.jpg'),
	(4, 40281, 'img/prod40281_4.jpg'),
	(5, 50741, 'img/prod50741_1.jpg'),
	(6, 50741, 'img/prod50741_2.jpg'),
	(7, 50741, 'img/prod50741_3.jpg'),
	(8, 50741, 'img/prod50741_4.jpg'),
	(9, 50742, 'img/prod50742_1.jpg'),
	(10, 50742, 'img/prod50742_2.jpg'),
	(11, 50742, 'img/prod50742_3.jpg'),
	(12, 50742, 'img/prod50742_4.jpg'),
	(13, 50743, 'img/prod50743_1.jpg'),
	(14, 50743, 'img/prod50743_2.jpg'),
	(15, 50743, 'img/prod50743_3.jpg'),
	(16, 50743, 'img/prod50743_4.jpg'),
	(17, 50744, 'img/prod50744_1.jpg'),
	(18, 50744, 'img/prod50744_2.jpg'),
	(19, 50744, 'img/prod50744_3.jpg'),
	(20, 50744, 'img/prod50744_4.jpg'),
	(21, 50921, 'img/prod50921_1.jpg'),
	(22, 50921, 'img/prod50921_2.jpg'),
	(23, 50921, 'img/prod50921_3.jpg'),
	(24, 50921, 'img/prod50921_4.jpg'),
	(25, 50922, 'img/prod50922_1.jpg'),
	(26, 50922, 'img/prod50922_2.jpg'),
	(27, 50922, 'img/prod50922_3.jpg'),
	(28, 50922, 'img/prod50922_4.jpg'),
	(29, 50923, 'img/prod50923_1.jpg'),
	(30, 50923, 'img/prod50923_2.jpg'),
	(31, 50923, 'img/prod50923_3.jpg'),
	(32, 50923, 'img/prod50923_4.jpg'),
	(33, 50924, 'img/prod50924_1.jpg'),
	(34, 50924, 'img/prod50924_2.jpg'),
	(35, 50924, 'img/prod50924_3.jpg'),
	(36, 50924, 'img/prod50924_4.jpg'),
	(37, 50925, 'img/prod50925_1.jpg'),
	(38, 50925, 'img/prod50925_2.jpg'),
	(39, 50925, 'img/prod50925_3.jpg'),
	(40, 50925, 'img/prod50925_4.jpg'),
	(41, 60801, 'img/prod60801_1.jpg'),
	(42, 60801, 'img/prod60801_2.jpg'),
	(43, 60801, 'img/prod60801_3.jpg'),
	(44, 60801, 'img/prod60801_4.jpg'),
	(45, 60802, 'img/prod60802_1.jpg'),
	(46, 60802, 'img/prod60802_2.jpg'),
	(47, 60802, 'img/prod60802_3.jpg'),
	(48, 60802, 'img/prod60802_4.jpg'),
	(49, 60803, 'img/prod60803_1.jpg'),
	(50, 60803, 'img/prod60803_2.jpg'),
	(51, 60803, 'img/prod60803_3.jpg'),
	(52, 60803, 'img/prod60803_4.jpg'),
	(53, 60804, 'img/prod60804_1.jpg'),
	(54, 60804, 'img/prod60804_2.jpg'),
	(55, 60804, 'img/prod60804_3.jpg'),
	(56, 60804, 'img/prod60804_4.jpg'),
	(57, 60807, '/img/uploads/1764346247783.webp'),
	(58, 60807, '/img/uploads/1764346247820.webp'),
	(59, 60807, '/img/uploads/1764346247819.webp'),
	(60, 60808, '/img/uploads/1764349534602.webp'),
	(61, 60808, '/img/uploads/1764349534617.webp'),
	(62, 60808, '/img/uploads/1764349534618.webp');

-- Volcando estructura para tabla groupesix.producto_relacionado
CREATE TABLE IF NOT EXISTS `producto_relacionado` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `id_producto` int(11) DEFAULT NULL,
  `id_relacionado` int(11) DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `id_producto` (`id_producto`),
  KEY `id_relacionado` (`id_relacionado`),
  CONSTRAINT `producto_relacionado_ibfk_1` FOREIGN KEY (`id_producto`) REFERENCES `producto` (`id_producto`),
  CONSTRAINT `producto_relacionado_ibfk_2` FOREIGN KEY (`id_relacionado`) REFERENCES `producto` (`id_producto`)
) ENGINE=InnoDB AUTO_INCREMENT=29 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- Volcando datos para la tabla groupesix.producto_relacionado: ~28 rows (aproximadamente)
INSERT INTO `producto_relacionado` (`id`, `id_producto`, `id_relacionado`) VALUES
	(1, 40281, 50743),
	(2, 40281, 50744),
	(3, 50741, 50742),
	(4, 50741, 50744),
	(5, 50742, 50741),
	(6, 50742, 50743),
	(7, 50743, 50742),
	(8, 50743, 50744),
	(9, 50744, 50741),
	(10, 50744, 50743),
	(11, 50921, 50924),
	(12, 50921, 50922),
	(13, 50922, 50921),
	(14, 50922, 50923),
	(15, 50923, 50924),
	(16, 50923, 50922),
	(17, 50924, 50921),
	(18, 50924, 50923),
	(19, 50925, 50924),
	(20, 50925, 50921),
	(21, 60801, 60802),
	(22, 60801, 60804),
	(23, 60802, 60801),
	(24, 60802, 60803),
	(25, 60803, 60802),
	(26, 60803, 60804),
	(27, 60804, 60801),
	(28, 60804, 60803);

-- Volcando estructura para tabla groupesix.tipo_envio
CREATE TABLE IF NOT EXISTS `tipo_envio` (
  `id_envio` int(11) NOT NULL,
  `nombre` varchar(50) DEFAULT NULL,
  `descripcion` text DEFAULT NULL,
  `porcentaje_costo` decimal(5,2) DEFAULT NULL,
  PRIMARY KEY (`id_envio`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- Volcando datos para la tabla groupesix.tipo_envio: ~3 rows (aproximadamente)
INSERT INTO `tipo_envio` (`id_envio`, `nombre`, `descripcion`, `porcentaje_costo`) VALUES
	(1, 'premium', 'Envío prioritario 2 a 5 días', 15.00),
	(2, 'express', 'Equilibrio costo/velocidad 5 a 8 días', 7.00),
	(3, 'standard', 'Envío económico 12 a 17 días', 5.00);

-- Volcando estructura para tabla groupesix.usuario
CREATE TABLE IF NOT EXISTS `usuario` (
  `id_usuario` int(11) NOT NULL AUTO_INCREMENT,
  `nombre` varchar(100) DEFAULT NULL,
  `apellido` varchar(100) DEFAULT NULL,
  `correo` varchar(100) DEFAULT NULL,
  `contraseña_hash` varchar(255) DEFAULT NULL,
  `telefono` varchar(20) DEFAULT NULL,
  `es_vendedor` tinyint(1) DEFAULT NULL,
  `imagen_perfil` longtext DEFAULT NULL,
  PRIMARY KEY (`id_usuario`),
  UNIQUE KEY `correo` (`correo`)
) ENGINE=InnoDB AUTO_INCREMENT=34 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- Volcando datos para la tabla groupesix.usuario: ~33 rows (aproximadamente)
INSERT INTO `usuario` (`id_usuario`, `nombre`, `apellido`, `correo`, `contraseña_hash`, `telefono`, `es_vendedor`, `imagen_perfil`) VALUES
	(1, 'Groupe', 'Six', 'groupe-six@gmail.com', '123456', '099000001', 1, NULL),
	(2, 'Super', 'User', 'user@gmail.com', 'user', '099000002', 0, NULL),
	(3, 'Silvia', 'Fagundez', 'silvia_fagundez@gmail.com', 'silvia123', '099111001', 0, NULL),
	(4, 'Majo', 'Sanchez', 'majo_sanchez@gmail.com', 'majo123', '099111002', 0, NULL),
	(5, 'Raul', 'Añez', 'raul_anez@gmail.com', 'raul123', '099111003', 0, NULL),
	(6, 'Flynn', 'Rider', 'flynn_rider@gmail.com', 'flynn123', '099111004', 0, NULL),
	(7, 'Karen', 'Gonzalez', 'karen_gonzalez@gmail.com', 'karen123', '099111005', 0, NULL),
	(8, 'Luis', 'Salgueiro', 'luis_salgueiro@gmail.com', 'luis123', '099111006', 0, NULL),
	(9, 'Carlos', 'Diaz', 'carlos_diaz@gmail.com', 'carlos123', '099111007', 0, NULL),
	(10, 'Scottie', 'Pippen', 'scottie_pippen@gmail.com', 'pippen33', '099111008', 0, NULL),
	(11, 'Saul', 'Dominguez', 'saul_dominguez@gmail.com', 'saul123', '099111009', 0, NULL),
	(12, 'Lucia', 'Ralek', 'lucia_ralek@gmail.com', 'lucia123', '099111010', 0, NULL),
	(13, 'Mateo', 'Diestre', 'mateo_diestre@gmail.com', 'mateo123', '099111011', 0, NULL),
	(14, 'Ralph', 'Baer', 'ralph_baer@gmail.com', 'ralph123', '099111012', 0, NULL),
	(15, 'Ignacio', 'Paremon', 'ignacio_paremon@gmail.com', 'ignacio123', '099111013', 0, NULL),
	(16, 'Mia', 'Barboza', 'mia_barboza@gmail.com', 'mia123', '099111014', 0, NULL),
	(17, 'Julian', 'Surech', 'julian_surech@gmail.com', 'julian123', '099111015', 0, NULL),
	(18, 'Mariana', 'Pajon', 'mariana_pajon@gmail.com', 'mariana123', '099111016', 0, NULL),
	(19, 'Juan', 'Pedro', 'juan_pedro@gmail.com', 'juan123', '099111017', 0, NULL),
	(20, 'Maria', 'Sanchez', 'maria_sanchez@gmail.com', 'maria123', '099111018', 0, NULL),
	(21, 'Paola', 'Perez', 'paola_perez@gmail.com', 'paola123', '099111019', 0, NULL),
	(22, 'Gustavo', 'Trelles', 'gustavo_trelles@gmail.com', 'gustavo123', '099111020', 0, NULL),
	(23, 'Ema', 'Perez', 'ema_perez@gmail.com', 'ema123', '099111021', 0, NULL),
	(24, 'Javier', 'Santoalla', 'javier_santoalla@gmail.com', 'javier123', '099111022', 0, NULL),
	(25, 'Gonza', 'Rodriguez', 'gonza_rodriguez@gmail.com', 'gonza123', '099111023', 0, NULL),
	(26, 'Alfredo', 'Bioy', 'alfredo_bioy@gmail.com', 'alfredo123', '099111024', 0, NULL),
	(27, 'Pablo', 'Cibeles', 'pablo_cibeles@gmail.com', 'pablo123', '099111025', 0, NULL),
	(28, 'Santiago', 'Urrutia', 'santiago_urrutia@gmail.com', 'santiago123', '099111026', 0, NULL),
	(29, 'Maite', 'Caceres', 'maite_caceres@gmail.com', 'maite123', '099111027', 0, NULL),
	(30, 'Jaime', 'Gil', 'jaime_gil@gmail.com', 'jaime123', '099111028', 0, NULL),
	(31, 'Ximena', 'Fagundez', 'ximena_fagundez@gmail.com', 'ximena123', '099111029', 0, NULL),
	(32, 'Marcelo', 'Sosa', 'marcelo_sosa@gmail.com', 'marcelo123', '099111030', 0, NULL),
	(33, 'Bruno', 'Diaz', 'bruno_diaz@gmail.com', 'bruno123', '099111031', 0, NULL);

/*!40103 SET TIME_ZONE=IFNULL(@OLD_TIME_ZONE, 'system') */;
/*!40101 SET SQL_MODE=IFNULL(@OLD_SQL_MODE, '') */;
/*!40014 SET FOREIGN_KEY_CHECKS=IFNULL(@OLD_FOREIGN_KEY_CHECKS, 1) */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40111 SET SQL_NOTES=IFNULL(@OLD_SQL_NOTES, 1) */;
