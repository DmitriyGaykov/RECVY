create or replace function signUp(
    login varchar(20),
    firstname varchar(20),
    lastname varchar(20),
    age integer,
    password varchar(256),
    photo varchar(1000) = null
)
returns varchar(50)
language plpgsql as $$
declare
    _exception text = '';
    temp text;
    id varchar(50);
    loginRes integer;
begin
    if not checknameandlastname(firstname) then
        _exception = generateNameError();
    end if;

    loginRes := checklogin(login);

    if loginRes = -1 then
        temp = generatenotcorrectloginerror();

        if _exception != '' then
            temp = unionexceptions(_exception, temp);
        end if;

        _exception = temp;
    else if loginRes > 0 then
        temp = generateloginusederror();

        if _exception != '' then
            temp = unionexceptions(_exception, temp);
        end if;

        _exception = temp;
    end if;
    end if;

    if not checknameandlastname(lastname) then
        temp = generatelastnameerror();

        if _exception != '' then
            temp = unionexceptions(_exception, temp);
        end if;

        _exception = temp;
    end if;

    if not checkage(age) then
        temp = generateageerror();

        if _exception != '' then
            temp = unionexceptions(_exception, temp);
        end if;

        _exception = temp;
    end if;

    if not checkpassword(password) then
        temp = generatepassworderror();

        if _exception != '' then
            temp = unionexceptions(_exception, temp);
        end if;

        _exception = temp;
    end if;

    if photo is not null and not checkimage(photo) then
        temp = generateimageerror();

        if _exception != '' then
            temp = unionexceptions(_exception, temp);
        end if;

        _exception = temp;
    end if;

    if _exception != '' then
        raise exception '%', _exception;
    else
        loop
            id = generateid(50)::varchar;

            if(checkidonexist(id)) then
                exit;
            end if;
        end loop;

        insert into users(id, login, firstname, lastname, password, age) values (id, login, firstname, lastname, password, age);
        if photo is not null then
            call addphoto(id, photo);
        end if;

        return id;
    end if;
    exception
        when others then
            raise exception 'Произошла ошибка: %', SQLERRM;
end
$$;

select * from signUp('1111112', 'Andrey','Shevtsov', 12, '123123123');

