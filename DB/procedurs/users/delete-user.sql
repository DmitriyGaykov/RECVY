create or replace procedure deleteUser(_id varchar(50))
language plpgsql as $$
begin
    if not hasuserwithid(_id) then
        raise exception '%', generatenocontenterror();
    end if;

    begin
        delete from photos where userid = _id;
        delete from subscribers where subscribeto = _id or subscriber = _id;
        delete from friends where friends.iduser2 = _id or friends.iduser1 = _id;
        delete from messages where iduserfrom = _id or iduserto = _id;
        delete from usersroles where userid = _id;
        delete from blockedusers where userid = _id;
        delete from users where id = _id;

        exception
            when others then
                rollback;
                raise exception '%', SQLERRM;
    end;
end;
$$;

select * from stickers;