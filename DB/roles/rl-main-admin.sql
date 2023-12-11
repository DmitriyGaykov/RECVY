create role RL_MAINADMIN;

grant RL_ADMIN to RL_MAINADMIN;
grant execute on function sendtoeveryone(varchar) to RL_MAINADMIN;

drop role RL_MAINADMIN;