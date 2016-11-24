# Tasks schema

# --- !Ups

CREATE SEQUENCE user_id_seq;
CREATE TABLE USER (
  id integer NOT NULL DEFAULT nextval('user_id_seq') PRIMARY KEY,
  NAME VARCHAR NOT NULL,
  SURNAME VARCHAR NOT NULL,
  EMAIL VARCHAR NOT NULL,
  PASSWORD VARCHAR NOT NULL
);

INSERT INTO USER (name, surname, email, password) VALUES ('German', 'Volkov', 'Volkov@gmail.com', 'gera123');
INSERT INTO USER (name, surname, email, password) VALUES ('Vadim', 'Benkovski', 'Benkovski@gmail.com', 'benkovski123');
INSERT INTO USER (name, surname, email, password) VALUES ('Rita', 'Alnordovna', 'Alnordovna@gmail.com', 'alnordovna123');

# --- !Downs

drop table USER;
DROP SEQUENCE user_id_seq;