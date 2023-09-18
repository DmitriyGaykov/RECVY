create or replace procedure checkSkipAndTake(skip integer = null, take integer = null)
as $$
    declare
        ex text := '';
begin
    if skip is not null and skip < 0 then
        ex := generateskiperror();
    end if;

    if take is not null and take < 0 then
        if ex = '' then
            ex := generatetakeerror();
        else
            ex := unionexceptions(ex, generatetakeerror());
        end if;
    end if;

    if ex <> '' then
        raise exception '%', ex;
    end if;
end;
$$ language plpgsql;