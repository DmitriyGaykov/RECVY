create or replace procedure editUserInfo(
    _id varchar(50),
    _firstname varchar(20) = null,
    _lastname varchar(20) = null,
    _password varchar(54) = null,
    _aboutme varchar(100) = null,
    _age integer = null
) language plpgsql as $$
begin
    if $2 is not null then
        if not checknameandlastname($2) then
            raise exception '%', generatenameerror();
        end if;

        update
            users
        set
            firstname = $2
        where
            id = $1;
    end if;

    if $3 is not null then
        if not checknameandlastname($3) then
            raise exception '%', generatelastnameerror();
        end if;

        update
            users
        set
            lastname = $3
        where
            id = $1;
    end if;

    if $4 is not null then
        if not checkpassword($4) then
            raise exception '%', generatepassworderror();
        end if;

        update
            users
        set
            password = tohash($4)
        where
            id = $1;
    end if;

    if $5 is not null then
        update
            users
        set
            aboutme = $5
        where
            id = $1;
    end if;

    if $6 is not null then
        if not checkage($6) then
            raise exception '%', generateageerror();
        end if;

        update
            users
        set
            age = $6
        where
            id = $1;
    end if;

    exception
        when others then
            rollback;
            raise exception '%', sqlerrm;
end;
$$;

call editUserInfo('YLZXq6IP91I7A16Qc4wH5dweWJrwht4ZJFS7SsC7B4Pf8zP7fI', _lastname := '4gtgf');
select * from getusers();

select * from getstickers();