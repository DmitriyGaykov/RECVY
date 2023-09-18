create or replace function getRolesOf(_id varchar(50))
returns text[] as $$
begin
    return array(
        select
            role
        from
            usersroles
        where
            userid = _id
        );
end;
$$ language plpgsql;