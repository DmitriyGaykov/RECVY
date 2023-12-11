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


create or replace function getLastPhotoById(id varchar(50))
returns varchar(1000)
as $$
    declare photos varchar(1000)[] = getphotosbyid(id);
begin
    if array_length(photos, 1) = 0 then
        return null;
    end if;

    return photos[array_length(photos, 1)];
end;
$$ language plpgsql;

select * from getphotosbyid('81L086RIcklaeZJUciC6zJDUS1q565x1N28V799gazpCTmcD22');
select getLastPhotoById('81L086RIcklaeZJUciC6zJDUS1q565x1N28V799gazpCTmcD22');