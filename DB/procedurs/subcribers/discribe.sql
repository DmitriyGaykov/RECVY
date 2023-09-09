create or replace procedure discribe(sub varchar(50), sub_to varchar(50))
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
$$