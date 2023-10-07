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

select isSubscribingExist('81L086RIcklaeZJUciC6zJDUS1q565x1N28V799gazpCTmcD22', 'YLZXq6IP91I7A16Qc4wH5dweWJrwht4ZJFS7SsC7B4Pf8zP7fI');