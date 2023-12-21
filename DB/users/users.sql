create user VISITOR
    PASSWORD '123123123';

create user APP_USER
    PASSWORD '123123123';

create user APP_ADMIN
    PASSWORD  '123123123';

create user APP_MAINADMIN
    PASSWORD '123123123';

grant
    rl_visitor
to visitor;

grant
    rl_user
to app_user;

grant
    rl_admin
to app_admin;

grant
    rl_mainadmin
to app_mainadmin;

drop user APP_MAINADMIN;

insert into users(id, login, firstname, lastname, password, aboutme, age) values ('0', 'RECVYADMIN', 'RECVY', 'ADMIN', '123123123', 'Администратор этого замечательного приложения', 20);
call addphoto('0', 'admin.jpg');
insert into usersroles(userid, role) values ('0', 'mainadmin');

select * from getuserbyid('BrXl3wn6qatF69XV26h6Nk8askQ748TH4RpVefVKAspe30DZzr');