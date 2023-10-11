create or replace function getMessages(_from varchar(50), _to varchar(50), skip integer = null, take integer = null)
returns setof messages as $$
begin
    call checkskipandtake(skip, take);

    return query
        select * from messages
        where
            (iduserfrom = _from and iduserto = _to) or
            (iduserfrom = _to and iduserto = _from)
        order by sentdate desc
        limit take
        offset skip;

    exception
        when others then
            raise exception '%', sqlerrm;
end;
$$ language plpgsql;

select * from messages;