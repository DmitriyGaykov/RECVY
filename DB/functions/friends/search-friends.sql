create or replace function searchFriends(stext text, friendsOf varchar(50), skip integer = null, take integer = null)
    returns setof returned_users as
$$
declare
    searchtext text := '%' || lower(stext) || '%';
begin
    call checkskipandtake(skip, take);

    return query
        select *
        from returned_users as u
        where isfriendsexist(u.id,friendsOf) and
            (lower(u.firstname || ' ' || u.lastname) ilike searchtext
            or lower(u.lastname || ' ' || u.firstname) ilike searchtext
            or lower(u.firstname) ilike searchtext
            or lower(u.lastname) ilike searchtext)
        offset skip limit take;

exception
    when others then
        raise exception '%', SQLERRM;
end;
$$ language plpgsql;

select * from friends;

select *
from searchFriends('ру', 'YLZXq6IP91I7A16Qc4wH5dweWJrwht4ZJFS7SsC7B4Pf8zP7fI');