create or replace function getUsers(skip integer = null, take integer = null)
returns setof returned_users as $$
begin
    return query (
        select
            *
        from
            returned_users
        offset skip
        limit take
        );
end;
$$ language plpgsql;

select * from getUsers(0, 10)