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

create or replace function generateNotFoundUserError(id varchar(50))
returns text
as $$
begin
    return generateexception(
        'error',
        'Пользователя с ID ' || id::text || ' не существует'
        );
end;
$$ language plpgsql;

create or replace function generateAboutMeError()
returns text
as $$
begin
    return generateexception(
        'aboutme',
        'Описание пользователя должно содержать до 300 символов'
        );
end;
$$ language plpgsql;

create or replace function generateYouAreBlockedError(reason text)
returns text
as $$
begin
    return generateexception(
        'error',
        ('Данный пользователь заблокирован. Причина >> ' || reason)
        );
end;
$$ language plpgsql;