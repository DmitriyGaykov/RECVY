create or replace procedure blockUser(_id varchar(50), _reason varchar(300))
language plpgsql as $$
begin
    if not exists(select * from users where id = _id) then
        raise exception '%', generatenotfoundusererror();
    end if;

    if exists(select * from blockedusers where userid = _id) then
        raise exception '%', generateexception('_id', 'Пользователь уже забанен');
    end if;

    insert into blockedusers(userid, reason) values (_id, _reason);
end;
$$;

create or replace procedure unBlockUser(_id varchar(50))
language plpgsql as $$
begin
    if not exists(select * from blockedusers where userid = _id) then
        raise exception '%', generateexception('error', 'Пользователь не был забанен');
    end if;

    delete from blockedusers where userid = _id;
end;
$$;
select * from blockedusers;