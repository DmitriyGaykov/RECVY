create or replace procedure subscribe(my_id varchar(50), _subscribeTo varchar(50))
language plpgsql as $$
    declare
        __subscriber boolean := hasUserWithId(my_id);
        __subscribed boolean := hasUserWithId(_subscribeTo);
begin
    if not __subscribed then
        raise exception '%', generatenotfoundusererror();
    end if;
    if not __subscriber  then
        raise exception '%', generatenotfoundusererror();
    end if;

    if my_id = _subscribeTo then
        raise exception '%', generateyourselfsubscribeerror();
    end if;
    if issubscribingexist(my_id, _subscribeTo) then
        raise exception '%', generateexistsubscribeerror();
    end if;

    insert into subscribers(subscriber, subscribeto) values (my_id, _subscribeTo);
end
$$;