create or replace function getChats(_userid varchar, skip integer, take integer)
returns table
    (
        iduserto varchar(50),
        photo varchar(1000),
        firstname varchar(50),
        lastmessage varchar(3000),
        messagetype varchar(30),
        sentdate timestamp
    )
as $$
begin
    call checkskipandtake(skip, take);

    if not exists(select * from users where id = _userid) then
        raise exception '%', generatenotfoundusererror();
    end if;

    return query
    select
        distinct(isThisOrOther($1, m.iduserto, m.iduserfrom)::varchar) as iduserto,
        (select p.photo from photos as p where p.userid = isThisOrOther($1, m.iduserto, m.iduserfrom) limit 1) as photo,
        u.firstname as firstname,
        lm.message as lastmessage,
        lm.messagetype as messagetype,
        lm.sentdate as senttime
    from
        messages as m
    join
        users as u on u.id = isThisOrOther($1, m.iduserto, m.iduserfrom)
    join
        getlastmessage(m.iduserto, m.iduserfrom) as lm on
            lm.iduserto = m.iduserto or
            lm.iduserto = m.iduserfrom
    where
        m.iduserfrom = $1 or
        m.iduserto = $1
    offset skip
    limit take;


    exception
        when others then
            raise exception '%', SQLERRM;
end;
$$ language plpgsql;

create or replace function isThisOrOther(value text, first text, sec text)
returns text
as $$
begin
    if value = first then
        return sec;
    else
        return first;
    end if;
end;
$$ language plpgsql;

select * from users;
select * from getChats('MfhE4T8XrV5urZXlXp9gM7f4940emJb8NbnE43UjFz5ZPUdQ6y', 0, 10);
