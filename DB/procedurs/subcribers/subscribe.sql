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

    if isfriendsexist(my_id, _subscribeTo) then
        raise exception '%', generateexception('error', 'Пользователи являются друзьями');
    end if;

    insert into subscribers(subscriber, subscribeto) values (my_id, _subscribeTo);
end
$$;

call subscribe('81L086RIcklaeZJUciC6zJDUS1q565x1N28V799gazpCTmcD22', 'YLZXq6IP91I7A16Qc4wH5dweWJrwht4ZJFS7SsC7B4Pf8zP7fI');