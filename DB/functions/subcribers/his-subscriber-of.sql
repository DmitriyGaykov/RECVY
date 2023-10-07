create or replace function hisSubscriberOf(his varchar(50), of varchar(50))
returns boolean
as $$
    declare
        count integer;
begin
    count := (
        select
            count(*)
        from
            subscribers
        where
            subscriber = his and
            subscribeto = of
    );

    return count != 0;
end;
$$ language plpgsql;

select hisSubscriberOf('YLZXq6IP91I7A16Qc4wH5dweWJrwht4ZJFS7SsC7B4Pf8zP7fI', 'YLZXq6IP91I7A16Qc4wH5dweWJrwht4ZJFS7SsC7B4Pf8zP7fI');