create or replace function getStickers(skip int = null, take int = null)
returns setof stickers
as $$
begin
    return query
    select
        *
    from
        stickers
    offset skip
    limit take;
end;
$$ language plpgsql;