-- MySQL dump 10.13  Distrib 5.5.62, for Win64 (AMD64)
--
-- Host: localhost    Database: proyecto-alq-autos
-- ------------------------------------------------------
-- Server version	5.5.5-10.3.11-MariaDB

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `alquiler_vehiculo`
--

DROP TABLE IF EXISTS `alquiler_vehiculo`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `alquiler_vehiculo` (
  `id_alquiler` int(11) NOT NULL AUTO_INCREMENT,
  `id_vehiculo` varchar(100) COLLATE utf8mb4_spanish2_ci DEFAULT NULL,
  `correo` varchar(100) COLLATE utf8mb4_spanish2_ci DEFAULT NULL,
  `full_name` varchar(100) COLLATE utf8mb4_spanish2_ci DEFAULT NULL,
  `telefono` varchar(100) COLLATE utf8mb4_spanish2_ci DEFAULT NULL,
  `documento` varchar(100) COLLATE utf8mb4_spanish2_ci DEFAULT NULL,
  `fecha_in` date DEFAULT NULL,
  `fecha_en` date DEFAULT NULL,
  `referencia` varchar(30) COLLATE utf8mb4_spanish2_ci DEFAULT NULL,
  `total_alquiler` double DEFAULT NULL,
  `cantidad_dias` decimal(10,0) DEFAULT NULL,
  PRIMARY KEY (`id_alquiler`),
  KEY `alquiler_vehiculo_FK` (`id_vehiculo`),
  CONSTRAINT `alquiler_vehiculo_FK` FOREIGN KEY (`id_vehiculo`) REFERENCES `vehiculos` (`id_vehiculo`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_spanish2_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `alquiler_vehiculo`
--

LOCK TABLES `alquiler_vehiculo` WRITE;
/*!40000 ALTER TABLE `alquiler_vehiculo` DISABLE KEYS */;
INSERT INTO `alquiler_vehiculo` VALUES (2,'10001','yuki@gmail.com','yuki tejada','8999','666677','2020-12-21','2020-12-23','2141-416985',160,2),(3,'331234','yuki@gmail.com','yuki tejada','8999','666677','2020-12-24','2020-12-27','21420-782933',240,3);
/*!40000 ALTER TABLE `alquiler_vehiculo` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `users`
--

DROP TABLE IF EXISTS `users`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `users` (
  `iduser_mail` varchar(100) COLLATE utf8mb4_spanish2_ci NOT NULL,
  `password` varchar(300) COLLATE utf8mb4_spanish2_ci NOT NULL,
  `full_name` varchar(100) COLLATE utf8mb4_spanish2_ci DEFAULT NULL,
  `user_rol` varchar(100) COLLATE utf8mb4_spanish2_ci DEFAULT NULL,
  `documento` varchar(25) COLLATE utf8mb4_spanish2_ci DEFAULT NULL,
  `telefono` varchar(25) COLLATE utf8mb4_spanish2_ci DEFAULT NULL,
  PRIMARY KEY (`iduser_mail`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_spanish2_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `users`
--

LOCK TABLES `users` WRITE;
/*!40000 ALTER TABLE `users` DISABLE KEYS */;
INSERT INTO `users` VALUES ('anaramirez@gmail.com','111','Ana Ramirez',NULL,'998877','9900'),('teresa@gmail.com','0000','teresa batista',NULL,'12341','900000'),('yuki@gmail.com','123','yuki tejada',NULL,'666677','8999');
/*!40000 ALTER TABLE `users` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `vehiculos`
--

DROP TABLE IF EXISTS `vehiculos`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `vehiculos` (
  `id_vehiculo` varchar(100) COLLATE utf8mb4_spanish2_ci NOT NULL,
  `marca` varchar(35) COLLATE utf8mb4_spanish2_ci NOT NULL,
  `modelo` varchar(35) COLLATE utf8mb4_spanish2_ci DEFAULT NULL,
  `anno` varchar(4) COLLATE utf8mb4_spanish2_ci DEFAULT NULL,
  `color` varchar(25) COLLATE utf8mb4_spanish2_ci DEFAULT NULL,
  `placa_vehiculo` varchar(10) COLLATE utf8mb4_spanish2_ci DEFAULT NULL,
  `foto` varchar(255) COLLATE utf8mb4_spanish2_ci DEFAULT NULL,
  `precio_dia` double DEFAULT NULL,
  `disponibilidad` varchar(100) COLLATE utf8mb4_spanish2_ci DEFAULT NULL,
  PRIMARY KEY (`id_vehiculo`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_spanish2_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `vehiculos`
--

LOCK TABLES `vehiculos` WRITE;
/*!40000 ALTER TABLE `vehiculos` DISABLE KEYS */;
INSERT INTO `vehiculos` VALUES ('10001','Toyota','Land Cruiser','2019','negro','10001','https://i.imgur.com/gZsxvth.jpg',80,'Disponible'),('331234','Mazda','Mazda 3','2014','rojo','331234','https://i.imgur.com/dJ5Upes.jpg',80,'Disponible'),('553678','Toyota','Yaris','2017','azul','553678','https://i.imgur.com/HVfCtx1.jpg',70,'Disponible'),('557736','Hyundai','Accent','2019','gris','557736','https://i.imgur.com/44UEbGJ.jpg',55,'Disponible'),('673391','Honda','Civic','2014','blanco','673391','https://i.imgur.com/pSYeeMR.jpg',65,'Disponible'),('A17394','Toyota','Corolla','2013','gris','17394','https://i.imgur.com/3dpwE0L.jpg',55,'Disponible');
/*!40000 ALTER TABLE `vehiculos` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Dumping routines for database 'proyecto-alq-autos'
--
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2020-12-21  4:20:46
