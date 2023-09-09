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