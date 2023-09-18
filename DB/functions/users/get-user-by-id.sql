create or replace function getUserById(_id varchar(50))
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
        getphotosbyid(users.id),
        users.login
    into
        user
    from
        users
    where
        users.id = id;

    return user;
end;
$$ language plpgsql;

select * from getUserById('xw4p6RB8232cXS06Ex2M10KKv4VQ9zNUTCrDOg6GxVkNkJLOfA')