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

