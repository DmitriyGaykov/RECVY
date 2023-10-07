create unique index unique_users_login_index on users(login) tablespace indextablespace;
create index idx_users_firstname on users(firstname) tablespace indextablespace;
create index idx_users_lastname on users(lastname) tablespace indextablespace;