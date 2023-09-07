create or replace function getUserByLogin(_login varchar(20))
returns table (
    login varchar(20),
    password varchar(256)
)
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
