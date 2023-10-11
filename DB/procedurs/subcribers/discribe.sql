create or replace procedure describe(sub varchar(50), sub_to varchar(50))
language plpgsql as $$
    declare
        subExist boolean := hasuserwithid(sub);
        subToExist boolean := hasuserwithid(sub_to);
begin
    if not subExist or not subToExist then
        raise exception '%', generatenotfoundusererror();
    end if;

    if not hissubscriberof(sub, sub_to) then
        raise exception '%', generatenocontenterror();
    end if;

    delete from subscribers where subscriber = sub and subscribeto = sub_to;
end;
$$;

select * from getusers();

call discribe('81L086RIcklaeZJUciC6zJDUS1q565x1N28V799gazpCTmcD22', 'YLZXq6IP91I7A16Qc4wH5dweWJrwht4ZJFS7SsC7B4Pf8zP7fI');