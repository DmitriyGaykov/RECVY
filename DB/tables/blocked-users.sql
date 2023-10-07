create table BlockedUsers (
  userId varchar(50),
  blockedDate timestamp default CURRENT_TIMESTAMP,
  reason varchar(300)
) tablespace DataTablespace;

alter table BlockedUsers add foreign key (userid) references users(id);
alter table BlockedUsers add unique (userId);