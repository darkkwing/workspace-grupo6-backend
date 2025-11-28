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

/*!40103 SET TIME_ZONE=IFNULL(@OLD_TIME_ZONE, 'system') */;
/*!40101 SET SQL_MODE=IFNULL(@OLD_SQL_MODE, '') */;
/*!40014 SET FOREIGN_KEY_CHECKS=IFNULL(@OLD_FOREIGN_KEY_CHECKS, 1) */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40111 SET SQL_NOTES=IFNULL(@OLD_SQL_NOTES, 1) */;
