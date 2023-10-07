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

select * from getstickers();