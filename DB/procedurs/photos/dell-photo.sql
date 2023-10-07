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

select * from photos;
call dellPhoto('YLZXq6IP91I7A16Qc4wH5dweWJrwht4ZJFS7SsC7B4Pf8zP7fI', 'hel2lo.png');