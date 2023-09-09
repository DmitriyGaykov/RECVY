create or replace function getSubscribersOf(userId varchar(50), skip integer = null, take integer = null)
returns table (
    id varchar(50),
    firstName varchar(20),
    lastName varchar(20),
    aboutMe varchar(300),
    age integer,
    regDate timestamp,
    photos varchar(1000)[],
    role varchar(20)
) as $$
begin
    return query
    select
        u.id,
        u.firstname,
        u.lastname,
        u.aboutme,
        u.age,
        u.regdate,
        getphotosbyid(u.id),
        u.role
    from
        subscribers as s
        join users as u
            on s.subscriber = u.id
    where
         s.subscribeto = userid
    offset skip
    limit take;

end;
$$ language plpgsql;

call subscribe('íuÃ÷è''''yBÌéÑß0Á|7¶ò}-çÈ¥F-×ôÍÏ°Wù', 'íuÃ÷è''yBÌéÑß0Á|7¶ò}-çÈ¥F-×ôÍÏ°Wù')