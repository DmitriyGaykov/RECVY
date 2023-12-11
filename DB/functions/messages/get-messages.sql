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

select iduserfrom, iduserto, message from messages order by sentdate desc limit 10 offset 0;

select * from messages where iduserfrom = 'MfhE4T8XrV5urZXlXp9gM7f4940emJb8NbnE43UjFz5ZPUdQ6y' or iduserto = 'MfhE4T8XrV5urZXlXp9gM7f4940emJb8NbnE43UjFz5ZPUdQ6y';
select * from getMessages('MfhE4T8XrV5urZXlXp9gM7f4940emJb8NbnE43UjFz5ZPUdQ6y', 'qQhI80pjjWM6M1bxAa3LJs5aI1f6JJjIro39lzjEsAdEutyxlK');