create or replace function getPhotosById(id varchar(50))
returns varchar(1000)[]
as $$
begin
    return array(
        select
            photo
        from
            photos
        where
            photos.userId = id);
end;
$$ language plpgsql;

