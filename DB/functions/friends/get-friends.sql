create or replace function getFriendsOf(userid varchar(50), skip integer = null, take integer = null)
returns setof returned_users as $$
begin
    call checkskipandtake(take, skip);

    return query (
        select
        returned_users.*
    from
        returned_users
    where
        returned_users.id in (
            select
                friends.iduser1
            from
                friends
            where
                friends.iduser2 = userid
            union
            select
                friends.iduser2
            from
                friends
            where
                friends.iduser1 = userid
        )
        offset skip
        limit take);

    exception
        when others then
            raise exception '%', sqlerrm;
end;
$$ language plpgsql;

select * from getFriendsOf('81L086RIcklaeZJUciC6zJDUS1q565x1N28V799gazpCTmcD22');