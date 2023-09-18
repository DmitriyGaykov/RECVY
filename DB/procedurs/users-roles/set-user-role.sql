create or replace procedure setUserRole(_id varchar(50))
language plpgsql as $$
begin
    if exists(select * from usersroles where userid = _id and role = 'user') then
        return;
    end if;

    insert into usersroles values (_id, 'user');
end;
$$;