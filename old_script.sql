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
-- Table `tutapp`.`users`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `tutapp`.`users` (
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
-- Table `tutapp`.`grade`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `tutapp`.`grade` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `grade` INT NOT NULL,
  PRIMARY KEY (`id`))
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `tutapp`.`roles`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `tutapp`.`roles` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `role` VARCHAR(45) CHARACTER SET 'ascii' NOT NULL,
  PRIMARY KEY (`id`))
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `tutapp`.`schedule`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `tutapp`.`schedule` (
  `user_id` INT NOT NULL,
  `day_id` INT NOT NULL,
  `start_id` INT NOT NULL,
  `end_id` INT NOT NULL,
  PRIMARY KEY (`user_id`, `day_id`, `start_id`, `end_id`),
  INDEX `day_idx` (`day_id` ASC) VISIBLE,
  INDEX `start_idx` (`start_id` ASC) VISIBLE,
  INDEX `end_idx` (`end_id` ASC) VISIBLE,
  CONSTRAINT `user_id_sched`
    FOREIGN KEY (`user_id`)
    REFERENCES `tutapp`.`users` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `day`
    FOREIGN KEY (`day_id`)
    REFERENCES `tutapp`.`days` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `start`
    FOREIGN KEY (`start_id`)
    REFERENCES `tutapp`.`time` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `end`
    FOREIGN KEY (`end_id`)
    REFERENCES `tutapp`.`time` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `tutapp`.`user-relation`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `tutapp`.`user-relation` (
  `r_user_id` INT NOT NULL,
  `grade_id` INT NOT NULL,
  `subject_id` INT NOT NULL,
  PRIMARY KEY (`r_user_id`, `grade_id`, `subject_id`),
  INDEX `subject_id_idx` (`subject_id` ASC) VISIBLE,
  CONSTRAINT `subject`
    FOREIGN KEY (`subject_id`)
    REFERENCES `tutapp`.`subjects` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `tutapp`.`users-with-role`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `tutapp`.`users-with-role` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `user_id` INT NOT NULL,
  `role_id` INT NOT NULL,
  PRIMARY KEY (`id`, `user_id`, `role_id`),
  CONSTRAINT `user_id`
    FOREIGN KEY (`user_id`)
    REFERENCES `tutapp`.`users` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


SET SQL_MODE=@OLD_SQL_MODE;
SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS;
SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS;
