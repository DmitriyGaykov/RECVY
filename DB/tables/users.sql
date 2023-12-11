create table Users (
    id varchar(50) primary key,
    login varchar(20) unique,

    firstName varchar(20),
    lastName varchar(20),
    password varchar(256),
    aboutMe varchar(300) null,

    age integer check (
        age > 6 and
        age < 150
    ),

    regDate timestamp default CURRENT_TIMESTAMP,
    role varchar(20) default 'user',

    foreign key (role) references roles(role)
) tablespace DataTablespace;


