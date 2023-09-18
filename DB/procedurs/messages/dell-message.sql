create or replace procedure dellMessage(id varchar(256))
language plpgsql as $$
begin
    delete from messages
    where
        messageid = $1;
end;
$$;
