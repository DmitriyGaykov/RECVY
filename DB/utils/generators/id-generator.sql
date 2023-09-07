create or replace function generateId(countSymbols integer)
returns text
as $$
declare
    id text = '';
    i integer;
    symb char = 'z'::char;
begin
    for i in 1..countSymbols loop
        symb = chr(floor(random() * 255)::integer);
        id = id || symb::text;
    end loop;

    return id;
end;
$$ language plpgsql;
