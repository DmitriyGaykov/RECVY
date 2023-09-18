create or replace procedure pickUpRole(_id varchar(50), _role varchar(20))
language plpgsql as $$
begin
    delete from usersroles
    where
        userid = _id and
        role = _role;
end;
$$;