create or replace function searchBlockedUsers(stext text, skip integer = null, take integer = null)
    returns setof returned_users as
$$
declare
    searchtext text := '%' || lower(stext) || '%';
begin
    call checkskipandtake(skip, take);

    return query
        select *
        from returned_users as u
        where u.id in (select bu.userid from blockedusers as bu)
          and (lower(u.firstname || ' ' || u.lastname) ilike searchtext
            or lower(u.lastname || ' ' || u.firstname) ilike searchtext
            or lower(u.firstname) ilike searchtext
            or lower(u.lastname) ilike searchtext)
        offset skip limit take;

exception
    when others then
        raise exception '%', SQLERRM;
end;
$$ language plpgsql;

select *
from searchBlockedUsers('Дар', 0, 8);