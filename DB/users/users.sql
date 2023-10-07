create user VISITOR
    PASSWORD '123123123';

create user APP_USER
    PASSWORD '123123123';

create user APP_ADMIN
    PASSWORD  '123123123';

grant
    rl_visitor
to visitor;

grant
    rl_user
to app_user;

grant
    rl_admin
to app_admin;