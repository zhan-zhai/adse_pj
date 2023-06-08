/*
MySQL Backup
Database: shopping_system
Backup Time: 2021-10-17 17:36:55
*/

SET FOREIGN_KEY_CHECKS=0;
DROP TABLE IF EXISTS `shopping_system`.`com2cus`;
DROP TABLE IF EXISTS `shopping_system`.`commodity`;
DROP TABLE IF EXISTS `shopping_system`.`customer`;
DROP TABLE IF EXISTS `shopping_system`.`seller`;
CREATE TABLE `com2cus` (
  `c2c_id` int NOT NULL AUTO_INCREMENT,
  `c_id` int NOT NULL,
  `cus_id` int NOT NULL,
  PRIMARY KEY (`c2c_id`),
  UNIQUE KEY `c_id` (`c_id`,`cus_id`),
  KEY `cus_id` (`cus_id`),
  CONSTRAINT `com2cus_ibfk_1` FOREIGN KEY (`c_id`) REFERENCES `commodity` (`c_id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `com2cus_ibfk_2` FOREIGN KEY (`cus_id`) REFERENCES `customer` (`cus_id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3;
CREATE TABLE `commodity` (
  `c_id` int NOT NULL,
  `c_name` varchar(30) COLLATE utf8_bin DEFAULT NULL,
  `c_intro` varchar(50) COLLATE utf8_bin DEFAULT NULL,
  `picture` mediumtext COLLATE utf8_bin,
  `amount` int DEFAULT NULL,
  `s_id` int DEFAULT NULL,
  PRIMARY KEY (`c_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3 COLLATE=utf8_bin;
CREATE TABLE `customer` (
  `cus_id` int NOT NULL,
  `cus_name` varchar(30) DEFAULT NULL,
  `cus_password` varchar(30) DEFAULT NULL,
  PRIMARY KEY (`cus_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3;
CREATE TABLE `seller` (
  `s_id` int NOT NULL,
  `s_name` varchar(30) DEFAULT NULL,
  `s_password` varchar(30) DEFAULT NULL,
  PRIMARY KEY (`s_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3;
BEGIN;
LOCK TABLES `shopping_system`.`com2cus` WRITE;
DELETE FROM `shopping_system`.`com2cus`;
UNLOCK TABLES;
COMMIT;
BEGIN;
LOCK TABLES `shopping_system`.`commodity` WRITE;
DELETE FROM `shopping_system`.`commodity`;
UNLOCK TABLES;
COMMIT;
BEGIN;
LOCK TABLES `shopping_system`.`customer` WRITE;
DELETE FROM `shopping_system`.`customer`;
UNLOCK TABLES;
COMMIT;
BEGIN;
LOCK TABLES `shopping_system`.`seller` WRITE;
DELETE FROM `shopping_system`.`seller`;
UNLOCK TABLES;
COMMIT;
