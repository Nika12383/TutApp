-- MySQL Workbench Forward Engineering

SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0;
SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0;
SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION';

-- -----------------------------------------------------
-- Schema mydb
-- -----------------------------------------------------
-- -----------------------------------------------------
-- Schema tutapp
-- -----------------------------------------------------

-- -----------------------------------------------------
-- Schema tutapp
-- -----------------------------------------------------
CREATE SCHEMA IF NOT EXISTS `tutapp` DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci ;
USE `tutapp` ;

-- -----------------------------------------------------
-- Table `tutapp`.`days`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `tutapp`.`days` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `days` VARCHAR(45) NOT NULL,
  PRIMARY KEY (`id`))
ENGINE = InnoDB
AUTO_INCREMENT = 8
DEFAULT CHARACTER SET = utf8mb4
COLLATE = utf8mb4_0900_ai_ci;


-- -----------------------------------------------------
-- Table `tutapp`.`grades`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `tutapp`.`grades` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `grade` INT NOT NULL,
  PRIMARY KEY (`id`))
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8mb4
COLLATE = utf8mb4_0900_ai_ci;


-- -----------------------------------------------------
-- Table `tutapp`.`students`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `tutapp`.`students` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `name` VARCHAR(45) NOT NULL,
  `pronouns` VARCHAR(45) NOT NULL,
  `personal_email` VARCHAR(100) NOT NULL,
  `school_email` VARCHAR(100) NOT NULL,
  `adult_email` VARCHAR(100) NOT NULL,
  PRIMARY KEY (`id`))
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8mb4
COLLATE = utf8mb4_0900_ai_ci;


-- -----------------------------------------------------
-- Table `tutapp`.`subjects`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `tutapp`.`subjects` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `name` VARCHAR(45) NOT NULL,
  PRIMARY KEY (`id`))
ENGINE = InnoDB
AUTO_INCREMENT = 6
DEFAULT CHARACTER SET = utf8mb4
COLLATE = utf8mb4_0900_ai_ci;


-- -----------------------------------------------------
-- Table `tutapp`.`student_relation`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `tutapp`.`student_relation` (
  `student_id` INT NOT NULL,
  `grade_id` INT NOT NULL,
  `subject_id` INT NOT NULL,
  PRIMARY KEY (`student_id`, `grade_id`, `subject_id`),
  INDEX `grade_id_idx` (`grade_id` ASC) VISIBLE,
  INDEX `subject_id_idx` (`subject_id` ASC) VISIBLE,
  CONSTRAINT `grade_id_students`
    FOREIGN KEY (`grade_id`)
    REFERENCES `tutapp`.`grades` (`id`),
  CONSTRAINT `student_id`
    FOREIGN KEY (`student_id`)
    REFERENCES `tutapp`.`students` (`id`),
  CONSTRAINT `subject_id_students`
    FOREIGN KEY (`subject_id`)
    REFERENCES `tutapp`.`subjects` (`id`))
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8mb4
COLLATE = utf8mb4_0900_ai_ci;


-- -----------------------------------------------------
-- Table `tutapp`.`time`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `tutapp`.`time` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `time` VARCHAR(45) NOT NULL,
  PRIMARY KEY (`id`))
ENGINE = InnoDB
AUTO_INCREMENT = 7
DEFAULT CHARACTER SET = utf8mb4
COLLATE = utf8mb4_0900_ai_ci;


-- -----------------------------------------------------
-- Table `tutapp`.`tutors`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `tutapp`.`tutors` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `name` VARCHAR(45) NOT NULL,
  `pronouns` VARCHAR(45) NOT NULL,
  `personal_email` VARCHAR(100) NOT NULL,
  `school_email` VARCHAR(100) NOT NULL,
  `adult_email` VARCHAR(100) NOT NULL,
  PRIMARY KEY (`id`))
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8mb4
COLLATE = utf8mb4_0900_ai_ci;


-- -----------------------------------------------------
-- Table `tutapp`.`tutor_relation`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `tutapp`.`tutor_relation` (
  `tutor_id` INT NOT NULL,
  `grade_id` INT NOT NULL,
  `subject_id` INT NOT NULL,
  PRIMARY KEY (`tutor_id`, `grade_id`, `subject_id`),
  INDEX `grade_id_idx` (`grade_id` ASC) VISIBLE,
  INDEX `subject_id_idx` (`subject_id` ASC) VISIBLE,
  CONSTRAINT `grade_id_tutors`
    FOREIGN KEY (`grade_id`)
    REFERENCES `tutapp`.`grades` (`id`),
  CONSTRAINT `subject_id_tutors`
    FOREIGN KEY (`subject_id`)
    REFERENCES `tutapp`.`subjects` (`id`),
  CONSTRAINT `tutor_id`
    FOREIGN KEY (`tutor_id`)
    REFERENCES `tutapp`.`tutors` (`id`))
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8mb4
COLLATE = utf8mb4_0900_ai_ci;


SET SQL_MODE=@OLD_SQL_MODE;
SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS;
SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS;
