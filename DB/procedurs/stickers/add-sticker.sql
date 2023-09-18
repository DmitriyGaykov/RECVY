create or replace procedure addSticker(_stickerpath varchar(1000))
language plpgsql as $$
declare
    _id varchar(50) = generateid(50);
begin
    if not checkimage($1) then
        raise exception '%', generateimageerror();
    end if;

    if exists(select * from stickers where stickers.sticker = $1) then
        raise exception '%', generatestickeralreadyexisterror();
    end if;

    loop
        if _id not in (select stickerid from stickers) then
            exit;
        end if;

        _id = generateid(50);
    end loop;

    insert into stickers values (_id, $1);
end
$$;
