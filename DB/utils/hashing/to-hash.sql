create or replace function toHash (password varchar(256))
returns varchar(256)
as $$
begin
    return sha256(password::bytea);
end;
$$ language plpgsql;
