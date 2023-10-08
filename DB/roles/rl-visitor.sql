create role RL_VISITOR;

grant connect on database recvy to RL_VISITOR;

grant SELECT on users to RL_VISITOR;
grant INSERT on users to RL_VISITOR;
grant insert on photos to RL_VISITOR;
grant select on photos to RL_VISITOR;
grant select on blockedusers to RL_VISITOR;
grant select on roles to RL_VISITOR;
grant select on usersroles to RL_VISITOR;
grant insert on usersroles to RL_VISITOR;
grant execute on procedure setuserrole to RL_VISITOR;

grant execute on FUNCTION signin to RL_VISITOR;
grant execute on FUNCTION signup to RL_VISITOR;

insert into usersroles(userid, role) values ('emI7j4Bjo5ol8e839YzCbJV2wGW6Tbs1deZlp1K1Z3a2I6R41F', 'user');

revoke all privileges on all tables in schema public from RL_VISITOR;
drop role RL_VISITOR;