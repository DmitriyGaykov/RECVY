create or replace function generateExistSubscribeError()
returns text
as $$
begin
    return generateexception(
        'error',
        'Подписка уже существует'
        );
end;
$$ language plpgsql;

create or replace function generateYourselfSubscribeError()
returns text
as $$
begin
    return generateexception(
        'error',
        'Нельзя подписать на самого себя'
        );
end;
$$ language plpgsql;