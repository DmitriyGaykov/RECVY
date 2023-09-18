create or replace function generateSkipError()
returns text as $$
begin
    return generateexception(
        'skip',
        'Аргумент skip должен быть больше или равен 0 или вообще не указывайте его'
        );
end;
$$ language plpgsql;

create or replace function generateTakeError()
returns text as $$
begin
    return generateexception(
        'take',
        'Аргумент take должен быть больше или равен 0 или вообще не указывайте его'
        );
end;
$$ language plpgsql;