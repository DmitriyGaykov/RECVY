create or replace function getFriendsOf(userid varchar(50), skip integer = null, take integer = null)
returns setof returned_users as $$
begin
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
end;
$$ language plpgsql;
