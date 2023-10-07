create or replace function getUserById(_id varchar(50))
returns usertype as $$
declare
    user usertype;
begin
    select
        users.id,
        users.login,
        users.firstname,
        users.lastname,
        users.aboutme,
        users.age,
        getrolesof(_id),
        users.regdate,
        getphotosbyid(users.id)
    into
        user
    from
        users
    where
        users.id = _id;

    return user;
end;
$$ language plpgsql;

select *
from getUserById('YLZXq6IP91I7A16Qc4wH5dweWJrwht4ZJFS7SsC7B4Pf8zP7fI');