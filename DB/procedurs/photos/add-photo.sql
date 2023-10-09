create or replace procedure addPhoto(id varchar(50), photo varchar(1000))
language plpgsql as $$
begin
    if not exists (select * from users where users.id = $1) then
        raise exception '%', generatenotfoundusererror($1);
    end if;
    if checkimage(photo) then
        insert into photos(userid, photo) values (id, photo);
    else
        raise exception '%', generateimageerror();
    end if;
end
$$;


select * from getusers();
