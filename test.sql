CREATE TABLE users2(
   mail VARCHAR NOT NULL UNIQUE,
   username VARCHAR NOT NULL UNIQUE,
   password VARCHAR NOT NULL,
   nome VARCHAR NOT NULL,
   apelido VARCHAR NOT NULL,
   tmax FLOAT NOT NULL,
   tmin FLOAT NOT NULL,
   cost FLOAT NOT NULL
);