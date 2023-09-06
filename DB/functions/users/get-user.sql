create or replace function getUser(_id varchar(50))
returns usertype as $$
declare
    user usertype;
begin
    select
        users.id,
        users.firstname,
        users.lastname,
        users.aboutme,
        users.age,
        users.role,
        users.regdate,
        getphotosbyid(users.id)
    into
        user
    from
        users
    where
        users.id = id;

    return user;
end;
$$ language plpgsql;