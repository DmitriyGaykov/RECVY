create table MessagesTypes (
    type varchar(20) primary key
) tablespace SystemTablespace;

insert into MessagesTypes values ('text');
insert into MessagesTypes values ('sticker');
insert into MessagesTypes values ('voice');