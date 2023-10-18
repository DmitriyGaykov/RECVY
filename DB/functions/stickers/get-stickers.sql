create or replace function getStickers(skip int = null, take int = null)
returns setof stickers
as $$
begin
    call checkskipandtake(skip, take);

    return query
    select
        *
    from
        stickers
    offset skip
    limit take;

    exception
        when others then
            raise exception '%', sqlerrm;
end;
$$ language plpgsql;

create or replace function getStickerById(id varchar)
returns setof stickers
as $$
begin
    return query
    select
        *
    from
        stickers
    where
        stickerid = id;
end;
$$ language plpgsql;

select * from getStickerById('692dT94ZWPa6t87hKq10Te4928VKszAQcOzPY9YZVU93i0H2SD');