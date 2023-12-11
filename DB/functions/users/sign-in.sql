create or replace function signIn(_login varchar(20), _password varchar(256))
returns varchar(50)
language plpgsql as $$
declare
    hash text;
    _id varchar = null;
    reason varchar(300) = null;
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
        reason = checkuserwasbanned(_id);

        if reason is null then
            return _id;
        end if;

        raise exception '%', generateyouareblockederror(reason);
    end if;
end;
$$;

select * from signIn('123123123',  null);
