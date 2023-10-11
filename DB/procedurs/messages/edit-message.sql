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
        message = newvalue,
        isedited = true
    where
        messageid = id;
end;
$$;


select * from sendmessage('YLZXq6IP91I7A16Qc4wH5dweWJrwht4ZJFS7SsC7B4Pf8zP7fI', 'YLZXq6IP91I7A16Qc4wH5dweWJrwht4ZJFS7SsC7B4Pf8zP7fI', 'Hello mir', 'text');
select * from messages;
call editMessage('2p7Gxwh4W2668O27MbDLI2W1Hd2ahwNeU697z08RLogh8MtlJxx7fOo6bI2s0f6CB9tT62zmK2LtWc5rRq2P6V086A0iVDLYBiJ3YGR2g23KvzgL4R82bniEjd380pLZC22OP3Ahn1JttX5UBqw8a6167ffMR2O59cd0XV86S38BxSZ91P6WS0D3AeANy64jsUB06nRJM42vPq42M3fbnCU68cVIeF41HIfp1IFtL3f5qlt4x3dH1UDx4RRjAA4J', 'Привет мир');