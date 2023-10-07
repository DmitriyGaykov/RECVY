create or replace function checkNameAndLastname(text varchar(20))
returns boolean
as $$
begin
    if length(text) < 2 or length(text) > 20 then
        return false;
    end if;

    return text ~ '^(([A-Z][a-z]+)|([А-Я][а-я]+))$';
end
$$ language plpgsql;

create or replace function checkAge(age integer)
returns boolean
as $$
begin
    return age > 6 and age < 150;
end;
$$ language plpgsql;


create or replace function checkPassword(password varchar(256))
returns boolean
as $$
begin
    return password ~ '^[A-Za-zА-Яа-я0-9_]{8,64}$';
end;
$$ language plpgsql;

create or replace function checkImage(image varchar(1000))
returns boolean
as $$
begin
    if image ~ '\.(jpg|jpeg|png|gif|bmp|svg|webp|tiff|ico)$' then
        return (select count(*) from photos where photos.photo = image) = 0;
    end if;

    return false;
end;
$$ language plpgsql;

create or replace function checkIdOnExist(_id varchar(50))
returns boolean
as $$
declare
    _count integer;
begin
    _count = (select count(*) from users where users.id = _id);
    return _count = 0;
end;
$$ language plpgsql;

create or replace function checkLogin(_login varchar(20))
returns integer
as $$
declare
    length integer;
begin
    length := length(_login);

    if not _login ~ '[A-Za-zА-Яа-я0-9]{6,20}' then
        return -1;
    end if;

    return (select count(*) from users where users.login = _login);
end;
$$ language plpgsql;

create or replace function checkAboutMe(_about_me varchar(300))
returns boolean
as $$
    declare
        length int :=  length(_about_me);
begin
    return $1 is null or length < 300;
end;
$$ language plpgsql;

create or replace function checkUserWasBanned(id varchar(50))
returns varchar
as $$
    declare
        _reason varchar(300) = null;
begin
    select
        reason
    into
        _reason
    from
        blockedusers
    where
        userid = id;

    return _reason;
end;
$$ language plpgsql;