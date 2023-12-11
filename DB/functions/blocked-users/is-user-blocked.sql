create type IsUserBlockedType as
(
    isblocked boolean,
    reason    text
);

create or replace function isUserBlocked(_userid varchar(50))
    returns IsUserBlockedType
as
$$
declare
    res IsUserBlockedType;
begin
    res.isblocked := false;

    select reason
    into res.reason
    from blockedusers
    where userid = $1;

    if res.reason is null then
        raise exception no_data_found;
    end if;

    res.isblocked := true;
    return res;

exception
    when others then
        return res;
end ;
$$ language plpgsql;

select *
from blockedusers;
select *
from isUserBlocked('YLZXq6IP91I7A16Qc4wH5dweWJrwht4ZJFS7SsC7B4Pf8zP7fI');