create or replace function getUsers(skip integer = null, take integer = null)
returns setof returned_users as $$
begin
    call checkskipandtake(skip, take);

    return query (
        select
            *
        from
            returned_users
        offset skip
        limit take
        );

    exception
        when others then
            raise exception '%', sqlerrm;
end;
$$ language plpgsql;

select * from getUsers(0, 10);

insert into usersroles(userid, role) values ('81L086RIcklaeZJUciC6zJDUS1q565x1N28V799gazpCTmcD22', 'admin');