create or replace function getSubscribersOf(userId varchar(50), skip integer = null, take integer = null)
returns setof returned_users as $$
begin
    call checkskipandtake(skip, take);

    return query
    select
        returned_users.*
    from
        returned_users
        join subscribers as s
            on s.subscriber = returned_users.id and s.subscribeto = $1
    offset skip
    limit take;

    exception
        when others then
            raise exception '%', sqlerrm;
end;
$$ language plpgsql;

select * from getSubscribersOf('YLZXq6IP91I7A16Qc4wH5dweWJrwht4ZJFS7SsC7B4Pf8zP7fI');
