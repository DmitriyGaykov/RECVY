create or replace function getSubscribersOf(userId varchar(50), skip integer = null, take integer = null)
returns setof returned_users as $$
begin
    return query
    select
        returned_users.*
    from
        returned_users
        join subscribers as s
            on s.subscriber = returned_users.id and s.subscribeto = $1
    offset skip
    limit take;

end;
$$ language plpgsql;

