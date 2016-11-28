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

CREATE SEQUENCE team_id_seq;
CREATE TABLE TEAM (
  ID INTEGER NOT NULL DEFAULT nextval('team_id_seq') PRIMARY KEY,
  NAME VARCHAR NOT NULL,
  DESCR VARCHAR NOT NULL,
  CREATOR_ID INTEGER NOT NULL
);

INSERT INTO TEAM (NAME, DESCR, CREATOR_ID) VALUES ('OneWayUp', 'Cool team from BIT-CUP 2016!', 1);
INSERT INTO TEAM (NAME, DESCR, CREATOR_ID) VALUES ('Bayern Munich', 'Football team from Germany!', 2);
INSERT INTO TEAM (NAME, DESCR, CREATOR_ID) VALUES ('BSUIR', 'University in Minsk!', 1);

# --- !Downs

drop table USER;
DROP SEQUENCE user_id_seq;

drop table TEAM;
DROP SEQUENCE team_id_seq;