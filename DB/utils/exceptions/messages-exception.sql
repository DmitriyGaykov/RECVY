create or replace function generateMsgError()
returns text as $$
begin
    return generateexception(
        'message',
        'Сообщение должно содержать как минимум 1 символ, но не более 3000 символов'
        );
end;
$$ language plpgsql;

create or replace function generateMsgTypeError()
returns text as $$
begin
    return generateexception(
        'messagetype',
        'Такова типа сообщений не существует'
        );
end;
$$ language plpgsql;

create or replace function generateMsgOnMsgTypeError()
returns text as $$
begin
    return generateexception(
        'sticker',
        'Если тип стикер, то msg должно содержать имя существующего стикера'
        );
end;
$$ language plpgsql;

create or replace function generateEditMsgError()
returns text as $$
begin
    return generateexception(
        'messagetype',
        'Редактировать можно только текстовые сообщения'
        );
end;
$$ language plpgsql;