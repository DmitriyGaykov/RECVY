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