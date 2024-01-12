CREATE DATABASE NotesAppDB;

USE NotesAppDB;

CREATE TABLE notes (
	id int IDENTITY(1, 1)  NOT NULL PRIMARY KEY,
	title varchar(255) NOT NULL,
	contents text NOT NULL,
	created date NOT NULL
);
