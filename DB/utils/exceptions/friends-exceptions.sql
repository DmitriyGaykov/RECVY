create or replace function generateDontAddToFriendError()
returns text
as $$
begin
    return generateexception(
        'error',
        'Пользователь не является вашим подпищиком!'
        );
end;
$$ language plpgsql;

create or replace function generateFriendsAlreadyExistError()
returns text
as $$
begin
    return generateexception(
        'error',
        'Пользователь уже является вашим другом!'
        );
end;
$$ language plpgsql;

create or replace function generateAddToFriendSelfError()
returns text
as $$
begin
    return generateexception(
        'error',
        'Нельзя добавить самого себя в друзья!'
        );
end;
$$ language plpgsql;