create or replace function generateNotFoundUserError()
returns text
as $$
begin
    return generateexception(
        'error',
        'Пользователя не существует'
        );
end;
$$ language plpgsql;