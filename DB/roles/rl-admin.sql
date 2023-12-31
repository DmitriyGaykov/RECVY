create role RL_ADMIN;

grant RL_USER to RL_ADMIN;

grant execute on function messagetojson to RL_ADMIN;
grant execute on procedure usersfromjson to RL_ADMIN;

grant delete on stickers to RL_ADMIN;
grant insert on stickers to RL_ADMIN;
grant update on stickers to RL_ADMIN;
grant delete on blockedusers to RL_ADMIN;
grant insert on blockedusers to RL_ADMIN;
grant update on blockedusers to RL_ADMIN;
grant update on messagestypes to RL_ADMIN;
grant delete on messagestypes to RL_ADMIN;
grant insert on messagestypes to RL_ADMIN;
grant delete on roles to RL_ADMIN;
grant insert on roles to RL_ADMIN;
grant update on roles to RL_ADMIN;
grant delete on users to RL_ADMIN;
grant delete on usersroles to RL_ADMIN;
grant select on blocked_users to RL_ADMIN;

