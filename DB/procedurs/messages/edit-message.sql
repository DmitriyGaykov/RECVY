create or replace procedure editMessage(id varchar(256), newvalue varchar(3000))
language plpgsql as $$
begin
    if not exists(select * from messages where messageid = id and messagetype = 'text') then
        raise exception '%', generateeditmsgerror();
    end if;

    if not checkmessage(newvalue) then
        raise exception '%', generatemsgerror();
    end if;

    update
        messages
    set
        message = newvalue
    where
        messageid = id;
end;
$$;