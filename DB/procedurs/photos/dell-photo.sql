create or replace procedure dellPhoto(_userid varchar(50), _photo varchar(1000))
language plpgsql as $$
begin
    delete from
               photos
           where
               userid = $1 and
               photo = $2;
end;
$$;
