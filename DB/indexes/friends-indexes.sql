create index idx_friends_iduser1 on friends(iduser1) tablespace indextablespace;
create index idx_friends_iduser2 on friends(iduser2) tablespace indextablespace;
create index idx_friends_iduser1_iduser2 on friends(iduser1, iduser2) tablespace indextablespace;