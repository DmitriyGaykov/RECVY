create or replace procedure setAdminRole(_id varchar(50))
language plpgsql as $$
begin
    if exists(select * from usersroles where userid = _id and role = 'admin') then
        return;
    end if;

    insert into usersroles values (_id, 'admin');
end;
$$