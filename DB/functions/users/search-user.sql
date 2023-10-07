create or replace function searchUser(stext text, skip integer = null, take integer = null)
returns setof returned_users as $$
    declare
        searchtext text := '%' || lower(stext) || '%';
begin
    call checkskipandtake(skip, take);

    return query
    select
        *
    from
        returned_users as u
    where
        lower(u.firstname || ' ' || u.lastname) ilike searchtext  or
        lower(u.lastname || ' ' || u.firstname) ilike searchtext or
        lower(u.firstname) ilike searchtext or
        lower(u.lastname) ilike searchtext
    offset skip
    limit take;

    exception
        when others then
            raise exception '%', SQLERRM;
end;
$$ language plpgsql;

select * from searchUser('i');