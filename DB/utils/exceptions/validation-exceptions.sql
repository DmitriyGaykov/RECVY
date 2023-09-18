create or replace function generateException(key text, error text)
returns text
as $$
begin
    return key || ':' || error;
end;
$$ language plpgsql;

create or replace function unionExceptions(error1 text, error2 text)
returns text
as $$
begin
    return error1 || '&' || error2;
end;
$$ language plpgsql;

create or replace function generateNameError()
returns text
as $$
begin
    return generateException(
        'firstname',
        'Имя должно быть либо только на русском языке, либо только на английском. Количество символов от 2 до 20. Первая буква должна быть большой.');
end;
$$ language plpgsql;

create or replace function generateLastnameError()
returns text
as $$
begin
     return generateException(
        'lastname',
        'Фамилия должна быть либо только на русском языке, либо только на английском. Количество символов от 2 до 20. Первая буква должна быть большой.');
end;
$$ language plpgsql;

create or replace function generatePasswordError()
returns text
as $$
begin
    return generateException(
        'password',
        'Пароль должен состоять от 8 до 64 символов. В пароле могут быть буквы русского и латинского алфавита, цифры, знак "_"'
        );
end;
$$ language plpgsql;

create or replace function generateAgeError()
returns text
as $$
begin
    return generateException(
        'age',
        'Возраст должен быть от 6 до 150 лет.'
        );
end;
$$ language plpgsql;

create or replace function generateImageError()
returns text
as $$
begin
    return generateException(
        'photo',
        'Фото должно иметь одно из расширений jpg|jpeg|png|gif|bmp|svg|webp|tiff|ico. Или такой файл уже существует'
        );
end;
$$ language plpgsql;

create or replace function generateLoginUsedError()
returns text
as $$
begin
    return generateexception(
        'login',
        'Логин уже занят!'
        );
end;
$$ language plpgsql;

create or replace function generateNotCorrectLoginError()
returns text
as $$
begin
    return generateexception(
        'login',
        'Логин должен состоять от 6 до 20 символов. Логин допускает буквы русского/латинского алфавитов и цифры.'
        );
end;
$$ language plpgsql;

create or replace function generateNotLoggedInError()
returns text
as $$
begin
    return generateexception(
        'error',
        'Пользователь не авторизован!'
        );
end;
$$ language plpgsql;