create or replace function checkSendMessageDto(_from varchar(50), _to varchar(50), msg varchar(3000), type varchar(20))
returns boolean as $$
declare
    exc text := '';
    isCorrectMsg boolean := checkMessage($3);
    isCorrectType boolean := checkMessageType($4);
begin
    if checkidonexist($1) then
        exc := generatenotfoundusererror($1);
    end if;
    if checkidonexist($2) then
        if exc = '' then
            exc := generatenotfoundusererror($2);
        else
            exc := unionexceptions(exc, generatenotfoundusererror($2));
        end if;
    end if;
    if not isCorrectMsg then
        if exc = '' then
            exc := generatemsgerror();
        else
            exc := unionexceptions(exc, generatemsgerror());
        end if;
    end if;
    if not isCorrectType then
        if exc = '' then
            exc := generatemsgtypeerror();
        else
            exc := unionexceptions(exc, generatemsgtypeerror());
        end if;
    end if;

    if isCorrectType and isCorrectMsg and not checkMsgOnType($3, $4) then
        if exc = '' then
            exc := generatemsgonmsgtypeerror();
        else
            exc := unionexceptions(exc, generatemsgonmsgtypeerror());
        end if;
    end if;

    if exc <> '' then
        raise exception '%', exc;
    end if;

    return true;
end;
 $$ language plpgsql;

create or replace function checkMessage(message varchar(3000))
returns boolean as $$
declare
    length integer := length(message);
begin
    return not (length > 3000 or length < 1);
end;
$$ language plpgsql;

create or replace function checkMessageType(type varchar(20))
returns boolean as $$
begin
    return exists(
    select
        *
    from
        messagestypes as mt
    where
        mt.type = $1);
end;
$$ language plpgsql;

create or replace function checkMsgOnType(msg varchar(3000), type varchar(20))
returns boolean as $$
declare
    isExist boolean;
begin
    if type = 'sticker' then
        select
            exists(
            select
                *
            from
                stickers as s
            where
                s.stickerid = msg) into isExist;

        return isExist;
    end if;
    return true;
end;
$$ language plpgsql;