create table Photos (
  userId varchar(50),
  photo varchar(1000) unique,

  foreign key (userId) references users(id)
) tablespace DataTablespace;

drop table Photos;