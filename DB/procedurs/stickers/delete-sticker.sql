create or replace procedure deleteSticker (idSticker varchar(50))
language plpgsql as $$
begin
    delete from stickers where stickerid = idSticker;
    delete from messages where message = idSticker and messagetype = 'sticker';
end;
$$;

call deletesticker('Q57L75DB873241rikX26wjRJhVLQ9Z213xm0MZ8Ba46C65NH4D');