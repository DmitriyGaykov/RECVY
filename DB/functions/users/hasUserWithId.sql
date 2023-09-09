create or replace function hasUserWithId(_id varchar(50))
returns boolean
as $$
declare
    count integer;
begin
    count := (
    select
        count(*)
    from
        users
    where
        id = _id
    );

    return count != 0;
end;
$$ language plpgsql;