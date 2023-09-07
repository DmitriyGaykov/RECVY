create or replace procedure addPhoto(id varchar(50), photo varchar(1000))
language plpgsql as $$
begin
    if checkimage(photo) then
        insert into photos(userid, photo) values (id, photo);
    else
        raise exception '%', generateimageerror();
    end if;
end;
$$;


