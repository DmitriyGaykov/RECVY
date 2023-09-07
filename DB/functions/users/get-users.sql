create or replace function getUsers(skip integer = null, take integer = null)
returns table (
    id varchar(50),
    login varchar(20),
    firstName varchar(20),
    lastName varchar(20),
    aboutMe varchar(300),
    age integer,
    regDate timestamp,
    photos varchar(1000)[],
    role varchar(20)
) as $$
begin
    return query (
        select
            users.id,
            users.login,
            users.firstname,
            users.lastname,
            users.aboutme,
            users.age,
            users.regdate,
            getphotosbyid(users.id) as photos,
            users.role
        from
            users
        offset skip
        limit take
        );
end;
$$ language plpgsql;

