create or replace procedure addFriend(who varchar(50), whom varchar(50))
language plpgsql as $$
begin
    if who = whom then
        raise '%', generateaddtofriendselferror();
    end if;

    if not issubscribingexist(whom, who) then
        raise '%', generatedontaddtofrienderror();
    end if;

    if isfriendsexist(whom, who) then
        raise '%', generatefriendsalreadyexisterror();
    end if;

    if not hasuserwithid(whom) then
        raise '%', generatenotfoundusererror();
    end if;

    if not hasuserwithid(who) then
        raise '%', generatenotfoundusererror();
    end if;

    begin
        insert into friends (iduser1, iduser2) values (who, whom);
        call describe(whom, who);

        exception
            when others then
                rollback;
                raise exception '%', SQLERRM;
    end;
end;
$$;

select * from friends;
select * from subscribers;

call addFriend('YLZXq6IP91I7A16Qc4wH5dweWJrwht4ZJFS7SsC7B4Pf8zP7fI', '81L086RIcklaeZJUciC6zJDUS1q565x1N28V799gazpCTmcD22');
