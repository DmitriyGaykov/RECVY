create or replace function searchSubs(stext text, userid varchar(50), skip integer = null, take integer = null)
    returns setof returned_users as
$$
declare
    searchtext text := '%' || lower(stext) || '%';
begin
    call checkskipandtake(skip, take);

    return query
        select *
        from returned_users as u
        where issubscribingexist(u.id,userid) and
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

select * from searchSubs('I', '81L086RIcklaeZJUciC6zJDUS1q565x1N28V799gazpCTmcD22');