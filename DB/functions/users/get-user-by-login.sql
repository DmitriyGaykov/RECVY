create or replace function getUserByLogin(_login varchar(20))
returns setof loginpasswordview
as $$
begin
    return query (
    select
        users.login as login,
        users.password as password
    from
        users
    where
        users.login = _login);
end;
$$ language plpgsql;

select * from getUserByLogin('123123123');