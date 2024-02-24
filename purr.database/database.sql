DROP DATABASE IF EXISTS `purr`;

CREATE DATABASE `purr`;

CREATE TABLE `purr`.`owners` (
    `ID` INT NOT NULL AUTO_INCREMENT,
    `username` VARCHAR(45) NOT NULL,
    `name` VARCHAR(45) NOT NULL,
    `password` VARCHAR(45) NULL,
    `birthdate` TIMESTAMP NOT NULL,
    `following` INT NOT NULL DEFAULT 0,
    `google_id` VARCHAR(45) NULL,
    `biography` VARCHAR(255) NOT NULL DEFAULT '',
    `updated_at` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    `created_at` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    PRIMARY KEY (`ID`),
    UNIQUE INDEX `username_UNIQUE` (`username` ASC) VISIBLE,
    UNIQUE INDEX `google_id_UNIQUE` (`google_id` ASC) VISIBLE
);

CREATE TABLE `purr`.`cats` (
    `ID` INT NOT NULL AUTO_INCREMENT,
    `catname` VARCHAR(45) NOT NULL,
    `name` VARCHAR(45) NOT NULL,
    `password` VARCHAR(45) NOT NULL,
    `birthdate` TIMESTAMP NOT NULL,
    `followers` INT NOT NULL DEFAULT 0,
    `deathdate` TIMESTAMP NULL,
    `biography` VARCHAR(255) NOT NULL DEFAULT '',
    `updated_at` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    `created_at` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    PRIMARY KEY (`ID`),
    UNIQUE INDEX `catname_UNIQUE` (`catname` ASC) VISIBLE
);

CREATE TABLE `purr`.`followers` (
    `owner_id` INT NOT NULL,
    `cat_id` INT NOT NULL,
    `created_at` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    PRIMARY KEY (`owner_id`, `cat_id`),
    INDEX `followers_cat_id_idx` (`cat_id` ASC) VISIBLE,
    INDEX `followers_owner_id_idx` (`owner_id` ASC) VISIBLE,
    CONSTRAINT `fk_followers_cat_id` FOREIGN KEY (`cat_id`) REFERENCES `purr`.`cats` (`ID`) ON DELETE CASCADE ON UPDATE NO ACTION,
    CONSTRAINT `fk_followers_owner_id` FOREIGN KEY (`owner_id`) REFERENCES `purr`.`owners` (`ID`) ON DELETE CASCADE ON UPDATE NO ACTION
);

CREATE TABLE `purr`.`ownerships` (
    `owner_id` INT NOT NULL,
    `cat_id` INT NOT NULL,
    `created_at` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    PRIMARY KEY (`owner_id`, `cat_id`),
    INDEX `ownerships_cat_id_idx` (`cat_id` ASC) VISIBLE,
    INDEX `ownerships_owner_id_idx` (`owner_id` ASC) VISIBLE,
    CONSTRAINT `fk_ownerships_cat_id` FOREIGN KEY (`cat_id`) REFERENCES `purr`.`cats` (`ID`) ON DELETE CASCADE ON UPDATE NO ACTION,
    CONSTRAINT `fk_ownerships_owner_id` FOREIGN KEY (`owner_id`) REFERENCES `purr`.`owners` (`ID`) ON DELETE CASCADE ON UPDATE NO ACTION
);

CREATE TABLE `purr`.`posts` (
    `ID` INT NOT NULL,
    `filename` VARCHAR(255) NOT NULL,
    `cat_id` INT NOT NULL,
    `type` VARCHAR(45) NOT NULL,
    `likes` INT NOT NULL DEFAULT 0,
    `likes_day` INT NOT NULL DEFAULT 0,
    `views` INT NOT NULL DEFAULT 0,
    `description` VARCHAR(255) NOT NULL DEFAULT '',
    `updated_at` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    `created_at` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    PRIMARY KEY (`ID`),
    INDEX `posts_cat_id_idx` (`cat_id` ASC) VISIBLE,
    CONSTRAINT `fk_posts_cat_id` FOREIGN KEY (`cat_id`) REFERENCES `purr`.`cats` (`ID`) ON DELETE CASCADE ON UPDATE NO ACTION
);

CREATE TABLE `purr`.`comments` (
    `ID` INT NOT NULL AUTO_INCREMENT,
    `user_id` INT NOT NULL,
    `post_id` INT NOT NULL,
    `comment_id` INT NULL,
    `comment` VARCHAR(255) NOT NULL,
    `modified` TINYINT NOT NULL DEFAULT 0,
    `updated_at` TIMESTAMP NOT NULL,
    `created_at` TIMESTAMP NOT NULL,
    PRIMARY KEY (`ID`),
    INDEX `comments_user_id_idx` (`user_id` ASC) VISIBLE,
    INDEX `comments_post_id_idx` (`post_id` ASC) VISIBLE,
    CONSTRAINT `fk_comments_user_id` FOREIGN KEY (`user_id`) REFERENCES `purr`.`owners` (`ID`) ON DELETE CASCADE ON UPDATE NO ACTION,
    CONSTRAINT `fk_comments_post_id` FOREIGN KEY (`post_id`) REFERENCES `purr`.`posts` (`ID`) ON DELETE CASCADE ON UPDATE NO ACTION
);

ALTER TABLE `purr`.`comments`
ADD INDEX `comments_comment_id_idx` (`comment_id` ASC) VISIBLE;

ALTER TABLE `purr`.`comments`
ADD CONSTRAINT `fk_comments_comment_id` FOREIGN KEY (`comment_id`) REFERENCES `purr`.`comments` (`ID`) ON DELETE CASCADE ON UPDATE NO ACTION;

CREATE TABLE `purr`.`likes` (
    `ID` INT NOT NULL AUTO_INCREMENT,
    `post_id` INT NOT NULL,
    `user_id` INT NOT NULL,
    `created_at` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    PRIMARY KEY (`ID`),
    INDEX `likes_post_id_idx` (`post_id` ASC) VISIBLE,
    INDEX `likes_user_id_idx` (`user_id` ASC) VISIBLE,
    UNIQUE INDEX `unique_like` (`post_id` ASC, `user_id` ASC) VISIBLE,
    CONSTRAINT `fk_likes_post_id` FOREIGN KEY (`post_id`) REFERENCES `purr`.`posts` (`ID`) ON DELETE CASCADE ON UPDATE NO ACTION,
    CONSTRAINT `fk_likes_user_id` FOREIGN KEY (`user_id`) REFERENCES `purr`.`owners` (`ID`) ON DELETE CASCADE ON UPDATE NO ACTION
);

CREATE TABLE `purr`.`reports` (
    `ID` INT NOT NULL AUTO_INCREMENT,
    `user_id` INT NOT NULL,
    `reported_user_id` INT NULL,
    `reported_post_id` INT NULL,
    `reported_cat_id` INT NULL,
    `reported_comment_id` INT NULL,
    `content` VARCHAR(255) NOT NULL,
    `type` VARCHAR(45) NOT NULL,
    `status` VARCHAR(45) NOT NULL DEFAULT 'pending',
    `resolver` TINYINT NOT NULL DEFAULT 0,
    `action` VARCHAR(45) NULL,
    `updated_at` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    `created_at` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    PRIMARY KEY (`ID`),
    INDEX `fk_user_id_idx` (`user_id` ASC) VISIBLE,
    INDEX `fk_reported_user_id_idx` (`reported_user_id` ASC) VISIBLE,
    INDEX `fk_reported_post_id_idx` (`reported_post_id` ASC) VISIBLE,
    INDEX `fk_reported_comment_id_idx` (`reported_comment_id` ASC) VISIBLE,
    INDEX `fk_reported_cat_id_idx` (`reported_cat_id` ASC) VISIBLE,
    CONSTRAINT `fk_user_id` FOREIGN KEY (`user_id`) REFERENCES `purr`.`owners` (`ID`) ON DELETE NO ACTION ON UPDATE NO ACTION,
    CONSTRAINT `fk_reported_user_id` FOREIGN KEY (`reported_user_id`) REFERENCES `purr`.`owners` (`ID`) ON DELETE NO ACTION ON UPDATE NO ACTION,
    CONSTRAINT `fk_reported_post_id` FOREIGN KEY (`reported_post_id`) REFERENCES `purr`.`posts` (`ID`) ON DELETE NO ACTION ON UPDATE NO ACTION,
    CONSTRAINT `fk_reported_comment_id` FOREIGN KEY (`reported_comment_id`) REFERENCES `purr`.`comments` (`ID`) ON DELETE NO ACTION ON UPDATE NO ACTION,
    CONSTRAINT `fk_reported_cat_id` FOREIGN KEY (`reported_cat_id`) REFERENCES `purr`.`cats` (`ID`) ON DELETE NO ACTION ON UPDATE NO ACTION
);