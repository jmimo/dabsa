set foreign_key_checks=0;
truncate table Point;
truncate table Airspace;
truncate table AirspaceFile;
truncate table user;
set foreign_key_checks=1;
insert into user (username,password,email,registered_on) values ('mimo','darkstar45','mimo@mimo.ch',now());
