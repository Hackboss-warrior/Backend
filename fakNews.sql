-- --------------------------------------------------------
-- Host:                         127.0.0.1
-- Versión del servidor:         10.4.28-MariaDB - mariadb.org binary distribution
-- SO del servidor:              Win64
-- HeidiSQL Versión:             12.6.0.6765
-- --------------------------------------------------------

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET NAMES utf8 */;
/*!50503 SET NAMES utf8mb4 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;


-- Volcando estructura de base de datos para notices
CREATE DATABASE IF NOT EXISTS `notices` /*!40100 DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci */;
USE `notices`;

-- Volcando estructura para tabla notices.favorites
CREATE TABLE IF NOT EXISTS `favorites` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `postId` int(11) NOT NULL,
  `userId` int(11) NOT NULL,
  `createdAt` datetime DEFAULT current_timestamp(),
  `modifiedAt` datetime DEFAULT NULL ON UPDATE current_timestamp(),
  PRIMARY KEY (`id`),
  KEY `postId` (`postId`),
  KEY `userId` (`userId`),
  CONSTRAINT `favorites_ibfk_1` FOREIGN KEY (`postId`) REFERENCES `posts` (`id`),
  CONSTRAINT `favorites_ibfk_2` FOREIGN KEY (`userId`) REFERENCES `users` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- Volcando datos para la tabla notices.favorites: ~0 rows (aproximadamente)
DELETE FROM `favorites`;

-- Volcando estructura para tabla notices.interacts
CREATE TABLE IF NOT EXISTS `interacts` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `postId` int(11) DEFAULT NULL,
  `userId` int(11) DEFAULT NULL,
  `interaction` varchar(50) NOT NULL,
  `createdAt` datetime DEFAULT current_timestamp(),
  `modifiedAt` datetime DEFAULT NULL ON UPDATE current_timestamp(),
  PRIMARY KEY (`id`),
  KEY `postId` (`postId`),
  KEY `userId` (`userId`),
  CONSTRAINT `interacts_ibfk_1` FOREIGN KEY (`postId`) REFERENCES `posts` (`id`),
  CONSTRAINT `interacts_ibfk_2` FOREIGN KEY (`userId`) REFERENCES `users` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- Volcando datos para la tabla notices.interacts: ~0 rows (aproximadamente)
DELETE FROM `interacts`;

-- Volcando estructura para tabla notices.posts
CREATE TABLE IF NOT EXISTS `posts` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `title` varchar(50) NOT NULL,
  `files` longtext DEFAULT NULL,
  `topic` varchar(100) DEFAULT NULL,
  `body` longtext NOT NULL,
  `tags` longtext CHARACTER SET utf8mb4 COLLATE utf8mb4_bin DEFAULT '{"Política":false,\n    "Economía":false,\n    "Tecnología":false,\n    "Ciencia":false,\n    "Salud":false,\n    "Cultura":false,\n    "Deportes":false,\n    "Entretenimiento":false};',
  `userId` int(11) NOT NULL,
  `createdAt` datetime DEFAULT current_timestamp(),
  `modifiedAt` datetime DEFAULT NULL ON UPDATE current_timestamp(),
  PRIMARY KEY (`id`),
  KEY `userId` (`userId`),
  CONSTRAINT `posts_ibfk_1` FOREIGN KEY (`userId`) REFERENCES `users` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- Volcando datos para la tabla notices.posts: ~2 rows (aproximadamente)
DELETE FROM `posts`;
INSERT INTO `posts` (`id`, `title`, `files`, `topic`, `body`, `tags`, `userId`, `createdAt`, `modifiedAt`) VALUES
	(1, 'dada', 'dfysazuhcjiadhfwedadd', 'Omar la dad', 'La dadasdsad das dadien', '{"Política":false, "Economía":false, "Tecnología":false, "Ciencia":false, "Salud":false, "Cultura":false, "Deportes":false, "Entretenimiento":false}', 1, '2023-12-11 12:34:39', '2023-12-11 13:15:47'),
	(2, 'Tete', 'dfysazuhcjiadhfwedadd', 'Omar la cdad dadadadadadadadadadadadd', 'Ladadad dadasd do bien', '{"Política":false, "Economía":false, "Tecnología":false, "Ciencia":false, "Salud":false, "Cultura":false, "Deportes":false, "Entretenimiento":false}', 13, '2023-12-11 13:25:14', NULL);

-- Volcando estructura para tabla notices.users
CREATE TABLE IF NOT EXISTS `users` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(50) NOT NULL,
  `firstName` varchar(50) DEFAULT NULL,
  `nickName` varchar(100) NOT NULL,
  `email` varchar(100) NOT NULL,
  `passwordHash` varchar(255) NOT NULL,
  `DOB` date NOT NULL,
  `createdAt` datetime DEFAULT current_timestamp(),
  `modifiedAt` datetime DEFAULT NULL ON UPDATE current_timestamp(),
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=15 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- Volcando datos para la tabla notices.users: ~14 rows (aproximadamente)
DELETE FROM `users`;
INSERT INTO `users` (`id`, `name`, `firstName`, `nickName`, `email`, `passwordHash`, `DOB`, `createdAt`, `modifiedAt`) VALUES
	(1, 'Omar', 'Juan', 'Omar69', 'algo@example.com', '1234', '0000-00-00', '2023-12-07 18:44:51', NULL),
	(2, 'Omar', 'Juan', 'Omar79', 'algo1@example.com', '1234', '0000-00-00', '2023-12-07 19:00:25', NULL),
	(3, 'Omar', 'Juan', 'Omar79', 'algo1@example.com', '1234', '0000-00-00', '2023-12-07 19:01:06', NULL),
	(4, 'Omar', 'Juan', 'Omar89', 'algo2@example.com', '1234', '0000-00-00', '2023-12-07 19:05:56', NULL),
	(5, 'Omar', 'Juan', 'Omar99', 'algo3@example.com', '1234', '0000-00-00', '2023-12-07 19:15:32', NULL),
	(6, 'Omar', 'Juan', 'Omar100', 'algo4@example.com', '$2b$10$9DV12gcJf5sHbe5nw3aElOH3HidOfg15fy.FbTDm4T/HEkf/3c5Gm', '0000-00-00', '2023-12-07 19:19:52', NULL),
	(7, 'Omar', 'Juan', 'Omar200', 'algo5@example.com', '$2b$10$HnPJf5Ep.gMOt2ilN0N.Tu/7qtB5EAvUyuojNr6l0cmA0jvGGGRo6', '1920-12-01', '2023-12-07 19:47:57', NULL),
	(8, 'Omar', 'Juan', 'Omar300', 'algo6@example.com', '$2b$10$M.w2GUBDxPTtSovvP8gL8.jL.BE8.sbhMBTnBGbcDHIvvu595MlRK', '1920-12-01', '2023-12-09 10:53:57', NULL),
	(9, 'Omar', 'Juan', 'Omar700', 'algo7@example.com', '$2b$10$tAOh4cDJZfpLSx/s1dHTu.DCkB1Am4ZoYBnSRl.TyrY8ax3FJs0Z6', '1920-12-01', '2023-12-09 11:40:53', NULL),
	(10, 'Omar', 'Juan', 'Omar800', 'algo8@example.com', '$2b$10$w1np8mlD2SBu3jHihBHaBe.Qe9nZQoPP7ZRXSqhiSAD898pZ4NEaa', '1920-12-01', '2023-12-09 11:42:06', NULL),
	(11, 'Omar', 'Juan', 'Omar900', 'algo9@example.com', '$2b$10$8EkGhrVH4qYWWl0aoWwKLeIhqpgC6qf0iwoM.Ow6b1GcGtwSVE/zu', '1920-12-01', '2023-12-09 11:44:22', NULL),
	(12, 'Omar', 'Juan', 'Omar999', 'algo10@example.com', '$2b$10$kVGbOjWKPbV/ISRVAIyzruu23g477Zp10bceNNOIkPaW36moLoKIe', '1920-12-01', '2023-12-09 12:01:05', NULL),
	(13, 'Omar', 'Juan', 'TuMoreno69', 'algo20@example.com', '$2b$10$P6DMzYPy26FY6jsLZgz7YOA.JfmO3ursX2FRTM8sLtQOLlBxExWH6', '1920-12-01', '2023-12-11 13:00:50', NULL),
	(14, 'Omar', 'Juan', 'TuMoreno20', 'algo30@example.com', '$2b$10$d0chfkaaU28PAoOg6ZoMHeVD8reHRduBeC5q3GsGXL2SReX/j3loG', '1920-12-01', '2023-12-11 13:01:24', NULL);

/*!40103 SET TIME_ZONE=IFNULL(@OLD_TIME_ZONE, 'system') */;
/*!40101 SET SQL_MODE=IFNULL(@OLD_SQL_MODE, '') */;
/*!40014 SET FOREIGN_KEY_CHECKS=IFNULL(@OLD_FOREIGN_KEY_CHECKS, 1) */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40111 SET SQL_NOTES=IFNULL(@OLD_SQL_NOTES, 1) */;
