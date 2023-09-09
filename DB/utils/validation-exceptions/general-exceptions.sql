create or replace function generateNoContentError()
returns text
as $$
begin
    return generateexception(
        'error',
        'Нет контента!'
        );
end;
$$ language plpgsql;