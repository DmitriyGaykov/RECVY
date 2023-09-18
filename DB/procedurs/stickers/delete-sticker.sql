create or replace procedure deleteSticker (idSticker varchar(50))
language plpgsql as $$
begin
    delete from stickers where stickerid = idSticker;
end;
$$
