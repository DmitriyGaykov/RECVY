create or replace procedure dellChat(_iduser1 varchar(50), _iduser2 varchar(50))
language plpgsql as $$
begin
    delete from messages
           where
               (iduserfrom = $1 and iduserto = $2) or
               (iduserfrom = $2 and iduserto = $1);
end;
$$;

call dellChat('YLZXq6IP91I7A16Qc4wH5dweWJrwht4ZJFS7SsC7B4Pf8zP7fI', 'YLZXq6IP91I7A16Qc4wH5dweWJrwht4ZJFS7SsC7B4Pf8zP7fI');