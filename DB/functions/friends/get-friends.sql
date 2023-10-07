create or replace function getFriendsOf(userid varchar(50), skip integer = null, take integer = null)
returns setof returned_users as $$
begin
    call checkskipandtake(take, skip);

    return query (
        select
            returned_users.*
        from
            returned_users
        join
            friends on
                (
                    friends.iduser1 = userid or
                    friends.iduser2 = userid
                ) and returned_users.id != userid
        offset skip
        limit take);

    exception
        when others then
            raise exception '%', sqlerrm;
end;
$$ language plpgsql;

select * from getFriendsOf('1');