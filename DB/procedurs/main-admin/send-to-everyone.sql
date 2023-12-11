create or replace procedure sendToEveryone(message varchar(3000))
as $$
    declare
        users refcursor;
        _id varchar(50);
begin
    if not exists(select * from users where id = '0') then
        raise exception 'error&Main admin is not exist';
    end if;

    if not checkmessage(message) then
        raise exception '%', generatemsgerror();
    end if;

    open users for select id from users where id <> '0';

    loop
        fetch users into _id;
        exit when not found;
        perform sendmessage('0', _id, message, 'text');
    end loop;

    close users;
end;
$$ language plpgsql;

call sendtoeveryone('Тестирование');
delete from messages where iduserto = '0' or iduserfrom = '0';
