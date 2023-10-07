create or replace function getLastMessage(_from varchar(50), _to varchar(50))
returns setof messages
as $$
begin
    return query
    select
        *
    from
        messages
    where
        (iduserfrom = _from and iduserto = _to) or
        (iduserfrom = _to and iduserto = _from)
    order by
        sentdate desc
    limit 1;
end;
$$ language plpgsql;

select * from getLastMessage('YLZXq6IP91I7A16Qc4wH5dweWJrwht4ZJFS7SsC7B4Pf8zP7fI', 'YLZXq6IP91I7A16Qc4wH5dweWJrwht4ZJFS7SsC7B4Pf8zP7fI');