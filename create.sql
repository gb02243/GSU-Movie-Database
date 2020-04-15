drop database gsu_moviedb;
create database gsu_moviedb;
use gsu_moviedb;

create table movie(
    movieID int(5) not null,
    movieTitle varchar(50) not null,
    movieDesc varchar(150),
    movieReleaseDate varchar(150),
    movieRuntime int(3) check (movieRuntime > 25),
    movieCertificate varchar(4) check (movieCertificate in ('N/A','PG','12','12A','15','15A','16','18')),
    movieRating double(2,1) check (movieRating > 0 and movieRating <= 10),
    constraint movie_pk primary key (movieID)
)engine innodb;

create table genre(
    genreID int(5) not null,
    genreType varchar(25) not null,
    genreDesc varchar(200),
    constraint genre_pk primary key (genreID)
)engine innodb;

create table movie_genre(
    movie_genreID int(5) not null,
    m_movieID int(5) not null,
    g_genreID int(5) not null,
    constraint movie_genre_pk primary key (movie_genreID),
    constraint movie_genre_fk_movie foreign key (m_movieID) references movie (movieID),
    constraint movie_genre_fk_genre foreign key (g_genreID) references genre (genreID)
)engine innodb;

create table person(
    personID int(5) not null,
    personFirstName varchar(50) not null,
    personLastName varchar(50),
    personNationality varchar(50),
    personPicture varchar (150),
    constraint person_pk primary key (personID)
)engine innodb;

create table role(
    roleID int(5) not null,
    roleDesc varchar(25) not null,
    m_movieID int(5) not null,
    p_personID int(5) not null,
    constraint role_pk primary key (roleID),
    constraint role_fk_movie foreign key (m_movieID) references movie (movieID),
    constraint role_fk_person foreign key (p_personID) references person (personID)
)engine innodb;
