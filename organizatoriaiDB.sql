-- MySQL dump 10.13  Distrib 8.0.31, for macos12 (x86_64)
--
-- Host: localhost    Database: organizatoriai
-- ------------------------------------------------------
-- Server version	8.0.31

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!50503 SET NAMES utf8 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `Attender`
--

DROP TABLE IF EXISTS `Attender`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `Attender` (
  `id` int NOT NULL AUTO_INCREMENT,
  `namesurname` varchar(200) DEFAULT NULL,
  `email` varchar(50) DEFAULT NULL,
  `age` int DEFAULT NULL,
  `organized_by` int DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `Attende_idx` (`organized_by`),
  CONSTRAINT `organized_by` FOREIGN KEY (`organized_by`) REFERENCES `User` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=22 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `Attender`
--

LOCK TABLES `Attender` WRITE;
/*!40000 ALTER TABLE `Attender` DISABLE KEYS */;
INSERT INTO `Attender` VALUES (2,'asldkfa','alskjdfkjas@aaa.aaa',22,9),(3,'asldkfa','alskjdfkjas@aaa.aaa',22,9),(13,'attender','attender',22,NULL),(14,'attender','attender',22,NULL),(15,'attender','attender',22,NULL),(16,'attender','attender',22,9),(17,'aaa','aaa',22,NULL),(18,'ssss','sss',22,NULL),(19,'asdfasdf','asdfas',22,9),(20,'ggggg','gggggg',22,9),(21,'asad','asda',33,5);
/*!40000 ALTER TABLE `Attender` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `Event`
--

DROP TABLE IF EXISTS `Event`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `Event` (
  `idEvent` int NOT NULL AUTO_INCREMENT,
  `EventName` varchar(45) DEFAULT NULL,
  PRIMARY KEY (`idEvent`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `Event`
--

LOCK TABLES `Event` WRITE;
/*!40000 ALTER TABLE `Event` DISABLE KEYS */;
/*!40000 ALTER TABLE `Event` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `User`
--

DROP TABLE IF EXISTS `User`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `User` (
  `id` int NOT NULL AUTO_INCREMENT,
  `username` varchar(45) NOT NULL,
  `password` varchar(500) NOT NULL,
  `registered` datetime DEFAULT NULL,
  `role` varchar(45) DEFAULT NULL,
  `last_login` datetime DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `id_UNIQUE` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=10 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `User`
--

LOCK TABLES `User` WRITE;
/*!40000 ALTER TABLE `User` DISABLE KEYS */;
INSERT INTO `User` VALUES (1,'organiz','$2b$10$wXnCwJnmcrE5tkBS92/.tuBsHLHeBxUziiMwML5JFURWFV.tBa8sG','2022-10-22 07:33:28','Admin','2022-10-23 16:02:44'),(5,'VVV','$2b$10$NygATTZ/FW2kdd85hTN8tOIPptcAGlyCVm/BqbmcEhv04SgsOOLJK','2022-10-23 14:45:55','User','2022-10-23 16:05:04'),(6,'wal','$2b$10$Yhon7jrDQ4imk.nG5EjbeOPYlheCZ7mDkD9C3aaOq.Wo1DPeHB9BK','2022-10-23 14:47:08','Admin',NULL),(7,'vvvv','$2b$10$.Y6X9xKtd26wYEsb/JVQTerzWoWqwySTgK3dwgE/9QobbyggHrdTW','2022-10-23 15:00:51','Admin',NULL),(8,'aaa','$2b$10$KrYo9OSL9xpYejkLuY3NkeEZ0X40WYYqGWzyh7e9wCUbJKixgO8Zq','2022-10-23 15:04:06','Admin',NULL),(9,'user','$2b$10$XQ84LkxsPQpQsY5a8D8.3uoouephb5MoSn7Up0nN0VxbMHE4k2v.S','2022-10-23 15:06:14','User','2022-10-23 15:29:41');
/*!40000 ALTER TABLE `User` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2022-10-23 16:24:14
