create or replace function signIn(_login varchar(20), _password varchar(256))
returns table (
    id varchar(50),
    login varchar(20)
)
language plpgsql as $$
declare
    hash text;
    _id varchar = null;
begin
    hash := tohash(_password);

    select
        users.id
    into
        _id
    from
        users
        join getuserbylogin(_login) as jusers on
            jusers.login = users.login and
            jusers.password = hash;

    if _id is null then
        raise exception '%', generatenotloggedinerror();
    else
        return query select _id as id, _login as login;
    end if;
end;
$$;

create or replace function signIn(_login text, _password text)
returns table (
    id varchar(50),
    login varchar(20)
)
language plpgsql as $$
begin
    return query select * from signIn(_login::varchar, _password::varchar);
    exception
        when others then
            raise exception '%', SQLERRM;
end;
$$;

