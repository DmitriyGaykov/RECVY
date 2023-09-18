create or replace function isFriendsExist(user_id varchar(50), friend_id varchar(50))
returns boolean
as $$
begin
    return exists(
        select
            *
        from
            friends
        where
            (friends.iduser1 = $1 and friends.iduser2 = $2) or
            (friends.iduser1 = $2 and friends.iduser2 = $1));
end;
$$ language plpgsql;
