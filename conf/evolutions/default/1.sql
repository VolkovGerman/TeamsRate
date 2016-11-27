# Tasks schema

# --- !Ups

CREATE SEQUENCE user_id_seq;
CREATE TABLE USER (
  id integer NOT NULL DEFAULT nextval('user_id_seq') PRIMARY KEY,
  NAME VARCHAR NOT NULL,
  SURNAME VARCHAR NOT NULL,
  VK VARCHAR NOT NULL
);

INSERT INTO USER (name, surname, vk) VALUES ('German', 'Volkov', '11111');
INSERT INTO USER (name, surname, vk) VALUES ('Vadim', 'Benkovski', '22222');
INSERT INTO USER (name, surname, vk) VALUES ('Rita', 'Alnordovna', '33333');

# --- !Downs

drop table USER;
DROP SEQUENCE user_id_seq;