create table Roles (
    role varchar(20) primary key
) tablespace SystemTablespace;

insert into Roles values ('user');
insert into Roles values ('admin');