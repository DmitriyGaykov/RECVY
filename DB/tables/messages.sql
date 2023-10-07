create table Messages (
  messageId varchar(256) primary key,

  idUserFrom varchar(50),
  idUserTo varchar(50),

  message varchar(3000),
  messageType varchar(20),

  isEdited boolean default false,

  sentDate timestamp default CURRENT_TIMESTAMP,

  foreign key (idUserFrom) references users(id),
  foreign key (idUserTo) references users(id),

  foreign key (messageType) references messagestypes(type)
) tablespace DataTablespace;

drop table Messages;