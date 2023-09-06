create table Photos (
  userId varchar(50),
  photo varchar(1000) unique,

  foreign key (userId) references users(id)
);

drop table Photos;