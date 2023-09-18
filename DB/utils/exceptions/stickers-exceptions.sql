create or replace function generateStickerAlreadyExistError()
returns text
as $$
begin
    return generateexception(
        'error',
        'Стикер с таким путем уже существует'
        );
end;
$$ language plpgsql;