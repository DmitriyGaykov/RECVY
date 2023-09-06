create table friends (
    idUser1 varchar(50),
    idUser2 varchar(50),

    foreign key (idUser1) references users(id),
    foreign key (idUser2) references users(id)
);

drop table Friends;