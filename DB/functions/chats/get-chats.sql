create or replace function getChats(_userid varchar, skip integer = null, take integer = null)
    returns table
            (
                iduserto    text,
                photo       text,
                firstname   text,
                lastmessage text,
                messagetype text,
                sentdate    timestamp
            )
as
$$
begin
    call checkskipandtake(skip, take);

    if not exists(select * from users where id = _userid) then
        raise exception '%', generatenotfoundusererror();
    end if;

    return query
        select ids.iduserto::text                                                       as iduserto,
               getlastphotobyid(ids.iduserto)::text                                     as photo,
               u.firstname::text                                                        as firstname,
               (select message from getlastmessage($1, ids.iduserto))::text             as lastmessage,
               (select gls.messagetype from getlastmessage($1, ids.iduserto) gls)::text as messagetype,
               (select gls.sentdate from getlastmessage($1, ids.iduserto) gls)          as sentdate
        from (select distinct (isthisorother($1, m.iduserto, m.iduserfrom)) as iduserto
              from messages m
              where $1 = m.iduserto
                 or $1 = m.iduserfrom) as ids
                 join users u
                      on ids.
                             iduserto = u.id
        order by sentdate desc
        offset skip limit take;
exception
    when others then
        raise exception '%', SQLERRM;
end;
$$ language plpgsql;

select *
from getChats('0');

create or replace function isThisOrOther(value text, first text, sec text)
    returns text
as
$$
begin
    if value = first then
        return sec;
    else
        return first;
    end if;
end;
$$ language plpgsql;
--
--
-- do
-- $$
--     declare
--         _userid varchar(50) = '0';
--     begin
--         select ids.iduserto                                                as iduserto,
--                u.firstname                                                 as firstname,
--                (select message from getlastmessage('0', ids.iduserto))     as lastmessage,
--                (select messagetype from getlastmessage('0', ids.iduserto)) as messagetype,
--                (select sentdate from getlastmessage('0', ids.iduserto))    as senttime,
--                (select * from getphotosbyid(ids.iduserto))                 as photo
--         from (select distinct (isthisorother('0', m.iduserto, m.iduserfrom)) as iduserto
--               from messages m
--               where '0' = m.iduserto
--                  or '0' = m.iduserfrom) as ids
--                  join users u
--                       on ids.
--                              iduserto = u.id;
--     end;
-- $$ language plpgsql;
--
-- select *
-- from sendmessage('0', 'pn7ZBbE1kK688he4HVgAO4frXYBq6j8uzE6kL8O12Sl6TYIq51', 'Hello mir', 'text');
-- call sendtoeveryone('Ghj');
--
-- explain analyse
-- select *
-- from getChats('0');
