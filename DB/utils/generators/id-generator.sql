create or replace function generateId(countSymbols integer)
returns text
as $$
declare
    id text = '';
    i integer;
    symbol char;
begin
    for i in 1..countSymbols loop
        -- Генерируем случайный символ буквы, цифры или большой буквы
        case floor(random() * 3)::integer
            when 0 then
                -- Генерируем случайную букву в нижнем регистре (a-z)
                symbol = chr(floor(random() * 26 + 97)::integer);
            when 1 then
                -- Генерируем случайную букву в верхнем регистре (A-Z)
                symbol = chr(floor(random() * 26 + 65)::integer);
            when 2 then
                -- Генерируем случайную цифру (0-9)
                symbol = chr(floor(random() * 10 + 48)::integer);
        end case;

        id = id || symbol::text;
    end loop;

    return id;
end;
$$ language plpgsql;

