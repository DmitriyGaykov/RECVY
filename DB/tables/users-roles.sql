create table UsersRoles (
  userId varchar(50),
  role varchar(20),

  foreign key (userId) references users(id),
  foreign key (role) references roles(role)
);