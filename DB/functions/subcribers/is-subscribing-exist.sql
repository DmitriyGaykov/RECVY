create or replace function isSubscribingExist(_who varchar(50), _on varchar(50))
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
        subscriber = _who and subscribeto = _on
    );

    return count != 0;
end;
$$ language plpgsql;

select * from messages order by sentdate desc limit 1;

call subscribe('81L086RIcklaeZJUciC6zJDUS1q565x1N28V799gazpCTmcD22','MfhE4T8XrV5urZXlXp9gM7f4940emJb8NbnE43UjFz5ZPUdQ6y');

select isSubscribingExist('81L086RIcklaeZJUciC6zJDUS1q565x1N28V799gazpCTmcD22', 'YLZXq6IP91I7A16Qc4wH5dweWJrwht4ZJFS7SsC7B4Pf8zP7fI');