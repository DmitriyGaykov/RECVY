create or replace function getChat(iduser1 varchar(50), iduser2 varchar(50))
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
    return query
        select *
        from getchats(iduser1) as chats
        where chats.iduserto = iduser2;
end;
$$ language plpgsql;

select *
from getchats('81L086RIcklaeZJUciC6zJDUS1q565x1N28V799gazpCTmcD22');
select *
from getchat('81L086RIcklaeZJUciC6zJDUS1q565x1N28V799gazpCTmcD22',
             '81L086RIcklaeZJUciC6zJDUS1q565x1N28V799gazpCTmcD22');
