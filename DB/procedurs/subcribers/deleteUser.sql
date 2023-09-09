create or replace procedure deleteUser(_id varchar(50))
language plpgsql as $$
begin
    if not hasuserwithid(_id) then
        raise exception '%', generatenocontenterror();
    end if;

    begin
        delete from photos where userid = _id;
        delete from subscribers where subscribeto = _id or subscriber = _id;

        delete from users where id = _id;

        exception
            when others then
                rollback;
    end;
end;
$$;

