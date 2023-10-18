create or replace function getUserById(_id varchar(50))
returns usertype as $$
declare
    user usertype;
    _reason varchar(300) = '';
begin
    select
        reason
    into
        _reason
    from
        blockedusers
    where
        userid = _id;

    if _reason <> '' then
        raise exception '%', generateexception('error', ('Пользователь заблокирован(' || _reason) || ')');
    end if;

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
from getUserById('81L086RIcklaeZJUciC6zJDUS1q565x1N28V799gazpCTmcD22');

