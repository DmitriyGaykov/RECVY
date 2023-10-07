create role RL_USER;

grant RL_VISITOR to RL_USER;

grant insert on friends to RL_USER;
grant delete on friends to RL_USER;
grant select on friends to RL_USER;
grant insert on messages to RL_USER;
grant delete on messages to RL_USER;
grant update on messages to RL_USER;
grant select on messages to RL_USER;
grant select on messagestypes to RL_USER;
grant select on stickers to RL_USER;
grant insert on subscribers to RL_USER;
grant delete on subscribers to RL_USER;
grant select on subscribers to RL_USER;
grant delete on photos to RL_USER;
grant select on users to RL_USER;
grant update on users to RL_USER;

grant select on returned_users to RL_USER;
