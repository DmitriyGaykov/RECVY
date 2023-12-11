create or replace function _isnull(value varchar, ifnullvalue varchar)
returns varchar as $$
BEGIN
    if value is null then
        return ifnullvalue;
    end if;

    return value;
end;
$$ language plpgsql;
