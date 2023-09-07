create type UserType as (
    id varchar(50),
    login varchar(20),
    firstName varchar(20),
    lastName varchar(20),
    aboutMe varchar(300),
    age integer,
    role varchar(20),
    regDate timestamp,
    photos varchar(1000)[]
);
