create or replace function getBlockedUsers(skip integer = null, take integer = null)
returns setof blocked_users
as $$
begin
    call checkskipandtake(skip, take);

    return query
        select
            *
        from
            blocked_users
        order by
            blocked_users.blockeddate desc
        offset skip
        limit take;

    exception
        when others then
            raise exception '%', sqlerrm;
end
$$ language plpgsql;

select * from getBlockedUsers(-1);
