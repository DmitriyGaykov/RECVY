create table Subscribers (
    subscriber varchar(50),
    subscribeTo varchar(50),

    foreign key (subscriber) references users(id),
    foreign key (subscribeTo) references users(id)
);

drop table Subscribers;