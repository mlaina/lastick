CREATE DATABASE lastick;

USE lastick;

-- creates without foreing keys

CREATE TABLE `USERS` (
  `id_user` decimal(9,0) NOT NULL PRIMARY KEY UNIQUE,
  `name` varchar(100) NOT NULL,
  `email` varchar(320) NOT NULL,
  `birthday` datetime DEFAULT NULL,
  `id_direction` decimal(9,0) DEFAULT NULL,
  `TIMESTAMP` datetime DEFAULT CURRENT_TIMESTAMP
); 

CREATE TABLE `TASKS` (
  `id_task` decimal(9,0) NOT NULL PRIMARY KEY UNIQUE,
  `name` varchar(100) NOT NULL,
  `acronym` varchar(320) NOT NULL,
  `description` varchar(500) NOT NULL,
  `id_color` decimal(9,0) NOT NULL,
  `id_time` decimal(9,0) NOT NULL,
  `TIMESTAMP` datetime DEFAULT CURRENT_TIMESTAMP
);
  
CREATE TABLE `USERS_TASKS`(
    `id_user_task` decimal (9,0)NOT NULL PRIMARY KEY UNIQUE,
    `id_user` decimal(9,0) NOT NULL,
    `id_task` decimal(9,0) NOT NULL,
    `TIMESTAMP` datetime DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE `TIMES`(
    `id_time` decimal (9,0)NOT NULL PRIMARY KEY UNIQUE,
    `ini` datetime NOT NULL,
    `fin` datetime NOT NULL,
    `valid` decimal (1,0) NOT NULL,
    `id_task`  decimal(9,0) NOT NULL,
    `TIMESTAMP` datetime DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE `TAGS`(
    `id_tag` decimal (9,0)NOT NULL PRIMARY KEY UNIQUE,
    `name` varchar(100) NOT NULL,
    `TIMESTAMP` datetime DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE `COLORS`(
    `id_color` decimal (9,0)NOT NULL PRIMARY KEY UNIQUE,
    `code` varchar(6) NOT NULL,
    `TIMESTAMP` datetime DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE `ALERTS`(
    `id_alert` decimal (9,0)NOT NULL PRIMARY KEY UNIQUE,
    `early` decimal(2,0) NOT NULL,
    `prior` decimal(2,0) NOT NULL,
    `id_type` decimal(9,0) NOT NULL,
    `TIMESTAMP` datetime DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE `TIMES_ALERTS`(
    `id_time_alert` decimal (9,0)NOT NULL PRIMARY KEY UNIQUE,
    `id_time` decimal(9,0) NOT NULL,
    `id_alert` decimal(9,0) NOT NULL,
    `TIMESTAMP` datetime DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE `TAGS_ALERTS`(
    `id_tag_alert` decimal (9,0)NOT NULL PRIMARY KEY UNIQUE,
    `id_tag` decimal(9,0) NOT NULL,
    `id_alert` decimal(9,0) NOT NULL,
    `TIMESTAMP` datetime DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE `USERS_USERS`(
    `id_user_user` decimal (9,0)NOT NULL PRIMARY KEY UNIQUE,
    `id_user1` decimal(9,0) NOT NULL,
    `id_user2` decimal(9,0) NOT NULL,
    `TIMESTAMP` datetime DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE `TASKS_TAGS`(
    `id_task_tag` decimal (9,0)NOT NULL PRIMARY KEY UNIQUE,
    `mayus` decimal (1,0) NOT NULL,
    `id_task` decimal (1,0) NOT NULL,
    `id_tag` decimal (1,0) NOT NULL,
    `id_color` decimal (1,0) NOT NULL,
    `TIMESTAMP` datetime DEFAULT CURRENT_TIMESTAMP
);

-- end of the creates

-- FOREING KEYS

ALTER TABLE `TASKS`
ADD FOREIGN KEY (`id_color`) REFERENCES `COLORS`(`id_color`);

ALTER TABLE `TASKS`
ADD FOREIGN KEY (`id_time`) REFERENCES `TIMES`(`id_time`);
--
ALTER TABLE `USERS_TASKS`
ADD FOREIGN KEY (`id_user`) REFERENCES `USERS`(`id_user`);

ALTER TABLE `USERS_TASKS`
ADD FOREIGN KEY (`id_task`) REFERENCES `TASKS`(`id_task`);
--
ALTER TABLE `TIMES`
ADD FOREIGN KEY (`id_task`) REFERENCES `TASKS`(`id_task`);
--
ALTER TABLE `TIMES_ALERTS`
ADD FOREIGN KEY (`id_time`) REFERENCES `TIMES`(`id_time`);

ALTER TABLE `TIMES_ALERTS`
ADD FOREIGN KEY (`id_alert`) REFERENCES `ALERTS`(`id_alert`);
--
ALTER TABLE `TAGS_ALERTS`
ADD FOREIGN KEY (`id_tag`) REFERENCES `TAGS`(`id_tag`);

ALTER TABLE `TAGS_ALERTS`
ADD FOREIGN KEY (`id_alert`) REFERENCES `ALERTS`(`id_alert`);
--
ALTER TABLE `USERS_USERS`
ADD FOREIGN KEY (`id_user1`) REFERENCES `USERS`(`id_user`);

ALTER TABLE `USERS_USERS`
ADD FOREIGN KEY (`id_user2`) REFERENCES `USERS`(`id_user`);
--
ALTER TABLE `TASKS_TAGS`
ADD FOREIGN KEY (`id_task`) REFERENCES `TASKS`(`id_task`);

ALTER TABLE `TASKS_TAGS`
ADD FOREIGN KEY (`id_tag`) REFERENCES `TAGS`(`id_tag`);

ALTER TABLE `TASKS_TAGS`
ADD FOREIGN KEY (`id_color`) REFERENCES `COLORS`(`id_color`);
--
-- end FOREING KEYS
