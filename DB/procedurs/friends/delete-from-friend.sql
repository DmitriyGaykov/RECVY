create or replace procedure deleteFromFriends(who varchar(50), whom varchar(50))
language plpgsql as $$
begin
    delete from friends where
                            (
                                iduser1 = $1 and iduser2 = $2
                            )
                           or
                            (
                                iduser1 = $2 and iduser2 = $1
                            );

    call subscribe(whom, who);

    exception
        when others then
            rollback;
            raise notice 'Error: %', SQLERRM;
end;
$$;

call deleteFromFriends('YLZXq6IP91I7A16Qc4wH5dweWJrwht4ZJFS7SsC7B4Pf8zP7fI', '81L086RIcklaeZJUciC6zJDUS1q565x1N28V799gazpCTmcD22');
select hissubscriberof('81L086RIcklaeZJUciC6zJDUS1q565x1N28V799gazpCTmcD22', 'YLZXq6IP91I7A16Qc4wH5dweWJrwht4ZJFS7SsC7B4Pf8zP7fI');